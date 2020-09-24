import { Router } from 'express';
import Joi from 'joi';
import { validator } from '../middlewares';

import ReviewController from '../controllers/review';

const router = Router();

router.post(
  '/new',
  validator(
    Joi.object({
      contents: Joi.string().required(),
      rating: Joi.number().required(),
      exhibition: Joi.string().required(),
    }),
  ),
  ReviewController.newReview,
);
router.get('/exhibition', ReviewController.getReviewsByExhibition);

export default router;
