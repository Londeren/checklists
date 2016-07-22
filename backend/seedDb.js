require('babel-register');
require('babel-polyfill');

var db = require('./libs/db');
var seed = require('./seed').default;

db.connect().then(seed).then(db.disconnect);