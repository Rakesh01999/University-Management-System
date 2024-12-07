import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../error/AppError";
import httpStatus from 'http-status';


const getAllStudentsFromDB = async () => {
    const result = await Student.find()
        .populate('admissionSemester').populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
    return result;
};

const getSingleStudentsFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });

    // const result = await Student.aggregate([
    //     { $match: { id: id } }
    // ]);
    const result = await Student.findById(id)
        .populate('admissionSemester').populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
    return result;
};

const deleteStudentFromDB = async (id: string) => {

    const session = await mongoose.startSession()

    try {
        const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
        }

        const deletedUser = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
        }


        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }

};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
    deleteStudentFromDB
};