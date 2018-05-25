var mongoose1 = require('mongoose');

mongoose1.Promise = global.Promise;
mongoose1.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authUsers');

module.exports = {mongoose1};
