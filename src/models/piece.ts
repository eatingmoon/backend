import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './user';

export const pieceSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  background: {
    type: Type.string({ required: true, enum: ['default', 'custom'] }),
    path: Type.string({ required: true }),
  },
  frame: Type.string({ required: true }),
  image: Type.string({ required: true }),
  user: Type.ref(Type.objectId({ required: true })).to('User', userSchema),
});

export type pieceDoc = ExtractDoc<typeof pieceSchema>;
export const pieceModel = typedModel('Piece', pieceSchema);
