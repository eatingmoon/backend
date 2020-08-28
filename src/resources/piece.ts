import { pieceModel as PieceModel } from '../models/piece';

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
