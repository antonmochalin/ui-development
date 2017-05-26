angular.module('booking-service',[]).service('bookingService', function($http){
    return {
        getBookings: function(year, month){
            // массив недель месяца (каждый элемент - массив дней недели)
            var weeksArr = [],
                dateStrToBooking = {},
                // первый день месяца
                monthStartDate = new Date(year, month-1, 1),
                // день недели, на который приходится первый день месяца 
                // 0-воскресенье, 1-понедельник,... 6-суббота
                firstDay = monthStartDate.getDay(),
                // число дней от предыдущего месяца на первой неделе
                // (неделю начинаем по-русски, с понедельника)
                prevMonthDaysInFirstWeek = (firstDay == 0) ? 6 : (firstDay - 1),
                // номер предыдущего месяца (1-январь, 12-декабрь)
                prevMonth = month-1 > 0 ? month-1 : 12,
                // число дней в предыдущем месяце
                daysInPrevMonth = (new Date(year, 
                                            month-1, 
                                            0)).getDate(),
                // дата для итерации при построении сетки на месяц, 
                // начинаем с понедельника на первой неделе
                iterationDate = prevMonthDaysInFirstWeek == 0 ? 
                                    new Date(Date.UTC(year, month-1, 1)) :
                                    new Date(Date.UTC(prevMonth == 12 ? year-1: year, 
                                             prevMonth-1, 
                                             daysInPrevMonth - prevMonthDaysInFirstWeek + 1));
            while (
                ((iterationDate.getMonth() < month) && (iterationDate.getFullYear() == year))
                || (iterationDate.getFullYear<year)
            ) {
                var currentWeek =[];
                while (currentWeek.length<7) {
                    var booking = {date:iterationDate};
                    dateStrToBooking[iterationDate.toISOString().substr(0, 10)] = booking;
                    currentWeek.push(booking);
                    iterationDate = new Date(Date.UTC(iterationDate.getFullYear(), 
                                             iterationDate.getMonth(), 
                                             iterationDate.getDate()+1));
                }
                weeksArr.push(currentWeek);
            }
            var firstDayString = weeksArr[0][0].date.toISOString().substr(0, 10),
                lastDayString = weeksArr[weeksArr.length-1][6].date.toISOString().substr(0, 10),
                url = "bookings?from=" + firstDayString + "&to=" + lastDayString;
            return $http.get(url).then(function(result){
                for (i = 0; i<result.data.length; i++) {
                    var booking = result.data[i],
                        bookingDateStr = booking.date.substr(0, 10),
                        bookingCell = dateStrToBooking[bookingDateStr];
                    if (bookingCell) {
                        bookingCell.info = booking.info;
                        bookingCell.bookingId = booking._id;
                    }
                }
                return weeksArr;
            });
        },
        saveBooking: function(booking) {
            return $http.post('/bookings', {
                info: booking.info,
                date: booking.date.toISOString().substr(0, 10)
            });
        },
        deleteBooking: function(date) {
            var dateString = date.toISOString().substr(0,10);
            return $http['delete']('/bookings/'+dateString);
        },
        getBooking: function(bookingDateString) {
            return $http.get('/bookings/'+bookingDateString).then(function(result){
                var booking = result.data;
                if (booking) {
                    booking.date = new Date(Date.parse(booking.date));
                }
                return result.data;
            });
        },
        getAmenities: function() {
            return $http.get('/amenities').then(function(result){
                return result.data;
            });
        },
        saveAmenity: function(bookingId, amenityId, comments) {
            return $http.post('/bookings/amenities', {
                bookingId: bookingId,
                amenityId: amenityId,
                comments: comments
            });
        },
        getFnbs: function() {
            return $http.get('/fnbs').then(function(result){
                return result.data;
            });
        },
        saveFnb: function(bookingId, fnbId, quantity) {
            return $http.post('/bookings/fnbs', {
                bookingId: bookingId,
                fnbId: fnbId,
                quantity: parseInt(quantity)
            });
        }
    };
});
