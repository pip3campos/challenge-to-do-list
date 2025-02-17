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
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Registration schema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

router.patch('/signin', validator(userSignInValidator), findUserForSignIn, checkPassword, generateToken, signIn);
/**
 * @swagger
 * /api/auth/signin:
 *   patch:
 *     summary: User login to get credentials
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Login schema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       200:
 *         description: User successfully signed in
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/signout", passport.authenticate('jwt', { session: false }), signOut);
/**
 * @swagger
 * /api/auth/signout:
 *   patch:
 *     summary: User logout
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User successfully signed out
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

export default router;
