var mongoose = require('mongoose'),
    fnbfbSchema = new mongoose.Schema({
        bookingId: mongoose.Schema.Types.ObjectId,
        fnbId: mongoose.Schema.Types.ObjectId,
        quantity: Number
    });
module.exports = mongoose.model('FnBForBooking', fnbfbSchema);