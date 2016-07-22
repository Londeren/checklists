import config from '../config';
import logger from './libs/logger';
import {connect} from './libs/db';
import app from './app';

const log = logger(module);

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