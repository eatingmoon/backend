import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { exhibitionSchema } from './exhibition';
import { userSchema } from './user';

export const likeSchema = createSchema({
  likeBy: Type.ref(Type.objectId({ required: true })).to('User', userSchema),
  exhibition: Type.ref(Type.objectId({ required: true })).to(
    'Exhibition',
    exhibitionSchema,
  ),
});

export type likeDoc = ExtractDoc<typeof likeSchema>;
export const likeModel = typedModel('Like', likeSchema);
