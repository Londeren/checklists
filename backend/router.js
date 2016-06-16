import Router from 'koa-router';
import Template from './models/Template';

const router = new Router()
  .get('/', function(ctx, next) {
    ctx.body = 'Index';
  });


const apiRouter = new Router({
  prefix: '/api'
})
  .get('/templates', async ctx => {
    ctx.body = await Template.find().exec();
  })
  .get('/lists', function(ctx, next) {
    ctx.body = 'Lists';
  });


router.use(apiRouter.routes());

export default router;
