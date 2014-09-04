define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    var registerEvent = "ngTouchStart|ngTouchEnd|ngTouchCancel|ngTouchMove".split("|");
    angular.forEach(registerEvent, function(eventName) {
        app.directive(eventName, function() {
            return {
                restrict: "A",
                link: function(scope, element, attrs) {
                    element.bind(eventName.replace("ng", "").toLowerCase(), function(evt) {
                        scope.$apply(function() {
                            scope.$eval(attrs[eventName]);
                        });
                    });
                }
            };
        });
    });
});