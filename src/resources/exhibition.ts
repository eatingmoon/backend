import { exhibitionModel as ExhibitionModel } from '../models/exhibition';
import { getPiece } from './piece';
import { getUserInfoByToken } from './auth';

export const getExhibition = async (_id?: string) => {
  if (!_id) throw new Error('조회할 전시회 아이디와 함께 요청해주세요.');
  const exhibition = await ExhibitionModel.findById(_id);
  if (!exhibition) throw new Error('정보를 조회할 전시회가 존재하지 않습니다.');
  const pieceData = await Promise.all(
    Object(exhibition.pieces).map(async (pieceId: string) => {
      return getPiece(pieceId);
    }),
  );
  return { exhibition, piece: pieceData };
};

export const addExhibition = async (
  title: string,
  description: string,
  background: { type: 'default' | 'custom'; path: string },
  hashtag: Array<string>,
  userToken: string,
) => {
  const user = await getUserInfoByToken(userToken);
  if (!user) throw new Error('로그인 이후 이용해주세요.');
  const exhibition = new ExhibitionModel({
    title,
    description,
    background,
    hashtag,
    user: user._id,
  });
  await exhibition.save();
  return exhibition;
};

export const editExhibition = async (
  _id: string,
  title: string,
  description: string,
  background: { type: 'default' | 'custom'; path: string },
  hashtag: Array<string>,
  userToken: string,
) => {
  const user = await getUserInfoByToken(userToken);
  if (!user) throw new Error('로그인 이후 이용해주세요.');
  const exhibition = await ExhibitionModel.findById(_id);
  if (!exhibition) throw new Error('정보를 변경할 전시회가 존재하지 않습니다.');
  if (exhibition.user.toString() !== user._id.toString())
    throw new Error('권한이 없습니다.');
  await exhibition.updateOne({
    title,
    description,
    background,
    hashtag,
  });
  return exhibition;
};
