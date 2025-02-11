import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'

interface CustomRequestBody {
    password?: string;
}

interface CustomRequest extends Request {
    body: CustomRequestBody;
}

const hashPassword = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        return next();
    } catch (error) {
        console.error("Error hashing password:", error);
        return next(error);
    }
}

export default hashPassword;