import { Router } from 'express';

import LikeController from '../controllers/like';

const router = Router();

router.get('/status', LikeController.getLikeStatus);
router.post('/on', LikeController.onLike);
router.post('/off', LikeController.offLike);
router.get('/mine', LikeController.getMyLikeExhibitions);

export default router;
