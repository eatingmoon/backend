import { exhibitionModel as ExhibitionModel } from '../models/exhibition';
import { pieceModel as PieceModel } from '../models/piece';
import { getUserInfoByToken } from './auth';

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
  userToken: string,
) => {
  const user = await getUserInfoByToken(userToken);
  if (!user) throw new Error('로그인 이후 이용해주세요.');
  const piece = new PieceModel({
    title,
    description,
    background,
    frame,
    image,
    user: user._id,
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
  userToken: string,
) => {
  const user = await getUserInfoByToken(userToken);
  if (!user) throw new Error('로그인 이후 이용해주세요.');
  const piece = await PieceModel.findById(_id);
  if (!piece) throw new Error('정보를 변경할 작품이 존재하지 않습니다.');
  if (piece.user.toString() !== user._id.toString())
    throw new Error('권한이 없습니다.');
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
  userToken: string,
) => {
  const user = await getUserInfoByToken(userToken);
  if (!user) throw new Error('로그인 이후 이용해주세요.');
  const exhibition = await ExhibitionModel.findById(exhibitionId);
  if (!exhibition) throw new Error('정보를 변경할 전시회가 존재하지 않습니다.');
  if (exhibition.user.toString() !== user._id.toString())
    throw new Error('권한이 없습니다.');
  await exhibition.updateOne({
    pieces,
  });
  return exhibition;
};
