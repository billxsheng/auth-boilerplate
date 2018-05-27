const mongoose = require('mongoose');
//const bcrypt = require('bcrypt-nodejs');
const bcrypt = require('bcrypt');



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


module.statics.findByCredentials = function(email, password) {
    console.log(1);
    var User = this;
    return User.findOne({email: email}).then((user) => {
        console.log(user);
        if(!user) {
            console.log(2);
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            console.log(3);
            bcrypt.compare(password, user.password, (err, res) => {
                console.log(res);
                if(res) {
                    console.log(4);
                    resolve(user);
                } else {
                    console.log(5);
                    reject();
                }
            });
        })
    });

}

// module.exports.getByCredentials = function(username, callback) {
// var query = {username: username};
// User.findOne(query, callback);
// };

