import { Router } from 'express';
import userRouter from './users'
import taskRouter from './tasks'

const router = Router();

router.use('/auth', userRouter);
router.use('/tasks', taskRouter);

export default router;
