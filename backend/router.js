import Router from 'koa-router';
import jwt from 'koa-jwt';
import Templates from './http/controllers/Templates';
import Lists from './http/controllers/Lists';
import Auth from './http/controllers/Auth';
import config from '../config';

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
  .post('/login', Auth.login)
  .post('/logout', Auth.logout);


router.use('/api', jwt({secret: config.get('backend:jwt:secret')}));

router.use(apiRouter.routes());
router.use(authRouter.routes());


export default router;
