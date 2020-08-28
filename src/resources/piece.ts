import { Type } from 'ts-mongoose';
import { exhibitionModel as ExhibitionModel } from '../models/exhibition';
import { pieceModel as PieceModel } from '../models/piece';

export const getPiece = async (_id?: string) => {
  if (!_id) throw new Error('조회할 작품 아이디와 함께 요청해주세요.');
  const piece = await PieceModel.findById(_id);
  if (!piece) throw new Error('정보를 조회할 작품이 존재하지 않습니다.');
  return piece;
};

export const addPiece = async (
  title: string,
  description: string,
  background: { type: 'default' | 'custom'; path: string },
  frame: string,
  image: string,
) => {
  const piece = new PieceModel({
    title,
    description,
    background,
    frame,
    image,
  });
  await piece.save();
  return piece;
};

export const editPiece = async (
  _id: string,
  title: string,
  description: string,
  background: { type: 'default' | 'custom'; path: string },
  frame: string,
  image: string,
) => {
  const piece = await PieceModel.findById(_id);
  if (!piece) throw new Error('정보를 변경할 작품이 존재하지 않습니다.');
  await piece.updateOne({
    title,
    description,
    background,
    frame,
    image,
  });
  return piece;
};

export const connectPiecesToExhibition = async (
  exhibitionId: string,
  pieces: Array<string>,
) => {
  const exhibition = await ExhibitionModel.findById(exhibitionId);
  if (!exhibition) throw new Error('정보를 변경할 전시회가 존재하지 않습니다.');
  const piecesData = await Promise.all(
    pieces.map(async (pieceId) => {
      const piece = await PieceModel.findById(pieceId);
      return piece;
    }),
  );
  await exhibition.updateOne({
    pieces: piecesData,
  });
  return exhibition;
};
