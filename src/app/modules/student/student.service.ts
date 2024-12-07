import { TStudent } from "./student.interface";
import { Student } from "./student.model";


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
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
    deleteStudentFromDB
};