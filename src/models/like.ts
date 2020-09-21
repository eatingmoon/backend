import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './user';

export const likeSchema = createSchema({
  likeBy: Type.ref(Type.objectId({ required: true })).to('User', userSchema),
  exhibition: Type.ref(Type.objectId({ required: true })).to(
    'User',
    userSchema,
  ),
});

export type likeDoc = ExtractDoc<typeof likeSchema>;
export const likeModel = typedModel('Like', likeSchema);
