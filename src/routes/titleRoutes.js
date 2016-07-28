import { Router } from 'express';
import titleController from '../controllers/titleController';

const router = Router();

router.param('id', titleController.findById);

router.route('/:id')
  .get(titleController.getTitle);

router.route('/:id/vote')
  .post(titleController.voteTitle);

export default router;
