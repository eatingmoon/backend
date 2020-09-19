import { Router } from 'express';
import Joi from 'joi';
import { validator } from '../middlewares';

import PieceController from '../controllers/piece';

const router = Router();

router.get('/', PieceController.getOnePiece);

router.get('/mine', PieceController.getMyPieces);

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
      frame: Joi.string().required(),
      image: Joi.string().required(),
    }),
  ),
  PieceController.newPiece,
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
      frame: Joi.string().required(),
      image: Joi.string().required(),
    }),
  ),
  PieceController.editPiece,
);

router.post(
  '/connect',
  validator(
    Joi.object({
      exhibitionId: Joi.string().required(),
      pieces: Joi.array().required(),
    }),
  ),
  PieceController.connectPiecesToExhibition,
);

export default router;
