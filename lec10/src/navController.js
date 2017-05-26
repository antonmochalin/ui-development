angular.module('bookings').controller('navController', function($scope, lastViewedBookings){
    $scope.lastBookings = lastViewedBookings; 
});
angular.module('bookings').value('lastViewedBookings',[]);