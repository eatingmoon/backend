/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import { userModel as UserModel } from '../models/user';
import Token from './token';
import config from '../config';

const getUserInfoByUsernameAndPassword = async (
  username: string,
  password: string,
) => {
  const identity = await UserModel.findOne({ username });
  if (!identity) throw new Error('아이디나 비밀번호를 다시 한번 확인해주세요.');

  const comparePassword = await bcrypt.compareSync(password, identity.password);
  if (!comparePassword)
    throw new Error('아이디나 비밀번호를 다시 한번 확인해주세요.');

  return identity;
};

export const getToken = async (username: string, password: string) => {
  const user = await getUserInfoByUsernameAndPassword(username, password);
  return {
    accessToken: await Token.issue({ user: user._id }, false),
  };
};

export const getUserInfoByToken = async (token: string) => {
  const tokenVerify = jwt.verify(token, config.jwtSecret);
  if (!tokenVerify) throw new Error('토큰이 올바르지 않습니다.');

  const user = UserModel.findById(Object(tokenVerify).user, {
    _id: false,
    password: false,
  });
  if (!user) throw new Error('유저가 없습니다.');

  return user;
};
