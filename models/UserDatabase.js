var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');
require('./Util');


var UserSchema = new Schema({
    user_name: {type: String},
    date_created : {type: Date, default: new Date()},
    to_read_list: {type: Array},
    have_read_list: {type: Array},
    comment: {type: Array},
    profile_pic: {type: String}
});

module.exports = mongoose.model('userDatabase', UserSchema);