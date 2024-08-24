import { IApiResponse } from "../interface/response.interface";

export function successResponse<T>(message: string, data: T): IApiResponse<T>  {
    return {
        success: true,
        message,
        data
    }
}

export function errorResponse(message: string, error?: any): IApiResponse<null>  {
    return {
        success: false,
        message,
        error
    }
}