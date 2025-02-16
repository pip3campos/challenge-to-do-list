import User from '../models/User';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

const checkPassword: RequestHandler = async (req, res, next) => {
  try {
    const userFind = await User.findOne({ email: req.body.email });

    if (!userFind) {
      res.status(404).json({
        success: false,
        message: "User not found",
        response: null
      });
      return;
    }

    if (bcrypt.compareSync(req.body.password, userFind.password)) {
      return next();
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
        response: null
      });
      return;
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return next(error)
  }
};

export default checkPassword;