function Bookings() {
    this.bookings = [];
}

//добавить/изменить бронирование на определенный день
Bookings.prototype.addBooking = function(date, info) {
    var booking = this.findBookingForDate(date);
    if (info === undefined) {
        info = '';
    }
    if (!booking) {
        booking = {date: date, info: info};
        this.bookings.push(booking);
    } else {
        booking.info = info;
    }
}
//найти запись бронирования на определенную дату
Bookings.prototype.findBookingForDate = function(date) {
    var booking;
    for (i=0;i<this.bookings.length;i++) {
        if (date.getTime() == this.bookings[i].date.getTime()) {
            booking = this.bookings[i];
        }
    }
    return booking;
}
//удалить запись бронирования на определенную дату
Bookings.prototype.deleteBooking = function(date) {
    var bookingIndex,
        i = 0;
    while ( (bookingIndex === undefined) && (i < this.bookings.length) ) {
        if (this.bookings[i].date.getTime() == date.getTime()) {
            bookingIndex = i;
        }
    }
    if (bookingIndex !== undefined) {
        this.bookings.splice(bookingIndex, 1);
    }
}
//получить сетку "бронирования на месяц"
//первый аргумент - год (целое число)
//второй аргумент - месяц (целое число, 1 - январь, 12 - декабрь)
//третий аргумент - массив броней
//вернет массив недель, каждая из которых - массив дней,
//каждый из которых - объект с полями date - дата
//и booking - или undefined, или текст информации о бронировании
Bookings.prototype.getMonthGrid = function(year, month) {
        // массив недель месяца (каждый элемент - массив дней недели)
    var weeksArr = []
        // первый день месяца
        monthStartDate = new Date(year, month-1),
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
                            new Date(year, month-1, 1) :
                            new Date(prevMonth == 12 ? year-1: year, 
                                     prevMonth-1, 
                                     daysInPrevMonth - prevMonthDaysInFirstWeek + 1);
    while (
        ((iterationDate.getMonth() < month) && (iterationDate.getFullYear() == year))
        || (iterationDate.getFullYear<year)
    ) {
        var currentWeek =[];
        while (currentWeek.length<7) {
            var booking = this.findBookingForDate(iterationDate);
            if (!booking) {
                booking = {date:iterationDate};
            };
            currentWeek.push(booking);
            iterationDate = new Date(iterationDate.getFullYear(), 
                                     iterationDate.getMonth(), 
                                     iterationDate.getDate()+1)
        }
        weeksArr.push(currentWeek);
    }
    return weeksArr;
    
}