import { Router } from 'express';

import SubscribeController from '../controllers/subscribe';

const router = Router();

router.get('/status', SubscribeController.getSubscribeStatus);
router.post('/on', SubscribeController.onSubscribe);
router.post('/off', SubscribeController.offSubscribe);
router.get('/mine', SubscribeController.getMySubscriptions);

export default router;
