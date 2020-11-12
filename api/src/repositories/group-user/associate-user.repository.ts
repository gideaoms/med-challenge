import { getRepository } from 'typeorm';
import GroupEntity from '../../entities/group/group.entity';
import UserEntity from '../../entities/user/user.entity';

type AssociateUserProps = {
  groupId: number;
  userId: string;
};

const associateUser = async ({
  groupId,
  userId,
}: AssociateUserProps): Promise<void> => {
  const groupRepository = getRepository(GroupEntity);
  const group = await groupRepository.findOneOrFail({ where: { id: groupId } });
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOneOrFail({ where: { id: userId } });

  user.group = group;
  await userRepository.save(user);
};

export default associateUser;
