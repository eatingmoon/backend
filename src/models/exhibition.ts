import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { pieceSchema } from './piece';

export const exhibitionSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  hashtag: Type.array({ required: true }).of(Type.string()),
  pieces: Type.array().of(pieceSchema),
});

export type exhibitionDoc = ExtractDoc<typeof exhibitionSchema>;
export const exhibitionModel = typedModel('Exhibition', exhibitionSchema);
