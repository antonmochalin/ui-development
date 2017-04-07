function Bookings() {
    this.bookings = [];
}

//добавить/изменить бронирование на определенный день
Bookings.prototype.addBooking = function(date, info) {
    var xhr = new XMLHttpRequest(),
        dateString = date.toISOString().substr(0,10),
        url = "/bookings",
        data = {date: dateString, info: info};
    xhr.open("POST", url, false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

//удалить запись бронирования на определенную дату
Bookings.prototype.deleteBooking = function(date) {
    var xhr = new XMLHttpRequest(),
        dateString = date.toISOString().substr(0,10),
//        url = "/bookings?date=" + dateString;
        url = "/bookings/" + dateString;
    xhr.open("DELETE", url, false);
    xhr.send();
};
// получить сетку "бронирования на месяц"
// первый аргумент - год (целое число)
// второй аргумент - месяц (целое число, 1 - январь, 12 - декабрь)
Bookings.prototype.getMonthGrid = function(year, month) {
        // массив недель месяца (каждый элемент - массив дней недели)
    var weeksArr = [],
        dateStrToBooking = {},
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
            var booking = {date:iterationDate};
            dateStrToBooking[iterationDate.toISOString().substr(0, 10)] = booking;
            currentWeek.push(booking);
            iterationDate = new Date(iterationDate.getFullYear(), 
                                     iterationDate.getMonth(), 
                                     iterationDate.getDate()+1)
        }
        weeksArr.push(currentWeek);
    }
    var firstDayString = weeksArr[0][0].date.toISOString().substr(0, 10),
        lastDayString = weeksArr[weeksArr.length-1][6].date.toISOString().substr(0, 10),
        url = "bookings?from=" + firstDayString + "&to=" + lastDayString,
        xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    var bookingsArr = JSON.parse(xhr.responseText),
        i;
    for (i = 0; i<bookingsArr.length; i++) {
        var booking = bookingsArr[i],
            bookingCell = dateStrToBooking[booking.date];
        if (bookingCell) {
            bookingCell.info = booking.info;
        }
    }
    
    return weeksArr;
    
}