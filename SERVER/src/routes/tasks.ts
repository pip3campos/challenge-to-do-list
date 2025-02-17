import { Router } from 'express';
import * as NotesController from '../controllers/notes'
import passport from '../middlewares/passport'

const router = Router();

router.get('/:authorId', passport.authenticate('jwt', { session: false }), NotesController.getNotes);
/**
 * @swagger
 * /api/tasks/{authorId}:
 *   get:
 *     summary: get users tasks
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: Users id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks successfully obtained
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/', passport.authenticate('jwt', { session: false }), NotesController.createNote);
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: create a users tasks
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - Task
 *     requestBody:
 *       description: Create task schema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskSchema'
 *     responses:
 *       201:
 *         description: Tasks successfully created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.patch('/:noteId', passport.authenticate('jwt', { session: false }), NotesController.updateNote);
/**
 * @swagger
 * /api/tasks/{noteId}:
 *   patch:
 *     summary: Update a user's task
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Update task schema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskSchema'
 *     responses:
 *       200:
 *         description: Task successfully updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:noteId', passport.authenticate('jwt', { session: false }), NotesController.deleteNote);
/**
 * @swagger
 * /api/tasks/{noteId}:
 *   delete:
 *     summary: Delete a user's task
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task successfully deleted (No Content)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

export default router;
