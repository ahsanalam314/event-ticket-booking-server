import { Request, Response } from "express";
import { UserModel } from "../models";
import { error, success } from "../helper/response.helper";
import { ResponseMessage } from "../contants/response-message.contant";

export class UserService {

    public static async registerUser(user: any): Promise<any | undefined> {
        try {

            const newUser = new UserModel(user);

            if (!newUser) {
                return null;
            }

            await newUser.save();

            return newUser;

        } catch (error) {
            console.error(`UserService registerUser error: ${error}`);
            throw new Error();
        }
    }

    public static async login(user: any): Promise<any | undefined> {
        try {

            const {email, password} = user;

            const userFound = await UserModel.findOne({ email });

            if (!userFound) {
                return error(ResponseMessage.User.emailNotFound);
            }

            const isMatch = await userFound.comparePassword(password);

            if (!isMatch) {
                return error(ResponseMessage.User.incorrectPassword);
            }

            return success(ResponseMessage.User.loginSuccessfull, userFound);

        } catch (error) {
            console.error(`UserService registerUser error: ${error}`);
            throw new Error();
        }
    }
}