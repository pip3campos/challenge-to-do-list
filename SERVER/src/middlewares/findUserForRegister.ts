import User from '../models/User'
import { RequestHandler } from 'express';

const findUserForRegister: RequestHandler = async (req, res, next) => {
  try {
    const userFind = await User.find({ email: req.body.email })
    if (userFind.length > 0) {
        res.status(409).json({
            success: false,
            message: "A user with this email address already exists. Please log in instead."
        });
        return;
        } else {
            return next();
        }
  } catch (error) {
    console.error("Error during user creation:", error);
    return next(error)
  }
}

export default findUserForRegister;