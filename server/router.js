import Router from 'koa-router';

const router = Router({
  prefix: '/api'
});


router
  .get('/templates', function(ctx, next) {
    ctx.body = 'Templates';
  })
  .get('/lists', function(ctx, netx) {
    ctx.body = 'Lists';
  });


export default router;
