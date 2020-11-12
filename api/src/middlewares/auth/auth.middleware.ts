import { Context, Next } from 'koa';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import UserEntity from '../../entities/user/user.entity';

const auth = async ({ headers, state }: Context, next: Next): Promise<void> => {
  const { authorization } = headers;

  if (!authorization) {
    throw Error('Unauthorized');
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    throw Error('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };

    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw Error('Unauthorized');
    }

    state.user = user;
  } catch {
    throw Error('Unauthorized');
  }

  await next();
};

export default auth;
