import mongoose, { Model, Schema } from "mongoose";
import { IUserModel } from './interface/user.model.interface';
import bcrypt from 'bcrypt';

const UserSchema: Schema<IUserModel> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

UserSchema.pre<IUserModel>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }

});

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}


const User: Model<IUserModel> = mongoose.model<IUserModel>('Users', UserSchema);

export { User };