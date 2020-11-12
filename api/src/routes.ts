import Router from 'koa-router';
import authMiddleware from './middlewares/auth/auth.middleware';
import groupController from './controllers/group/group.controller';
import sessionController from './controllers/session/session.controller';
import groupUserController from './controllers/group-user/group-user.controller';

const router = new Router({ prefix: '/api' });

router.post('/sessions', sessionController.store);

router.use(authMiddleware);

router.get('/groups', groupController.index);
router.put('/groups/:group_id/users', groupUserController.update);

export default router;
