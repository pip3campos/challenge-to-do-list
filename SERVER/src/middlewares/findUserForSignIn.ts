import User from '../models/User'
import { RequestHandler } from 'express';

const findUserForSignIn: RequestHandler = async (req, res, next) => {
  try {
    const userFind = await User.findOne({ email: req.body.email })
    if (!userFind) {
      res.json({
        success: false,
        message: "User not found."
      })
      return;
    }
    return next()
  } catch (error) {
    console.error("Error during user sign in:", error);
    return next(error)
  }
}

export default findUserForSignIn;