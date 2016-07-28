import { Router } from 'express';
import articleController from '../controllers/articleController';

const router = Router();

router.param('id', articleController.findById);

router.route('/')
  .get(articleController.getArticles);

router.route('/:id')
  .get(articleController.getArticle);

router.route('/:id/titles')
  .post(articleController.giveTitle);

export default router;
