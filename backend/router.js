import Router from 'koa-router';
import Templates from './http/controllers/Templates';
import Lists from './http/controllers/Lists';
import Auth from './http/controllers/Auth';
import authenticateUser from './http/middlewares/authenticateUser';

const router = new Router()
  .get('/', function(ctx) {
    ctx.body = 'Index';
  });


const apiRouter = new Router({
  prefix: '/api'
})
  .get('/templates', Templates.index)
  .post('/templates', Templates.store)
  .put('/templates', Templates.update)
  .get('/lists', Lists.index);

const authRouter = new Router({
  prefix: '/auth'
})
  .post('/login', Auth.login);

router.use('/api', authenticateUser);

router.use(apiRouter.routes());
router.use(authRouter.routes());


export default router;
