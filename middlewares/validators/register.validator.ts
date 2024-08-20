import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import { ResponseMessage } from "../../contants/response-message.contant";

export const registerValidator = [
    body('firstName').notEmpty().escape().withMessage(ResponseMessage.Validation.firstNameIsRequired),
    body('lastName').notEmpty().escape().withMessage(ResponseMessage.Validation.lastNameIsRequired),
    body('email').isEmail().escape().withMessage(ResponseMessage.Validation.enterValidEmail).notEmpty().withMessage(ResponseMessage.Validation.emailIsRequired),
    body('password').isLength({ min: 6 }).withMessage(ResponseMessage.Validation.passwordLength).notEmpty().withMessage(ResponseMessage.Validation.passwordIsRequired),
    (request: Request, response: Response, next: NextFunction) => {
        try {

            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({ success: false, message: ResponseMessage.Validation.error, errors: errors.array() });
            }

            next();

        } catch (error) {
            console.error(`registerValidator middleware error: ${error}`);
        }
    }

]

export const loginValidator = [
    body('email').isEmail().escape().withMessage(ResponseMessage.Validation.enterValidEmail).notEmpty().withMessage(ResponseMessage.Validation.emailIsRequired),
    body('password').isLength({ min: 6 }).withMessage(ResponseMessage.Validation.passwordLength).notEmpty().withMessage(ResponseMessage.Validation.passwordIsRequired),
    (request: Request, response: Response, next: NextFunction) => {
        try {

            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    success: false,
                    message: ResponseMessage.Validation.error,
                    errors: errors.array()
                });
            }

            next();

        } catch (error) {
            console.error(`registerValidator middleware error: ${error}`);
        }
    }

]
