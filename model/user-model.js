const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
        firstName:  String,
        lastName: String,
        email: String,
        password: {
            type: String
    }
    
    //username: String,
   // googleId: String,
    

});

var User = module.statics = module.exports = mongoose.model('User', userSchema);

module.statics.emailVeri = function(email) {
    var User = this;
    return User.findOne({email}).then((user) => {
        if(user) {
            return Promise.reject();
        }
    })
};

module.exports.createUser = (user, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        console.log(salt);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            user.password = hash;
        });
    });
};

// module.statics.findByCredentials = (email, password) => {
//     return User.findOne({email}).then((user) => {
//         if(!user) {
//             return Promise.reject();
//         }
//         return new Promise((resolve, reject) => {
//             bcrypt.compare(email, hash, (err, res) => {
//                 if(res) {
//                     resolve(user);
//                 } else {
//                     reject();
//                 }
//             });
//         })
//     });

// }

module.exports.getByCredentials = function(username, callback) {
var query = {username: username};
User.findOne(query, callback);
};

