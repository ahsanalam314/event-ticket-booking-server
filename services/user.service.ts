import { User } from "../models";
import { IUser } from "../interface/user.interface";
import { IUserModel } from "../models/interface/user.model.interface";

export class UserService {

    public static async registerUser(user: IUser): Promise<IUserModel> {
        try {
            const newUser = new User(user);
            return await newUser.save();
        } catch (error) {
            console.error(`UserService registerUser error: ${error}`);
            throw new Error();
        }
    }

    public static async findUserByEmail(email: string): Promise<IUserModel> {
        try {
            return await User.findOne({ email }) as IUserModel;
        } catch (error) {
            console.error(`UserService findUserByEmail error: ${error}`);
            throw new Error();
        }
    }
}