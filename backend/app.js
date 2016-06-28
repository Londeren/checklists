import Koa from 'koa';
import router from './router';
import config from '../config';
import logger from './libs/logger';
import {db} from './libs/db';
import errorHandler from './http/middlewares/errorHandler';

const log = logger(module);
const app = new Koa();

app.use(errorHandler);
app.use(router.routes());


db.once('open', () => {
  app.listen(config.get('backend:port'), function() {
    log.info(`Start listening http://localhost:${config.get('backend:port')}/`);
  });
});


export default app;