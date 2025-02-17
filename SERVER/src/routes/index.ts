import { Router } from 'express';
import userRouter from './users'
import taskRouter from './tasks'

const router = Router();

router.use('/auth', userRouter);
router.use('/tasks', taskRouter);

export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     apiAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - apiAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         password:
 *           type: string
 *           format: password
 *           pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=*\\d)[a-zA-Z\\d]{8,20}$"
 *           description: User password
 *       required:
 *         - email
 *         - password
 *     LoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         password:
 *           type: string
 *           format: password
 *           pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=*\\d)[a-zA-Z\\d]{8,20}$"
 *           description: User password
 *       required:
 *         - email
 *         - password
 *     CreateTaskSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         author_id:
 *           type: string
 *           description: User id
 *       required:
 *         - title
 *         - author_id
 *     UpdateTaskSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *       required:
 *         - title
 */