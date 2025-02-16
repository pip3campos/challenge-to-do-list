import { RequestHandler } from 'express';
import User from '../../models/User'

const signIn: RequestHandler = async (req, res, next) => {
  try {
    const findUser = await User.findOneAndUpdate(
      {email: req.body.email},
      {online: true},
      {new: true}).select("-password");
      if (!findUser) {
        res.status(404).json({
          success: false,
          message: "User not found"
        });
        return;
      }

    res.status(200).json({
      message: "User sign in successfull",
      response: { 
        token: req.token,
        findUser
      },
      success: true
    });
    return;
    
  } catch (error) {
    console.error("Error during sign-in:", error);
    return next(error)
  }
}

export default signIn;