define(function(require, exports, module) {
    "use strict";
    angular.module("ngmApp").directive("scrollable", function($timeout, $window, $document) {
        return {
            restrict: "AE",
            scope: {
                scrollToPageTime: "@" || 400,
                currPageX: "=",
                currPageY: "=",
                currY: "=",
                currX: "=",
                isMaxX: "=",
                isMinX: "=",
                isMaxY: "=",
                isMinY: "=",
                onRefresh: "&",
                onBeforeScrollStart: "&",
                onScrollStart: "&",
                onBeforeScrollMove: "&",
                onScrollMove: "&",
                parameters: "@",
                onBeforeScrollEnd: "&",
                onScrollEnd: "&",
                onTouchEnd: "&",
                onDestroy: "&",
                onZoomStart: "&",
                onZoom: "&",
                onZoomEnd: "&"
            },
            transclude: true,
            template: '<div class="scroller" ng-transclude></div>',
            link: function(scope, element, attrs) {
                var style = [ ".inline-flex {" + "  display: -webkit-inline-flex;", "  display: -moz-inline-flex;", "  display: -ms-inline-flexbox;", "  display: -ms-inline-flex;", "  display: inline-flex;", "  display: -webkit-inline-box;", "  overflow: hidden;", "  backface-visibility: hidden;", "  white-space: nowrap;", "}", ".inline-flex > * {", "  display: block;", "}" ].join("");
                var head = angular.element($document[0].head);
                head.append('<style type="text/css">' + style + "</style>");
                element.css("overflow", "hidden");
                element.css("position", "relative");
                element.css("width", "auto");
                var scroller = angular.element(element.children(".scroller")[0]);
                var center;
                var pre;
                var next;
                var iScrollInstance;
                var scrollToPageX = function(pageX) {
                    if (angular.isDefined(iScrollInstance.pages) && 0 !== iScrollInstance.pages.length && angular.isDefined(pageX)) iScrollInstance.goToPage(pageX, 0, scope.scrollToPageTime);
                };
                var scrollToPageY = function(pageY) {
                    if (angular.isDefined(iScrollInstance.pages) && 0 !== iScrollInstance.pages.length && angular.isDefined(pageY)) iScrollInstance.goToPage(0, pageY, scope.scrollToPageTime);
                };
                var scrollToY = function(Y) {
                    if (angular.isDefined(Y)) iScrollInstance.scrollTo(0, Y, scope.scrollToPageTime);
                };
                var scrollToX = function(newVal) {
                    if (angular.isDefined(newVal)) iScrollInstance.scrollTo(newVal, 0, scope.scrollToPageTime);
                };
                var _position = function() {
                    var outerWidth = scroller.parent()[0].offsetWidth;
                    var innerWidth = scroller[0].offsetWidth;
                    var centerPos = outerWidth / 2;
                    var currPos = center && center[0] ? center[0].offsetLeft + center[0].offsetWidth / 2 : 0;
                    if (innerWidth > outerWidth) {
                        if (currPos > centerPos) iScrollInstance.scrollTo(centerPos - currPos, 0, 0); else pre && pre.css("opacity", .5);
                        iScrollInstance.on("scrollEnd", function() {
                            pre && pre.css("opacity", 0 == this.x ? .5 : 1);
                            next && next.css("opacity", this.x == this.wrapperWidth - this.scrollerWidth ? .5 : 1);
                        });
                    } else {
                        pre && pre.css("opacity", .5);
                        next && next.css("opacity", .5);
                    }
                };
                var _init = function() {
                    iScrollInstance = new IScroll(element[0], angular.extend({
                        disableMouse: true,
                        disablePointer: true
                    }, scope.iscrollParameters));
                    for (var onMethod in scope) if (onMethod.indexOf("on") !== -1 && scope.hasOwnProperty(onMethod) && angular.isFunction(scope[onMethod])) {
                        var event = onMethod.substring(2).charAt(0).toLowerCase() + onMethod.substring(2).slice(1);
                        if ("scrollEnd" === event) continue;
                        iScrollInstance.on(event, scope[onMethod]);
                    }
                    if (scope.iscrollParameters.center) center = angular.element(element[0].querySelector(scope.iscrollParameters.center));
                    if (scope.iscrollParameters.prev) pre = angular.element(element.parent().parent()[0].querySelector(scope.iscrollParameters.prev));
                    if (scope.iscrollParameters.next) next = angular.element(element.parent().parent()[0].querySelector(scope.iscrollParameters.next));
                    if (scope.iscrollParameters.scrollbars) element.css("padding-bottom", "8px");
                    _position();
                    var supportsOrientationChange = "onorientationchange" in $window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
                    var scr = {};
                    $window.addEventListener(orientationEvent, function() {
                        if (scr.width !== screen.width || scr.height !== screen.height) {
                            scr = {
                                width: screen.width,
                                height: screen.height
                            };
                            if (angular.isDefined(iScrollInstance)) iScrollInstance.refresh();
                        }
                    }, false);
                    element.bind("$destroy", function() {
                        if (angular.isDefined(iScrollInstance)) {
                            iScrollInstance.destroy();
                            iScrollInstance = void 0;
                        }
                    });
                };
                attrs.$observe("parameters", function(val) {
                    if (angular.isString(val)) scope.iscrollParameters = angular.fromJson(val); else scope.iscrollParameters = val;
                    scope.scrollX = "scrollX" in scope.iscrollParameters && scope.iscrollParameters.scrollX;
                    if (scope.scrollX) scroller.addClass("inline-flex");
                    scope.$watchCollection(function() {
                        return scroller.children();
                    }, function(nVal) {
                        if (nVal && nVal.length) {
                            if (angular.isDefined(iScrollInstance)) iScrollInstance.destroy();
                            $timeout(function() {
                                _init();
                                if (angular.isDefined(iScrollInstance.pages) && iScrollInstance.pages.length > 0) {
                                    scrollToPageX(nVal.currPageX);
                                    scrollToPageY(nVal.currPageY);
                                }
                            });
                        }
                    });
                });
            }
        };
    });
});