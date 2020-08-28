import { exhibitionModel as ExhibitionModel } from '../models/exhibition';

export const getExhibition = async (_id?: string) => {
  if (!_id) throw new Error('조회할 전시회 아이디와 함께 요청해주세요.');
  const exhibition = await ExhibitionModel.findById(_id);
  if (!exhibition) throw new Error('정보를 조회할 전시회가 존재하지 않습니다.');
  return exhibition;
};

export const addExhibition = async (
  title: string,
  description: string,
  background: { type: 'default' | 'custom'; path: string },
  hashtag: Array<string>,
) => {
  const exhibition = new ExhibitionModel({
    title,
    description,
    background,
    hashtag,
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
) => {
  const exhibition = await ExhibitionModel.findById(_id);
  if (!exhibition) throw new Error('정보를 변경할 전시회가 존재하지 않습니다.');
  await exhibition.updateOne({
    title,
    description,
    background,
    hashtag,
  });
  return exhibition;
};
