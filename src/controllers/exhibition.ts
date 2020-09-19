import { Request, Response, NextFunction } from 'express';
import { exhibitionModel as ExhibitionModel } from '../models/exhibition';
import { pieceModel as PieceModel } from '../models/piece';
import { getUserInfoByToken } from '../resources/auth';
import { HttpException } from '../exceptions';

export default {
  getAllExhibitions: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const exhibitions = await ExhibitionModel.find().sort({
        createdAt: 'desc',
      });
      res.status(200).json({ exhibitions });
    } catch (err) {
      next(err);
    }
  },
  getMyExhibitions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exhibitions = await ExhibitionModel.find({ user: user._id }).sort({
        createdAt: 'desc',
      });
      res.status(200).json({ exhibitions });
    } catch (err) {
      next(err);
    }
  },
  getRecommendExhibitions: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exhibitions = await ExhibitionModel.find()
        .in('hashtag', user.hashtag)
        .sort({
          views: 'desc',
        });
      res.status(200).json({ exhibitions });
    } catch (err) {
      next(err);
    }
  },
  getRecommendExhibitionsByHashtag: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const exhibitions = await ExhibitionModel.find()
        .in('hashtag', [String(req.query.hashtag)])
        .sort({
          views: 'desc',
        });
      res.status(200).json({ exhibitions });
    } catch (err) {
      next(err);
    }
  },
  searchExhibitions: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const exhibitions = await ExhibitionModel.find({
        $or: [
          { title: { $regex: String(req.query.keyword), $options: 'i' } },
          { description: { $regex: String(req.query.keyword), $options: 'i' } },
        ],
      }).sort({
        createdAt: 'desc',
      });
      res.status(200).json({ exhibitions });
    } catch (err) {
      next(err);
    }
  },
  getOneExhibition: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      if (!id)
        return next(
          new HttpException(405, '조회할 전시회 아이디와 함께 요청해주세요.'),
        );
      const exhibition = await ExhibitionModel.findById(id);
      if (!exhibition)
        return next(
          new HttpException(404, '정보를 조회할 전시회가 존재하지 않습니다.'),
        );
      exhibition.views += 1;
      await exhibition.save();
      const pieceData = await Promise.all(
        Object(exhibition.pieces).map(async (pieceId: string) => {
          const piece = await PieceModel.findById(pieceId);
          if (!piece)
            return next(
              new HttpException(
                404,
                '정보를 조회할 전시회가 존재하지 않습니다.',
              ),
            );
          return piece;
        }),
      );
      res.status(200).json({ exhibition, piece: pieceData });
    } catch (err) {
      next(err);
    }
  },
  newExhibition: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, background, hashtag } = req.body;
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exhibition = new ExhibitionModel({
        title,
        description,
        background,
        hashtag,
        user: user._id,
      });
      await exhibition.save();
      res.status(200).json(exhibition);
    } catch (err) {
      next(err);
    }
  },
  editExhibition: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, title, description, background, hashtag } = req.body;
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exhibition = await ExhibitionModel.findById(_id);
      if (!exhibition)
        return next(
          new HttpException(404, '정보를 변경할 전시회가 존재하지 않습니다.'),
        );
      if (exhibition.user.toString() !== user._id.toString())
        return next(new HttpException(403, '권한이 없습니다.'));
      await exhibition.updateOne({
        title,
        description,
        background,
        hashtag,
      });
      res.status(200).json(exhibition);
    } catch (err) {
      next(err);
    }
  },
};
