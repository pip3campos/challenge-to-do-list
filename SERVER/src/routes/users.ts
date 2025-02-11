import { Router } from 'express';
import signUp from '../controllers/auth/signUp';
import signIn from '../controllers/auth/signIn';
import signOut from '../controllers/auth/signout'
import findUserForRegister from '../middlewares/findUserForRegister';
import findUserForSignIn from '../middlewares/findUserForSignIn';
import validator from '../middlewares/validator';
import userRegisterValidator from '../validators/userRegisterValidator';
import userSignInValidator from '../validators/userSignInValidator';
import hashPassword from '../middlewares/hashPassword';
import checkPassword from '../middlewares/checkPassword';
import generateToken from '../middlewares/generateToken';
import passport from "../middlewares/passport";

const router = Router();

router.post('/signup', findUserForRegister, validator(userRegisterValidator), hashPassword, signUp)
router.patch('/signin', validator(userSignInValidator), findUserForSignIn, checkPassword, generateToken, signIn);
router.patch("/signout", passport.authenticate('jwt', { session: false }), signOut);

export default router;
