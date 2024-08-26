import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { errorResponse, successResponse } from '../util/response.helper';
import { ResponseMessage } from "../contants/response-message.contant";
import { IUser } from "../interface/user.interface";
import { IUserModel } from "../models/interface/user.model.interface";
import { comparePassword } from "../util/helper";

export class UserController {

    public async registerUser(request: Request, response: Response) {
        try {

            const user: IUserModel = await UserService.registerUser(request.body as IUser);
            return response.status(201).json(successResponse(ResponseMessage.User.successfullyRegistered, user));

        } catch (error) {
            console.error(`UserController registerUser error: ${error}`);
            return response.status(500).json(errorResponse(ResponseMessage.User.notRegistered, error));
        }
    }

    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const user = await UserService.findUserByEmail(email);

            if (!user) {
                return response.status(404).json(errorResponse(ResponseMessage.User.emailNotFound));
            }

            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return response.status(404).json(errorResponse(ResponseMessage.User.incorrectPassword));
            }

            return response.status(201).json(successResponse(ResponseMessage.User.loginSuccessfull, user));

        } catch (error) {
            console.error(`UserController registerUser error: ${error}`);
            return response.status(500).json(errorResponse(ResponseMessage.User.loginNotSuccessfull, error));
        }
    }


}