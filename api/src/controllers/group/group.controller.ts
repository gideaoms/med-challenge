import { Context } from 'koa';
import getGroups from '../../repositories/group/get-groups.repository';

const index = async (ctx: Context): Promise<void> => {
  ctx.response.body = await getGroups();
};

export default { index };
