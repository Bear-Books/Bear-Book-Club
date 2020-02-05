var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb5043op:ji6nyc@danu7.it.nuigalway.ie:8717/mongodb5043', { useUnifiedTopology: true });
exports.connection = connection;