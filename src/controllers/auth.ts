import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt-nodejs';
import { userModel as UserModel } from '../models/user';
import Token from '../resources/token';
import { HttpException } from '../exceptions';

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const identity = await UserModel.findOne({ username });
      if (!identity)
        return next(
          new HttpException(401, '아이디나 비밀번호를 다시 한번 확인해주세요.'),
        );

      const comparePassword = await bcrypt.compareSync(
        password,
        identity.password,
      );
      if (!comparePassword)
        return next(
          new HttpException(401, '아이디나 비밀번호를 다시 한번 확인해주세요.'),
        );

      res.status(200).json({
        accessToken: await Token.issue({ user: identity._id }, false),
      });
    } catch {
      next(new HttpException(401, '인증을 실패했습니다.'));
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, name, birth, gender } = req.body;
      const usernameVerify = await UserModel.find({ username });
      if (usernameVerify.length > 0)
        return next(
          new HttpException(409, '중복된 아이디는 사용할 수 없습니다.'),
        );

      const hashedPassword = await bcrypt.hashSync(password);

      const user = new UserModel({
        username,
        password: hashedPassword,
        name,
        birth,
        gender,
      });
      await user.save();
      res.status(200).json(user);
    } catch {
      next(new HttpException(401, '인증을 실패했습니다.'));
    }
  },
  exists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, username } = req.query;
      const user = await UserModel.find({ name, username });
      if (user.length === 0)
        return next(new HttpException(404, '유저가 없습니다.'));
      res.status(200).json({ exists: true });
    } catch (err) {
      next(err);
    }
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, username, password } = req.body;
      const hashedPassword = await bcrypt.hashSync(password);

      const user = await UserModel.findOneAndUpdate(
        { name, username },
        { password: hashedPassword },
      );
      if (!user) return next(new HttpException(404, '유저가 없습니다.'));

      res.status(200).json(user);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  },
};
