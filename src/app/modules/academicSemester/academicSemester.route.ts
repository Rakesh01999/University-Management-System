
import express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = express.Router()

router.post('/create-academic-semester', AcademicSemesterControllers.createAcademicSemester);

// router.get('/',StudentControllers.getAllStudents);

// router.get('/:studentId',StudentControllers.getSingleStudents);

// router.delete('/:studentId',StudentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;


