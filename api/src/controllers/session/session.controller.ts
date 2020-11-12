import { Context } from 'koa';
import signIn from '../../repositories/user/sign-in.repository';

const store = async (ctx: Context): Promise<void> => {
  const { email, password } = ctx.request.body;
  if (!email || !password) {
    throw Error('Incorrect data');
  }
  ctx.response.body = await signIn({ email, password });
};

export default { store };
