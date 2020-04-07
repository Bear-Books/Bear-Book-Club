var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./Util');

var BookSchema = new Schema({
    
    bookJSON: []
});

module.exports = mongoose.model('books', BookSchema);