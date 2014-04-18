var nconf = require('nconf');
 
nconf.file('./config/config.json')
     .env();

exports.getProperty = function(key) { 
    return nconf.get(key);
};