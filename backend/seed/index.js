import Promise from 'bluebird';
import {db, mongoose} from '../libs/db';
import Template from '../models/Template';
import templates from './templates.json';


const nativeDb = db.db;

Promise.mapSeries([
  open,
  dropDatabase,
  createTemplates
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