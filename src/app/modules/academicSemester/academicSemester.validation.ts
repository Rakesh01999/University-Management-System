
import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({

    // password: z.string({ invalid_type_error: 'Password must be string' }).max(20, { message: 'Password can not be more than 20 characters' }).optional(),
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]]),
    }),
});

const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
        startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    }),
});

export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};