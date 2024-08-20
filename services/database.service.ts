import mongoose, { Mongoose } from "mongoose";


export function connectDB(): Promise<Mongoose> {
    const URL: string = process.env.DB_CONNECTION_URL as string;
    return mongoose.connect(URL);
}
