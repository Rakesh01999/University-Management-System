import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';



const createStudent: RequestHandler = async (req, res, next) => {
    try {
        const { password, student: studentData } = req.body;

        // const zodparsedData = studentValidationSchema.parse(studentData);

        const result = await UserServices.createStudentIntoDB(password, studentData);

        // Correct response method
        // return res.status(200).json({
        //     success: true,
        //     message: 'Student is created successfully',
        //     data: result,
        // });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const UserControllers = {
    createStudent,
};