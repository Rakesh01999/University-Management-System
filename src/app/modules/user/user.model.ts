import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    },
);



userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook: we will save data');
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

    next();
})

// set '' after saving password
userSchema.post('save', function (doc, next) {
    // console.log(this, 'post hook: we will saved our data');
    doc.password = '';

    next();
});


userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password');
};


userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);

