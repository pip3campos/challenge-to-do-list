import { RequestHandler } from 'express';
import User from '../../models/User'

const signOut: RequestHandler = async (req, res, next) => {
  try {
    const findUser = await User.findOneAndUpdate(
      {email: req.body.email},
      {online: false},
      {new: true}).select("-password");
      if (!findUser) {
        res.status(404).json({
          success: false,
          message: "User not found"
        });
        return;
      }

    res.status(200).json({
        message: "User signed out successfully"
    })
    return;
    
  } catch (error) {
    console.error("Error during sign-out:", error);
    return next(error)
  }
}

export default signOut;