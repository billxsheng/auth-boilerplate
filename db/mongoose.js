let mongoose1 = require('mongoose');
let keys = require('../db/keys')

mongoose1.Promise = global.Promise;
mongoose1.connect(keys.mongodb.dbURI || 'mongodb://localhost:27017/authUsers');

module.exports = {mongoose1};
