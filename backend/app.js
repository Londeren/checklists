import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import router from './router';
import config from '../config';
import logger from './libs/logger';
import {db} from './libs/db';
import errorHandler from './http/middlewares/errorHandler';

const log = logger(module);
const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(errorHandler);
app.use(router.routes());


db.once('open', () => {
  app.listen(config.get('backend:port'), function() {
    log.info(`Start listening http://localhost:${config.get('backend:port')}/`);
  });
});


export default app;