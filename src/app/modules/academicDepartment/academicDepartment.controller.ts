





import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async (req, res, next) => {

    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is created successfully',
        data: result,
    });
});

const getAllAcademicDepartments = catchAsync(async (req, res, next) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
    const {facultyId} = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(facultyId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is retrieved successfully',
        data: result,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
    const {facultyId} = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(facultyId,req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is updated successfully',
        data: result,
    });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getSingleAcademicDepartment,
    getAllAcademicDepartments,
};


