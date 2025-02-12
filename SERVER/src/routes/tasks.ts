import { Router } from 'express';
import * as NotesController from '../controllers/notes'
import passport from '../middlewares/passport'

const router = Router();

router.get('/:authorId', passport.authenticate('jwt', { session: false }), NotesController.getNotes);
router.get('/:noteId', passport.authenticate('jwt', { session: false }), NotesController.getNote);
router.post('/', passport.authenticate('jwt', { session: false }), NotesController.createNote);
router.patch('/:noteId', passport.authenticate('jwt', { session: false }), NotesController.updateNote);
router.delete('/:noteId', passport.authenticate('jwt', { session: false }), NotesController.deleteNote);

export default router;
