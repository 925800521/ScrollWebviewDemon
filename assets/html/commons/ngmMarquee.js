define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.directive("marquee", [ "$interval", "$timeout", function($interval, $timeout) {
        var worker = null;
        return {
            scope: {
                itemList: "=marquee",
                duration: "@marqueeDuration"
            },
            link: function(scope, element, attrs) {
                var height = element[0].clientHeight;
                var animationTime = 300;
                var waitTime = 17;
                var style = [ ".marquee_init {", "white-space: nowrap;", "overflow:hidden;", "text-overflow:ellipsis;", "height:", height, "px;", "width:100%;", "transform: translate(0px, ", height, "px) translateZ(0px);", "}", ".marquee_effect {", "-webkit-transition:all ", animationTime, "ms ease-in;", "transition:all ", animationTime, "ms ease-in;", "}", ".marquee_out {", "transform: translate(0px, -", 5 * height, "px) translateZ(0px)!important;", "}", ".marquee_in {", "transform: translate(0px, 0px) translateZ(0px)!important;", "}" ].join("");
                var head = angular.element(document.head);
                head.append('<style type="text/css">' + style + "</style>");
                scope.$watchCollection(function() {
                    return element.children().children();
                }, function(value) {
                    if (value && value.length > 1) {
                        init();
                        start();
                    } else stop();
                });
                function init() {
                    var list = element.children().children();
                    for (var i = 0; i < list.length; i++) {
                        list[i].classList.add("marquee_init");
                        list[i].classList.add("marquee_effect");
                        list[i].style.display = "none";
                    }
                    list[0].style.display = "block";
                    list[0].classList.add("marquee_in");
                    list = null;
                }
                function start() {
                    stop();
                    worker = $interval(function() {
                        scope.currentIndex = scope.currentIndex < scope.itemList.length - 1 ? scope.currentIndex + 1 : 0;
                        var list = element.children().children();
                        for (var i = 0, isAnimation; i < list.length; i++) {
                            isAnimation = list[i].classList.contains("marquee_in");
                            list[i].style.display = isAnimation ? "block" : "none";
                            list[i].classList.remove("marquee_in");
                            list[i].classList[isAnimation ? "add" : "remove"]("marquee_out");
                        }
                        $timeout(function() {
                            for (var i = 0; i < list.length; i++) {
                                list[i].style.display = i == scope.currentIndex ? "block" : "none";
                                if (list[i].classList.contains("marquee_out")) list[i].classList.remove("marquee_out");
                            }
                            $timeout(function() {
                                list[scope.currentIndex].classList.add("marquee_in");
                            }, waitTime);
                        }, animationTime / 2);
                    }, (Number(scope.duration) || 3e3) + animationTime + waitTime);
                }
                function stop() {
                    if (worker) {
                        $interval.cancel(worker);
                        worker = null;
                    }
                    scope.currentIndex = 0;
                }
            }
        };
    } ]);
});