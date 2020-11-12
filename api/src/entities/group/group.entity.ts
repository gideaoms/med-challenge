import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('groups')
class GroupEntity {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column()
  name!: string;
}

export default GroupEntity;
