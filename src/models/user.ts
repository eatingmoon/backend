import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const userSchema = createSchema({
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  name: Type.string({ required: true }),
  birth: Type.string({ required: true }),
  gender: Type.string({ required: true }),
});

export type userDoc = ExtractDoc<typeof userSchema>;
export const userModel = typedModel('User', userSchema);
