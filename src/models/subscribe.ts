import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './user';

export const subscribeSchema = createSchema({
  subscribeBy: Type.ref(Type.objectId({ required: true })).to(
    'User',
    userSchema,
  ),
  subscribeTo: Type.ref(Type.objectId({ required: true })).to(
    'User',
    userSchema,
  ),
});

export type subscribeDoc = ExtractDoc<typeof subscribeSchema>;
export const subscribeModel = typedModel('Subscribe', subscribeSchema);
