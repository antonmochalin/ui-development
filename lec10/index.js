var express = require('express'),
    bodyParser = require('body-parser'),
    dbConnection = require('./models/db-connection'),
    Q=require('q'),
    Booking = require('./models/Booking'),
    Amenity = require('./models/Amenity'),
    AmenityForBooking = require('./models/AmenityForBooking'),
    FnB = require('./models/FnB'),
    FnBForBooking = require('./models/FnBForBooking'),
    ObjectId = require('mongoose').Types.ObjectId,
    app = express(),
    bookings = [];

app.use(express.static('static'));
app.use('/angular', express.static('node_modules/angular'));
app.use('/angular-route', express.static('node_modules/angular-route'));
app.use('/angular-ui-bootstrap', express.static('node_modules/angular-ui-bootstrap'));
app.use(bodyParser.json());
app.get('/bookings', function(req, res){
    Booking.find({}).then(function(bookings){
        res.end(JSON.stringify(bookings));
    });
});
app.get('/bookings/:bookingDate', function(req, res){
    Q.when(Booking.find({date: new Date(Date.parse(req.params.bookingDate))}))
    .then(function(bookings){
        if (bookings && bookings.length) {
            return Q.all([
                Q.when(bookings[0]),
                Q.when(AmenityForBooking.find({bookingId: new ObjectId(bookings[0]._id)})),
                Q.when(FnBForBooking.find({bookingId: new ObjectId(bookings[0]._id)}))
            ]);
        } else return [];
    })
    .then(function(result){
        var booking = result[0].toObject();
        if (!booking) {
            res.end('{}');
            return;
        }
        booking.amenities = result[1];
        booking.fnbs = result[2];
        res.end(JSON.stringify(booking));
    });
});
app.get('/amenities', function(req, res){
    Amenity.find({}).then(function(amenities){
        res.header('Content-Type' , 'application/json;charset=UTF-8' );
        res.end(JSON.stringify(amenities));
    });
});
app.get('/fnbs', function(req, res){
    FnB.find({}).then(function(fnbs){
        res.end(JSON.stringify(fnbs));
    });
});
app.post('/bookings', function(req, res){
    var bookingDate = new Date(Date.parse(req.body.date)),
        booking = new Booking({date: bookingDate, info: req.body.info});
    booking.save(function(){res.end();});
    
    
});
app.post('/bookings/amenities', function(req, res) {
    AmenityForBooking.find({
        bookingId: new ObjectId(req.body.bookingId),
        amenityId: new ObjectId(req.body.amenityId)
    }).then(function(afbs){
        var afb;
        if (afbs.length) {
            afb = afbs[0];
        } else {
            afb = new AmenityForBooking({
                bookingId: req.body.bookingId,
                amenityId: req.body.amenityId
            });
        }
        afb.comments = req.body.comments;
        afb.save(function(){
            res.end();
        });
    });
});
app.post('/bookings/fnbs', function(req, res) {
    FnBForBooking.find({
        bookingId: new ObjectId(req.body.bookingId),
        fnbId: new ObjectId(req.body.fnbId)
    }).then(function(foundFnbs){
        var fnb;
        if (foundFnbs.length) {
            fnb = foundFnbs[0];
        } else {
            fnb = new FnBForBooking({
                bookingId: req.body.bookingId,
                fnbId: req.body.fnbId
            });
        }
        fnb.quantity = req.body.quantity;
        fnb.save(function(){
            res.end();
        });
    });
});
app.delete('/bookings/:bookingDate', function(req, res){
    var bookingDate = new Date(Date.parse(req.params.bookingDate));
    Booking.find({date: bookingDate}).remove(function(bookings){
        res.end();
    });
});

app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080');
});

