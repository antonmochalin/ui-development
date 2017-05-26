import template from './bookingDetails.html';
angular.module('bookings').component('bookingDetails', {
    controller: BookingDetailsController,
    template: template
});
function BookingDetailsController($scope, $q, $routeParams, bookingService, lastViewedBookings) {
    var amenities, fnbs, booking;
    $scope.select = select;
    $scope.save = save;
    $scope.selectFnb = selectFnb;
    $scope.saveFnb = saveFnb;
    $scope.formatDate = formatDate;
    for (var i=0;i<lastViewedBookings.length;i++) {
        if (lastViewedBookings[i].date == $routeParams.bookingDate) {
            lastViewedBookings.splice(i,1);
        }
    }
    lastViewedBookings.splice(0, 0, {
        date: $routeParams.bookingDate,
        dateFormatted: formatDate(new Date(Date.parse($routeParams.bookingDate)))
    });
    function refreshData() {
        $q.all([bookingService.getBooking($routeParams.bookingDate), 
                bookingService.getAmenities(), 
                bookingService.getFnbs()]
            ).then(function(result){
                booking = result[0];
                amenities = result[1];
                fnbs = result[2];
                $scope.booking = booking;
                $scope.availableAmenities = getAvailableAmenities();
                $scope.selectedAmenities = getSelectedAmenities();
                $scope.selectedFnbs = getSelectedFnbs();
                $scope.availableFnbs = getAvailableFnbs();
            });
    }
    refreshData();
    function getAvailableAmenities() {
        var availableAmenities=[];
        if (!amenities) {return [];}
        angular.forEach(amenities, function(amenity){
            var found = false;
            angular.forEach(booking.amenities, function(selectedAmenity){
                if (selectedAmenity.amenityId == amenity._id) {
                    found = true;
                }
            });
            if (!found) availableAmenities.push(amenity);
        });
        return availableAmenities;
    }
    function getSelectedAmenities() {
        var selectedAmenities=[];
        if (!booking || !booking.amenities) return [];
        angular.forEach(booking.amenities, function(selectedAmenity){
            var foundAmenity;
            angular.forEach(amenities, function(amenity){
                if (selectedAmenity.amenityId == amenity._id) {
                    foundAmenity = amenity;
                }
            });
            selectedAmenities.push(angular.extend({
                price: foundAmenity.price,
                name: foundAmenity.name
            }, selectedAmenity));
        });
        return selectedAmenities;
    }
    function getAvailableFnbs() {
        var availableFnbs=[];
        if (!fnbs) {return [];}
        angular.forEach(fnbs, function(item){
            var found = false;
            angular.forEach(booking.fnbs, function(selectedFnb){
                if (selectedFnb.fnbId == item._id) {
                    found = true;
                }
            });
            if (!found) availableFnbs.push(item);
        });
        return availableFnbs;
    }
    function getSelectedFnbs() {
        var selectedFnbs=[];
        if (!booking || !booking.fnbs) return [];
        angular.forEach(booking.fnbs, function(selectedFnb){
            var foundFnb;
            angular.forEach(fnbs, function(fnb){
                if (selectedFnb.fnbId == fnb._id) {
                    foundFnb = fnb;
                }
            });
            if (foundFnb) {
                selectedFnbs.push(angular.extend({
                    price: foundFnb.price,
                    name: foundFnb.name
                }, selectedFnb));
            }
            
        });
        return selectedFnbs;
    }
    function select(item){
        bookingService.saveAmenity(booking._id, item._id, '')
        .then(function(){
            refreshData();
        });
    }
    function selectFnb(item) {
        bookingService.saveFnb(booking._id, item._id, 1)
        .then(function(){
            refreshData();
        });
    }
    function save(item){
        bookingService.saveAmenity(booking._id, item.amenityId, item.quantity)
        .then(function(){
            refreshData();
        });
    }
    function saveFnb(item){
        bookingService.saveFnb(booking._id, item.fnbId, item.quantity)
        .then(function(){
            refreshData();
        });
    }
    function formatDate(date) {
        if (!date) return '';
        return (date.getDate()<10 ? '0' : '')
            + date.getDate() + '.'
            + (date.getMonth()<9 ? '0' : '')
            + (date.getMonth()+1) + '.'
            + date.getFullYear();
    }
}