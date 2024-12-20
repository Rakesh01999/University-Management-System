
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
},
    {
        timestamps: true,
    },
);




export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);



