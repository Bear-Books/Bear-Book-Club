var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./Util');

var UserSchema = new Schema({
user_name: {type: String},
password: String,
access_token: String,
date_created : {type: Date, default: new Date()},
books_to_read: [],
books_have_read: []
});


/*
 * Hashes the password for storage in the DB
 */
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Compares passwords to determine if the user is who they say they are
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', UserSchema);