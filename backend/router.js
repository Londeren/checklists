import Router from 'koa-router';
import Templates from './http/controllers/Templates';
import Lists from './http/controllers/Lists';

const router = new Router()
  .get('/', function(ctx) {
    ctx.body = 'Index';
  });


const apiRouter = new Router({
  prefix: '/api'
})
  .get('/templates', Templates.index)
  .post('/templates', Templates.store)
  .get('/lists', Lists.index);


router.use(apiRouter.routes());

export default router;
