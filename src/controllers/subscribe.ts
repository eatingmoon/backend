import { Request, Response, NextFunction } from 'express';
import { getUserInfoByToken } from '../resources/auth';
import { HttpException } from '../exceptions';
import { subscribeModel as SubscribeModel } from '../models/subscribe';

export default {
  onSubscribe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exists = await SubscribeModel.findOne({
        subscribeBy: user._id,
        subscribeTo: req.body.user,
      });
      if (exists)
        return next(new HttpException(405, '이미 구독중인 유저입니다.'));
      const subscribe = new SubscribeModel({
        subscribeBy: user._id,
        subscribeTo: req.body.user,
      });
      await subscribe.save();
      res.status(200).json(subscribe);
    } catch (err) {
      next(err);
    }
  },
  offSubscribe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const subscribe = await SubscribeModel.findOne({
        subscribeBy: user._id,
        subscribeTo: req.body.user,
      });
      if (!subscribe)
        return next(new HttpException(404, '구독중이 아닌 유저입니다.'));
      await subscribe.remove();
      res.status(200).json(subscribe);
    } catch (err) {
      next(err);
    }
  },
  getSubscribeStatus: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const subscribe = await SubscribeModel.findOne({
        subscribeBy: user._id,
        subscribeTo: String(req.query.user),
      });
      res.status(200).json({ subscribe: !!subscribe });
    } catch (err) {
      next(err);
    }
  },
};
