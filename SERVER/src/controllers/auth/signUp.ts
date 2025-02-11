import { RequestHandler } from 'express';
import User from '../../models/User';


const signUp: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({
            email,
            password
        })
        res.status(201).json(newUser);
    } catch (error) {
        return next(error);
    }
}

export default signUp;