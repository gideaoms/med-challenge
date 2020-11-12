import { getRepository } from 'typeorm';
import GroupEntity from '../../entities/group/group.entity';

const getGroups = async (): Promise<GroupEntity[]> => {
  const groupRepository = getRepository(GroupEntity);
  const groups = await groupRepository.find();
  return groups;
};

export default getGroups;
