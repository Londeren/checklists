var nconf = require('nconf');
var path = require('path');

nconf = nconf.argv()
  .env()
  .file({file: path.join(__dirname, '/config.json')});

if(nconf.get('NODE_ENV') === 'test')
  nconf.file({file: path.join(__dirname, '/config.test.json')})

module.exports = nconf;