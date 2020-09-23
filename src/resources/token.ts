import jwt from 'jsonwebtoken';
import config from '../config';
import { HttpException } from '../exceptions';

export const verify = async (token: string) => {
  try {
    const { identity }: any = await jwt.verify(
      token,
      config.jwtSecret as string,
    );
    return identity;
  } catch (error) {
    throw new HttpException(403, '토큰이 정상적으로 검증되지 않았습니다.');
  }
};

async function issue(identity: any, refresh: boolean = false) {
  const signOptions: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '9999 years',
  };

  const token = jwt.sign(
    { ...identity, refresh },
    config.jwtSecret,
    signOptions,
  );

  return token;
}

export default {
  issue,
  verify,
};
