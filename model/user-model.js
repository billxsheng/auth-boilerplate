const mongoose = require('mongoose');
//const bcrypt = require('bcrypt-nodejs');
const bcrypt = require('bcrypt');



let userSchema = mongoose.Schema({
        firstName:  String,
        lastName: String,
        email: String,
        password: {
            type: String
    }  
});

let User = module.statics = module.exports = mongoose.model('User', userSchema);

module.statics.emailVeri = function(email) {
    let User = this;
    return User.findOne({email}).then((user) => {
        if(user) {
            return Promise.reject();
        }
    })
};


module.statics.findByCredentials = function(email, password) {
    let User = this;
    return User.findOne({email: email}).then((user) => {
        console.log(user);
        if(!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                console.log(res);
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        })
    });

}

module.exports.getUserById = function(username, callback) {
    let query = {username: username};
User.findOne(query, callback);
};

