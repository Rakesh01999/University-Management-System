import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, StudentMethods, StudentModel, TUserName } from './student/student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'First Name can not be more than 20 characters'],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                console.log(value);
                console.log(firstNameStr);
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize format',
        },
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not valid',
        }
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father\'s Name is required'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father\'s Occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father\'s Contact Number is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother\'s Name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother\'s Occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother\'s Contact Number is required'],
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local Guardian\'s Name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Local Guardian\'s Occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Local Guardian\'s Contact Number is required'],
    },
    address: {
        type: String,
        required: [true, 'Local Guardian\'s Address is required'],
    },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        unique: true,
        ref: 'User',
    },
    // password: {
    //     type: String,
    //     required: [true, 'Password is required'],
    //     maxlength: [20, 'Password can not be more than 20 characters '],
    // },
    name: {
        type: userNameSchema,
        required: [true, 'Student Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender. Allowed values: male, female, other.',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: {
        type: Date,
        // required: [true, 'Date of Birth is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        // match: [/.+@.+\..+/, 'Please enter a valid email address'],
        unique: true,
        // validate: {
        //     validator: (value: string) => validator.isEmail(value),
        //     message: '{VALUE} is not valid email type '
        // }
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: '{VALUE} is not a valid blood group.',
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local Guardian information is required'],
    },
    profileImg: {
        type: String,
    },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    admissionDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
}, {
    toJSON: {
        virtuals: true
    }
});

// virtual 

studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;
})





// Query Middleware
studentSchema.pre('find', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('findOne', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } });
    next();
});




studentSchema.pre('aggregate', function (next) {
    // console.log(this.pipeline());
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next();
});


// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });

    return existingUser;
}


export const Student = model<TStudent, StudentModel>('Student', studentSchema);



