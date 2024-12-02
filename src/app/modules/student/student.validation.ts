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
            dateOfBirth: z.string().min(1, "Date of Birth is required"),
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
            profileImg: z.string(),
        })
    })
});

// export default studentValidationSchema;
export const studentValidations = {
    createStudentValidationSchema,
};

