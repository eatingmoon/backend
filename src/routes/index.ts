import { Router, Response } from 'express';
import Joi from 'joi';
import { validator } from '../middlewares';

import AuthController from '../controllers/auth';
import ExhibitionController from '../controllers/exhibition';
import PieceController from '../controllers/piece';

const router = Router();

router.get('/', (_, res: Response) => {
  res.status(200).send('Server Application 🚀');
});

router.post(
  '/auth/login',
  validator(
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  ),
  AuthController.login,
);

router.post(
  '/auth/register',
  validator(
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      birth: Joi.string().required(),
      gender: Joi.string().required(),
    }),
  ),
  AuthController.register,
);

router.get('/auth/exists', AuthController.exists);

router.post(
  '/auth/password',
  validator(
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  ),
  AuthController.changePassword,
);

router.get('/exhibition', ExhibitionController.getOneExhibition);

router.post(
  '/exhibition/new',
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
  '/exhibition/edit',
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

router.get('/piece', PieceController.getOnePiece);

router.post(
  '/piece/new',
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
  '/piece/edit',
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
  '/piece/connect',
  validator(
    Joi.object({
      exhibitionId: Joi.string().required(),
      pieces: Joi.array().required(),
    }),
  ),
  PieceController.connectPiecesToExhibition,
);

export default router;
