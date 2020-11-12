import { Context } from 'koa';
import associateUser from '../../repositories/group-user/associate-user.repository';

const update = async (ctx: Context): Promise<void> => {
  const groupId = ctx.params.group_id;
  const userId = ctx.state.user.id;
  await associateUser({ groupId, userId });
  ctx.status = 200;
};

export default { update };
