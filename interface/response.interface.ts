import { error } from '../helper/response.helper';

export interface IResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: any
}