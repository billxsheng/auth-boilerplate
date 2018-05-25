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

userSchema.methods.validPassword = function(password) {
    bcrypt.compareSync(password, this.password);
}
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