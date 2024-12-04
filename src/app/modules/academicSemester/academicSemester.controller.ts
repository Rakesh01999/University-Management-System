

import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";



const createAcademicSemester = catchAsync(async (req, res, next) => {

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created successfully',
        data: result,
    });
});

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
    // const {semesterId} = req.params;
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semesters are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is retrieved successfully',
        data: result,
    });
});

const updateAcademicSemester = catchAsync(async (req, res, next) => {
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId,req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is retrieved successfully',
        data: result,
    });
});

export const AcademicSemesterControllers = {
    createAcademicSemester,
    updateAcademicSemester,
    getSingleAcademicSemester,
    getAllAcademicSemester,
};
