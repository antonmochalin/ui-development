var mongoose = require('mongoose'),
    afbSchema = new mongoose.Schema({
        bookingId: mongoose.Schema.Types.ObjectId,
        amenityId: mongoose.Schema.Types.ObjectId,
        comments: String
    });
module.exports = mongoose.model('AmenityForBooking', afbSchema);