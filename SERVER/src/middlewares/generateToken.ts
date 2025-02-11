import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/env'

interface GenerateTokenRequestBody {
    email?: string;
}

const generateToken: RequestHandler<unknown, unknown, GenerateTokenRequestBody, unknown> = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email is required to generate a token"
            });
            return;
        }
        if (!JWT_SECRET) {
            console.error("JWT secret is not defined.");
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
            return;
        }

        const token = jwt.sign(
            { email },
            JWT_SECRET,
            { expiresIn: 86400}
        );

        req.token = token;
        return next();
    } catch (error) {
        console.error("Error generating token:", error);
        return next(error);
    }
}

export default generateToken