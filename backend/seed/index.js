import Promise from 'bluebird';
import {connect, disconnect, mongoose} from '../libs/db';
import config from '../../config';
import logger from '../libs/logger';
import Template from '../models/Template';
import List from '../models/List';
import templates from './templates.json';
import lists from './lists.json';

const log = logger(module);

export default function() {
  connect()
  .then((connection) => {
    return dropDatabase(connection);
  })
  .then(createTemplates)
  .then(createLists)
  .then(disconnect)
  .then(() => log.info('Database seeded'))
};

function dropDatabase(connection) {
  return new Promise((res, rej) => {
    connection.db.dropDatabase((err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  })
}

function createTemplates() {
  return Promise.each(templates, (val) => {
    return new Template(val).save()
  });
}

function createLists() {
  return Promise.each(lists, (val) => {
    return new List(val).save()
  });
}
