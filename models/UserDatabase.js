var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./Util');

var UserSchema = new Schema({
user_name: {type: String},
date_created : {type: Date, default: new Date()}
});





module.exports = mongoose.model('userDatabase', UserSchema);