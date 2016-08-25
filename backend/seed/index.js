import Promise from 'bluebird';
import logger from '../libs/logger';
import Template from '../models/Template';
import List from '../models/List';
import User from '../models/User';
import templates from './templates.json';
import lists from './lists.json';
import users from './users.json';

const log = logger(module);

export default function(connection) {
  return dropDatabase(connection)
    .then(() => Promise.all([createUsers(), createTemplates(), createLists()]))
    .then(() => log.info('Database seeded'))
}

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

function createUsers() {
  return Promise.each(users, (val) => {
    return new User(val).save()
  });
}
