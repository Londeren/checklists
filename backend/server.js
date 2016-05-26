import Koa from 'koa';
import router from './router';
import config from '../config';

const app = new Koa();

app.use(router.routes());

app.listen(config.get('backend').port, function() {
  console.log(`Start listening http://localhost:${config.get('backend').port}/`);
});