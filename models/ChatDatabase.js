var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./Util');

var ChatSchema = new Schema({
sender: {type: String, default: "sender"},
receiver: {type: String, default: "receiver"},
message: {type: String, default: "empty"},
date_created : {type: Date, default: new Date()}
});





module.exports = mongoose.model('chatDatabase', ChatSchema);