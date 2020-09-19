import { Request, Response, NextFunction } from 'express';
import { pieceModel as PieceModel } from '../models/piece';
import { exhibitionModel as ExhibitionModel } from '../models/exhibition';
import { getUserInfoByToken } from '../resources/auth';
import { HttpException } from '../exceptions';

export default {
  getOnePiece: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      if (!id)
        return next(
          new HttpException(405, '조회할 작품 아이디와 함께 요청해주세요.'),
        );
      const piece = await PieceModel.findById(id);
      if (!piece)
        return next(
          new HttpException(404, '정보를 조회할 작품이 존재하지 않습니다.'),
        );
      res.status(200).json(piece);
    } catch (err) {
      next(err);
    }
  },
  getMyPieces: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const pieces = await PieceModel.find({ user: user._id }).sort({
        createdAt: 'desc',
      });
      res.status(200).json({ pieces });
    } catch (err) {
      next(err);
    }
  },
  newPiece: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, background, frame, image } = req.body;
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));

      const piece = new PieceModel({
        title,
        description,
        background,
        frame,
        image,
        user: user._id,
      });
      await piece.save();
      res.status(200).json(piece);
    } catch (err) {
      next(err);
    }
  },
  editPiece: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, title, description, background, frame, image } = req.body;
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));

      const piece = await PieceModel.findById(_id);
      if (!piece)
        return next(
          new HttpException(404, '정보를 변경할 작품이 존재하지 않습니다.'),
        );
      if (piece.user.toString() !== user._id.toString())
        return next(new HttpException(403, '권한이 없습니다.'));
      await piece.updateOne({
        title,
        description,
        background,
        frame,
        image,
      });
      res.status(200).json(piece);
    } catch (err) {
      next(err);
    }
  },
  connectPiecesToExhibition: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        exhibitionId,
        pieces,
      }: { exhibitionId: string; pieces: Array<string> } = req.body;
      const user = await getUserInfoByToken(String(req.token));
      if (!user)
        return next(new HttpException(401, '로그인 이후 이용해주세요.'));
      const exhibition = await ExhibitionModel.findById(exhibitionId);
      if (!exhibition)
        return next(
          new HttpException(404, '정보를 변경할 전시회가 존재하지 않습니다.'),
        );
      if (exhibition.user.toString() !== user._id.toString())
        return next(new HttpException(403, '권한이 없습니다.'));
      await exhibition.updateOne({
        pieces,
      });
      res.status(200).json(exhibition);
    } catch (err) {
      next(err);
    }
  },
};
