import bcrypt from 'bcrypt';


export function comparePassword(password: string, encrptPassword: string): Promise<boolean> {
    return bcrypt.compare(password, encrptPassword);
}