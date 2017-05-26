var mongoose = require('mongoose'),
    bookingSchema = new mongoose.Schema({
        date: Date,
        info: String
    });
module.exports = mongoose.model('Booking', bookingSchema);