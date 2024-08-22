import { User } from "../models";
import { ResponseMessage } from "../contants/response-message.contant";
import { IUser } from "../interface/user.interface";
import { IUserModel } from "../models/interface/user.model.interface";
import { errorResponse, successResponse } from "../helper/response.helper";

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

    public static async login(user: IUser): Promise<IUser | null> {
        try {

            const {email, password} = user;

            const userFound = await User.findOne({ email });

            if (!userFound) {
                return null;
            }

            const isMatch = await userFound.comparePassword(password);

            if (!isMatch) {
                return null;
            }

            return user;

        } catch (error) {
            console.error(`UserService registerUser error: ${error}`);
            throw new Error();
        }
    }
}