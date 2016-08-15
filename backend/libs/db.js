import mongoose from 'mongoose';
import config from '../../config';
import logger from '../libs/logger';

const log = logger(module);

function connect(uri = config.get('backend:mongoose:uri')) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => {
        log.error(error);
        reject(error)
      })
      .on('close', () => log.info('Database connection closed.'))
      .once('open', () => {
        log.info(`Database connection opened ${uri}`);
        resolve(mongoose.connection, mongoose.connections[0])
      });

    mongoose.Promise = global.Promise;
    mongoose.connect(uri);
  });
}

function disconnect() {
  return mongoose.disconnect();
}


export {connect, disconnect, mongoose};
