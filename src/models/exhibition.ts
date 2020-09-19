import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './user';

export const exhibitionSchema = createSchema(
  {
    title: Type.string({ required: true }),
    description: Type.string({ required: true }),
    background: {
      type: Type.string({ required: true, enum: ['default', 'custom'] }),
      path: Type.string({ required: true }),
    },
    hashtag: Type.array({ required: true }).of(Type.string()),
    pieces: Type.array().of(Type.string()),
    user: Type.ref(Type.objectId({ required: true })).to('User', userSchema),
  },
  { timestamps: true },
);

export type exhibitionDoc = ExtractDoc<typeof exhibitionSchema>;
export const exhibitionModel = typedModel('Exhibition', exhibitionSchema);
