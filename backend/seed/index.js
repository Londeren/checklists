import Promise from 'bluebird';
import {db, mongoose} from '../libs/db';
import Template from '../models/Template';
import List from '../models/List';
import templates from './templates.json';
import lists from './lists.json';


const nativeDb = db.db;

Promise.mapSeries([
  open,
  dropDatabase,
  createTemplates,
  createLists
], function(item) {
  return new Promise(item);
}).then(function() {
  mongoose.disconnect();
});


function open(callback) {
  db.on('open', callback);
}

function dropDatabase(callback) {
  nativeDb.dropDatabase(callback);
}

function createTemplates(callback) {
  Promise.each(templates, (val) => {
    return new Template(val).save()
  }).then(callback);
}

function createLists(callback) {
  Promise.each(templates, (val) => {
    return new List(val).save()
  }).then(callback);
}