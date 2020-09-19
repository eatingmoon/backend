import { Router, Response } from 'express';
import Joi from 'joi';
import { validator } from '../middlewares';

import AuthController from '../controllers/auth';

const router = Router();

router.post(
  '/login',
  validator(
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  ),
  AuthController.login,
);

router.post(
  '/register',
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
  '/password',
  validator(
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  ),
  AuthController.changePassword,
);

router.post(
  '/edit',
  validator(
    Joi.object({
      name: Joi.string(),
      birth: Joi.string(),
      gender: Joi.string(),
      hashtag: Joi.array(),
    }),
  ),
  AuthController.changeInfo,
);

router.get('/me', AuthController.getMyInfo);

export default router;
