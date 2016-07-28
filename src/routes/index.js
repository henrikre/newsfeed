import { Router } from 'express';
import articleRoutes from './articleRoutes';
import titleRoutes from './titleRoutes';

const router = Router();

router.use('/articles', articleRoutes);
router.use('/titles', titleRoutes);

export default router;
