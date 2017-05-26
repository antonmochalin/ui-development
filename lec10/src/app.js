import style from './styles.less';
import 'angular/angular.js';
import 'angular-route';
import 'angular-ui-bootstrap';

angular.module('bookings',['ngRoute', 'booking-service', 'ui.bootstrap'])
.config(function($routeProvider){
    $routeProvider.when('/',{
        template: '<bookings-selection></bookings-selection>'
    }).when('/bookings/:bookingDate/bookingDetails',{
        template: '<booking-details></booking-details>'
    }).otherwise('/');
});

require('./nav.js');
require('./bookingsSelection.js');
require('./bookingDetails.js');
require('./navController.js');
require('./clickOutside.js');
require('./bookingService.js');
