var nconf = require('nconf');
var path = require('path');

nconf = nconf.argv().env();

if (nconf.get('NODE_ENV') === 'test') {
  nconf.file('test', path.join(__dirname, '/config.test.json'));
}

nconf.file('common', path.join(__dirname, '/config.json'));

module.exports = nconf;