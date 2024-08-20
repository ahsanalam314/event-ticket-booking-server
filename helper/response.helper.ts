import { IResponse } from "../interface/response.interface";

export function success(message: string, data?: any): IResponse  {
    return {
        success: true,
        message,
        data
    }
}

export function error(message: string, data?: any): IResponse  {
    return {
        success: false,
        message,
        data
    }
}