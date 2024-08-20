import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { error, success } from '../helper/response.helper';
import { ResponseMessage } from "../contants/response-message.contant";

export class UserController {

    public async registerUser(request: Request, response: Response) {
        try {

            const user = await UserService.registerUser(request.body);

            if (!user) {
                return response.status(400).json(error(ResponseMessage.User.notRegistered));
            }

            return response.status(200).json(success(ResponseMessage.User.successfullyRegistered, user));

        } catch (error) {
            console.error(`UserController registerUser error: ${error}`);
            throw new Error();
        }
    }

    public async login(request: Request, response: Response) {
        try {

            const user = await UserService.login(request.body);

            if (!user?.success) {
                return response.status(400).json(user);
            }

            return response.status(200).json(user);

        } catch (error) {
            console.error(`UserController registerUser error: ${error}`);
            throw new Error();
        }
    }


}