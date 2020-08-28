import { exhibitionModel as ExhibitionModel } from '../models/exhibition';

export const addExhibition = async (
  title: string,
  description: string,
  background: { type: 'default' | 'custom'; path: string },
  frame: string,
  hashtag: Array<string>,
) => {
  const exhibition = new ExhibitionModel({
    title,
    description,
    background,
    frame,
    hashtag,
  });
  await exhibition.save();
  return exhibition;
};
