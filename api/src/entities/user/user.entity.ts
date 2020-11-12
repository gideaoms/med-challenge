import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import GroupEntity from '../group/group.entity';

@Entity('users')
class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ name: 'group_id' })
  groupId!: number;

  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: 'group_id' })
  group!: GroupEntity;
}

export default UserEntity;
