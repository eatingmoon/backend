import { Router } from 'express';
import Joi from 'joi';
import { validator } from '../middlewares';

import ExhibitionController from '../controllers/exhibition';

const router = Router();

router.get('/', ExhibitionController.getOneExhibition);

router.get('/all', ExhibitionController.getAllExhibitions);

router.get('/search', ExhibitionController.searchExhibitions);

router.get('/mine', ExhibitionController.getMyExhibitions);

router.get('/recommend', ExhibitionController.getRecommendExhibitions);

router.get('/hashtag', ExhibitionController.getRecommendExhibitionsByHashtag);

router.post(
  '/new',
  validator(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      background: Joi.object()
        .keys({
          type: Joi.string().required(),
          path: Joi.string().required(),
        })
        .required(),
      hashtag: Joi.array().required(),
    }),
  ),
  ExhibitionController.newExhibition,
);

router.post(
  '/edit',
  validator(
    Joi.object({
      _id: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      background: Joi.object()
        .keys({
          type: Joi.string().required(),
          path: Joi.string().required(),
        })
        .required(),
      hashtag: Joi.array().required(),
    }),
  ),
  ExhibitionController.editExhibition,
);

export default router;
