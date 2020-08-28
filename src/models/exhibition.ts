import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const exhibitionSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  background: {
    type: Type.string({ required: true, enum: ['default', 'custom'] }),
    path: Type.string({ required: true }),
  },
  hashtag: Type.array({ required: true }).of(Type.string()),
  pieces: Type.array().of(Type.string()),
});

export type exhibitionDoc = ExtractDoc<typeof exhibitionSchema>;
export const exhibitionModel = typedModel('Exhibition', exhibitionSchema);
