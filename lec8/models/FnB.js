var mongoose = require('mongoose'),
    fnbSchema = new mongoose.Schema({
        name: String,
        price: Number
    });
module.exports = mongoose.model('FnB', fnbSchema, 'fnbs');