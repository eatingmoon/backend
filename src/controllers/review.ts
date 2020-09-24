import { Request, Response, NextFunction } from 'express';
import { getUserInfoByToken } from '../resources/auth';
import { HttpException } from '../exceptions';
import { reviewModel as ReviewModel } from '../models/review';
import { exhibitionModel } from '../models/exhibition';

export default {
  newReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exists = await ReviewModel.findOne({
        user: user._id,
        exhibition: req.body.exhibition,
      });
      if (exists)
        return next(new HttpException(405, '이미 리뷰를 남긴 전시회입니다.'));
      const review = new ReviewModel({
        contents: req.body.contents,
        rating: req.body.rating,
        user: user._id,
        exhibition: req.body.exhibition,
      });
      await review.save();
      res.status(200).json(review);
    } catch (err) {
      next(err);
    }
  },
  getReviewsByExhibition: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const exhibition = await exhibitionModel.findById(req.query.exhibition);
      if (!exhibition)
        return next(new HttpException(404, '전시회를 찾을 수 없습니다.'));
      const reviews = await ReviewModel.find({
        exhibition,
      });
      res.status(200).json({ reviews });
    } catch (err) {
      next(err);
    }
  },
};
