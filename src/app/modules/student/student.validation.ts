import { z } from "zod";

// Helper schemas
const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1, "First Name is required")
        .max(20, "First Name cannot be more than 20 characters")
        .refine(
            (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
            "First Name must be capitalized"
        ),
    middleName: z.string().optional(),
    lastName: z
        .string()
        .min(1, "Last Name is required")
        .refine((value) => /^[A-Za-z]+$/.test(value), "Last Name must only contain letters"),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's Name is required"),
    fatherOccupation: z.string().min(1, "Father's Occupation is required"),
    fatherContactNo: z.string().min(1, "Father's Contact Number is required"),
    motherName: z.string().min(1, "Mother's Name is required"),
    motherOccupation: z.string().min(1, "Mother's Occupation is required"),
    motherContactNo: z.string().min(1, "Mother's Contact Number is required"),
});

const localGuardianValidationSchema = z.object({
    name: z.string().min(1, "Local Guardian's Name is required"),
    occupation: z.string().min(1, "Local Guardian's Occupation is required"),
    contactNo: z.string().min(1, "Local Guardian's Contact Number is required"),
    address: z.string().min(1, "Local Guardian's Address is required"),
});

// Main student schema
export const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(["male", "female", "other"]),
            dateOfBirth: z.string().optional(),
            email: z
                .string()
                .email("Invalid email format")
                .min(1, "Email is required"),
            contactNo: z.string().min(1, "Contact Number is required"),
            emergencyContactNo: z.string().min(1, "Emergency Contact Number is required"),
            bloodGroup: z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
                    invalid_type_error: "Invalid blood group",
                }),
            // .optional(),
            presentAddress: z.string().min(1, "Present Address is required"),
            permanentAddress: z.string().min(1, "Permanent Address is required"),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            // academicFaculty: z.string().nonempty(), // ObjectId
            admissionSemester: z.string().nonempty(),
            academicDepartment: z.string().nonempty(),
            profileImg: z.string(),
        })
    })
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: z.string().optional(),
            profileImg: z.string().optional(),
            academicDepartment: z.string().optional(),
        }),
    }),
});

// export default studentValidationSchema;
export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};

