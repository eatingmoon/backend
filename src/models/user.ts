import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const userSchema = createSchema(
  {
    username: Type.string({ required: true, unique: true }),
    password: Type.string({ required: true }),
    name: Type.string({ required: true }),
    bio: Type.string(),
    birth: Type.string({ required: true }),
    gender: Type.string({ required: true }),
    hashtag: Type.array({ required: true }).of(Type.string()),
  },
  { timestamps: true },
);

export type userDoc = ExtractDoc<typeof userSchema>;
export const userModel = typedModel('User', userSchema);
