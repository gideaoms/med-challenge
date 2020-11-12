import 'reflect-metadata';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import handlerMiddleware from './middlewares/handler/handler.middleware';
import routes from './routes';
import database from './providers/database/database.provider';

const server = new Koa();

server.use(handlerMiddleware);
server.use(bodyparser());
server.use(routes.routes());
server.use(routes.allowedMethods());

database
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.info('Server in running');
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
