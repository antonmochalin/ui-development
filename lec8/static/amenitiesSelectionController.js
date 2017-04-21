angular.module('bookings').controller('amenitiesSelectionController', AmenitiesSelectionController);
function AmenitiesSelectionController($scope, $q, $routeParams, bookingService) {
    var amenities, booking;
    $scope.select = select;
    $scope.save = save;
    $scope.formatDate = formatDate;
    function refreshData() {
        $q.all([bookingService.getBooking($routeParams.bookingDate), bookingService.getAmenities()])
            .then(function(result){
                booking = result[0];
                amenities = result[1];
                $scope.booking = booking;
                $scope.availableAmenities = getAvailableAmenities();
                $scope.selectedAmenities = getSelectedAmenities();
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
    function select(item){
        bookingService.saveAmenity(booking._id, item._id, '')
        .then(function(){
            refreshData();
        });
    }
    function save(item){
        bookingService.saveAmenity(booking._id, item.amenityId, item.comments)
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