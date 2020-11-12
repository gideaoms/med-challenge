import { createConnection } from 'typeorm';
import GroupEntity from '../../entities/group/group.entity';
import UserEntity from '../../entities/user/user.entity';

const database = createConnection({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [GroupEntity, UserEntity],
  synchronize: false,
  logging: true,
});

export default database;
