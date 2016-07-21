import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import router from './router';
import config from '../config';
import logger from './libs/logger';
import {connect} from './libs/db';
import errorHandler from './http/middlewares/errorHandler';

const log = logger(module);
const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(errorHandler);
app.use(router.routes());


(async() => {
  try {
    await connect(config.get('backend:mongoose:uri'));
  } catch (error) {
    log.error(`Unable to connect to database ${config.get('backend:mongoose:uri')}`);
  }

  try {
    await app.listen(config.get('backend:port'));

    log.info(`Start listening ${config.get('base_path')}`);
  } catch (error) {
    log.error(error);
  }
})();


export default app;