import { Request, Response, NextFunction } from 'express';
import { getUserInfoByToken } from '../resources/auth';
import { HttpException } from '../exceptions';
import { likeModel as LikeModel } from '../models/like';
import { exhibitionModel as ExhibitionModel } from '../models/exhibition';

export default {
  onLike: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exists = await LikeModel.findOne({
        likeBy: user._id,
        exhibition: req.body.exhibition,
      });
      if (exists)
        return next(new HttpException(405, '이미 좋아요 한 전시회입니다.'));
      const like = new LikeModel({
        likeBy: user._id,
        exhibition: req.body.exhibition,
      });
      await like.save();
      res.status(200).json(like);
    } catch (err) {
      next(err);
    }
  },
  offLike: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const like = await LikeModel.findOne({
        likeBy: user._id,
        exhibition: req.body.exhibition,
      });
      if (!like)
        return next(new HttpException(404, '좋아요 하지 않은 전시회입니다.'));
      await like.remove();
      res.status(200).json(like);
    } catch (err) {
      next(err);
    }
  },
  getLikeStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const like = await LikeModel.findOne({
        likeBy: user._id,
        exhibition: String(req.query.exhibition),
      });
      res.status(200).json({ like: !!like });
    } catch (err) {
      next(err);
    }
  },
  getMyLikeExhibitions: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const likes = await LikeModel.find({
        likeBy: user._id,
      });
      const result = await Promise.all(
        likes.map((doc) => ExhibitionModel.findById(doc.exhibition)),
      );
      res.status(200).json({ likeExhibitions: result });
    } catch (err) {
      next(err);
    }
  },
};
