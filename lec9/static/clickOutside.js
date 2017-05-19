angular.module('bookings')
.directive( 'clickOutside', function($document, $timeout) {
    return {
        link: function(scope, element, attrs) {
            var onClickFn = function(event) {
                var domEl=event.target;
                while (domEl && domEl!=$document[0]) {
                    if (domEl == element[0]) {
                        return;
                    }
                    domEl = domEl.parentNode;
                }
                if (domEl) {
                    scope.clickOutside();
                    scope.$apply();
                }
                
                
                
            }
            
            scope.$watch('isActive', function(newValue, oldValue) {
                if (newValue)
                    $document.on('click', onClickFn);
                else
                    $document.off('click', onClickFn);
            });
            
            
            scope.$on('$destroy', function() {
                $document.off('click', onClickFn);
            });
            
        },
        scope: {
            isActive: '=',
            clickOutside: '&'
        }
    };
});