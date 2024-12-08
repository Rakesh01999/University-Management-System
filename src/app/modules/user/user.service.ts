import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentID } from "./user.utils";
import AppError from "../../error/AppError";
import httpStatus from 'http-status';


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    // create a user object
    const userData: Partial<TUser> = {};

    // if password is not given, use default password

    userData.password = password || (config.default_password as string);

    // set student role
    userData.role = 'student';



    // find academic semester info 
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        // set manually generated id
        // userData.id = '2030100001';
        userData.id = await generateStudentID(admissionSemester);

        // create a user (transaction - 1)
        const newUser = await User.create([userData], { session }); // array

        // create a student
        if (!newUser.length) {

            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');

        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //ref _id 

        // create a student (transaction - 2)
        const newStudent = await Student.create([payload], { session });

        // if (!newStudent.length) {
        if (!newStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction()
        await session.endSession()

        return newStudent;


    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};


export const UserServices = {
    createStudentIntoDB
}