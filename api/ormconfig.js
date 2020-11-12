// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const type = process.env.DB_TYPE;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const migrations = [path.join('src', 'migrations', '*.ts')];
const cli = { migrationsDir: path.join('src', 'migrations') };

module.exports = {
  type,
  host,
  database,
  username,
  password,
  migrations,
  cli,
};
