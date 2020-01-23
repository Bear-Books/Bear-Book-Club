var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./Util');
var UserSchema = new Schema({
user_name: {type: String},
login_name: {type: String},
comment: {type: String},
date_created : {type: Date, default: new Date()},
books_to_read: [],
books_have_read: [],
up_votes: {type: Number, default : 0},
down_votes: {type: Number, default : 0}
});
module.exports = mongoose.model('Users', UserSchema);