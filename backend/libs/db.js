import mongoose from 'mongoose';
import config from '../../config';
import logger from '../libs/logger';

const log = logger(module);

mongoose.connect(config.get('backend:mongoose:uri'));

const db = mongoose.connection;

db.on('error', log.error);

export {db, mongoose};
