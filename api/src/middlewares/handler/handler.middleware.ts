import { Context, Next } from 'koa';

const handler = async ({ response }: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    response.status = error.status ?? 500;
    response.body = {
      message: error.message || 'Internal server error',
    };
  }
};

export default handler;
