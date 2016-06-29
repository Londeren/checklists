import Router from 'koa-router';
import Api from './http/controllers/Api';

const router = new Router()
  .get('/', function(ctx) {
    ctx.body = 'Index';
  });


const apiRouter = new Router({
  prefix: '/api'
})
  .get('/templates', Api.templates)
  .get('/lists', Api.lists);


router.use(apiRouter.routes());

export default router;
