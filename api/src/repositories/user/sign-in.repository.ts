import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import UserEntity from '../../entities/user/user.entity';

type SignInProps = {
  email: string;
  password: string;
};

type SignInResp = {
  user: UserEntity;
  token: string;
};

const signIn = async ({
  email,
  password,
}: SignInProps): Promise<SignInResp> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOneOrFail({
    where: { email, password },
  });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  return { user, token };
};

export default signIn;
