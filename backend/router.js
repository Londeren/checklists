import Router from 'koa-router';

const router = new Router()
  .get('/', function(ctx, next) {
    ctx.body = 'Index';
  });


const apiRouter = new Router({
  prefix: '/api'
})
  .get('/templates', async ctx => {
    ctx.body = "Templates";
  })
  .get('/lists', function(ctx, netx) {
    ctx.body = 'Lists';
  });


router.use(apiRouter.routes());

export default router;
