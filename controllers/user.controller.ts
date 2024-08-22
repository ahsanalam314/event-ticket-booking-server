import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { errorResponse, successResponse } from '../helper/response.helper';
import { ResponseMessage } from "../contants/response-message.contant";
import { IUser } from "../interface/user.interface";
import { IUserModel } from "../models/interface/user.model.interface";

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

            const user = await UserService.login(request.body);

            if (!user) {
                return response.status(400).json(errorResponse(ResponseMessage.User.incorrectCredentials));
            }

            return response.status(201).json(successResponse(ResponseMessage.User.loginSuccessfull, user));

        } catch (error) {
            console.error(`UserController registerUser error: ${error}`);
            return response.status(500).json(errorResponse(ResponseMessage.User.loginNotSuccessfull, error));
        }
    }


}