import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { exhibitionSchema } from './exhibition';
import { userSchema } from './user';

export const reviewSchema = createSchema({
  contents: Type.string({ required: true }),
  rating: Type.number({ required: true }),
  user: Type.ref(Type.objectId({ required: true })).to('User', userSchema),
  exhibition: Type.ref(Type.objectId({ required: true })).to(
    'Exhibition',
    exhibitionSchema,
  ),
});

export type reviewDoc = ExtractDoc<typeof reviewSchema>;
export const reviewModel = typedModel('Review', reviewSchema);
