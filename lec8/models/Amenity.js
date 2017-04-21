var mongoose = require('mongoose'),
    amenitySchema = new mongoose.Schema({
        name: String,
        price: Number
    });
module.exports = mongoose.model('Amenity', amenitySchema, 'amenities');