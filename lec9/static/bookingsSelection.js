angular.module('bookings').component('bookingsSelection', {
    controller: BookingsController,
    templateUrl: 'bookingsSelection.html'
});
function BookingsController($scope, bookingService) {
    var today = new Date(),
        currentMonth = today.getMonth()+1,
        currentYear = today.getFullYear();
    $scope.previousMonth = previousMonth;
    $scope.nextMonth = nextMonth;
    $scope.showAddEditForm = showAddEditForm;
    $scope.saveBooking = saveBooking;
    $scope.removeBooking = removeBooking;
    $scope.formatDate = formatDate;
    
    showMonth();
    
    function showMonth() {
        $scope.currentMonth = currentMonth;
        $scope.currentYear = currentYear;
        bookingService.getBookings(currentYear, currentMonth).then(function(weeksGrid){
            $scope.weeksGrid = weeksGrid;
        });
    }
    // функция, обрабатывающая клик на кнопке "<<"
    function previousMonth() {
        var dateInPrevMonth = new Date(currentYear, currentMonth-1, 0);
        currentYear = dateInPrevMonth.getFullYear();
        currentMonth = dateInPrevMonth.getMonth()+1;
        showMonth();
    }
    
    // функция, обрабатывающая клик на кнопке ">>"
    function nextMonth() {
        var dateInNextMonth = new Date(currentYear, currentMonth, 1);
        currentYear = dateInNextMonth.getFullYear();
        currentMonth = dateInNextMonth.getMonth()+1;
        showMonth();
    }
    
    // функция, показывающая форму создания/изменения брони
    function showAddEditForm(day) {
        $scope.selectedDay = angular.copy(day);
        $scope.savedBookingDate = null;
    }
    
    // функция, обрабатывающая сохранение брони
    function saveBooking() {
        $scope.savedBookingDate = $scope.selectedDay.date;
        bookingService.saveBooking($scope.selectedDay).then(function(){
            $scope.selectedDay = null;
            showMonth();
        });
    }
    
    // функция, обрабатывающая удаление брони
    function removeBooking() {
        bookingService.deleteBooking($scope.selectedDay.date).then(function(){
            $scope.selectedDay = null;
            showMonth();
        });
        
    }
    
    // форматирование даты
    function formatDate(date) {
        return (date.getDate()<10 ? '0' : '')
            + date.getDate() + '.'
            + (date.getMonth()<9 ? '0' : '')
            + (date.getMonth()+1) + '.'
            + date.getFullYear();
    }
};