/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import { userModel as UserModel } from '../models/user';
import config from '../config';

export const getUserInfoByToken = async (token: string) => {
  const tokenVerify = jwt.verify(token, config.jwtSecret);
  if (!tokenVerify) throw new Error('토큰이 올바르지 않습니다.');

  const user = UserModel.findById(Object(tokenVerify).user, {
    password: false,
  });
  if (!user) throw new Error('유저가 없습니다.');

  return user;
};
