var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    bookings = [];

app.use(express.static('static'));
app.use('/angular', express.static('node_modules/angular'));
app.use(bodyParser.json());
app.post('/bookings', function(req, res){
    var bookingDate = new Date(Date.parse(req.body.date)),
        i, booking;
    for (i=0;i<bookings.length;i++) {
        if (bookings[i].date.getTime()==bookingDate.getTime()) {
            booking = bookings[i];
        }
    }
    if (!booking) {
        booking = {
            date: bookingDate
        };
        bookings.push(booking);
    }
    booking.info = req.body.info;
    console.dir(bookings);
    res.end();
});
app.get('/bookings', function(req, res) {
    var responseBookings = [],
        startDate = new Date(Date.parse(req.query.from)),
        endDate = new Date(Date.parse(req.query.to)),
        i;
    for (i = 0; i < bookings.length; i++) {
        if (bookings[i].date >= startDate && bookings[i].date <= endDate) {
            responseBookings.push({
                date: bookings[i].date.toISOString().substr(0, 10),
                info: bookings[i].info
            });
        }
    }
    
    res.end(JSON.stringify(responseBookings));
});
app.delete('/bookings/:bookingDate', function(req, res){
    var date = new Date(Date.parse(req.params.bookingDate)),
        i, indexToDelete;
    for (i = 0; i < bookings.length; i++) {
        if (bookings[i].date.getTime() == date.getTime()) {
            indexToDelete = i;
        }
    }
    if (indexToDelete!==undefined) {
        bookings.splice(indexToDelete, 1);
    }
    console.dir(bookings);
    res.end();
});

app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080');
});
