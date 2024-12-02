import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { createStudentValidationSchema } from '../student/student.validation'
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// router.post('/create-student', validateRequest(studentValidations.studentValidationSchema), UserControllers.createStudent);
router.post('/create-student', validateRequest(createStudentValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;