var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./Util');

var BookSchema = new Schema({
    user_name: {type: String},

    date_created : {type: Date, default: new Date()},
    books_to_read: [],
    books_have_read: []
});

module.exports = mongoose.model('books', BookSchema);