import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const userSchema = createSchema({
  _id: Type.objectId(),
  idx: Type.number({ required: true, unique: true }),
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  name: Type.string({ required: true }),
  phone: Type.string({ required: true }),
});

export type userDoc = ExtractDoc<typeof userSchema>;
export const userModel = typedModel('User', userSchema);
