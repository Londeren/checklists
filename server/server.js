import Koa from 'koa';
import router from './router';

const app = new Koa();

app.use(router.routes());

app.listen(3001, function() {
  console.log('Start listening http://localhost:3001/');
});