function Bookings() {
    this.bookings = [];
}

//добавить/изменить бронирование на определенный день
//отправьте запрос POST /bookings с JSON с информацией
//о брони и вызовите функцию, переданную в третьем аргументе (callback) 
Bookings.prototype.addBooking = function(date, info, callback) {
    var xhr = new XMLHttpRequest(),
        dateString = date.toISOString().substr(0,10),
        url = "/bookings",
        data = {date: dateString, info: info};
    xhr.open("POST", url, true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

//удалить запись бронирования на определенную дату
//отправьте запрос DELETE /bookings/YYYY-MM-DD
//и вызовите функцию, переданную в третьем аргументе (callback)
Bookings.prototype.deleteBooking = function(date, callback) {
    
}
// получить сетку "бронирования на месяц"
// первый аргумент - год (целое число)
// второй аргумент - месяц (целое число, 1 - январь, 12 - декабрь)
// третий аргумент - функция, которая будет вызвана при получении
// ответа с сервера. в функцию callback нужно передать
// массив недель - строк сетки - каждая представляет собой массив
// из 7 элементов - дней
Bookings.prototype.getMonthGrid = function(year, month, callback) {
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
    
    
    
}