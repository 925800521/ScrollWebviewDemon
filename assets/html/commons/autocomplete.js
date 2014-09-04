define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.directive("autocomplete", [ "NativeApp", "Utils", function(NativeApp, Utils) {
        var index = -1;
        return {
            restrict: "E",
            scope: {
                searchParam: "=ngModel",
                search: "&",
                initAuto: "=initAuto"
            },
            controller: [ "$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                $scope.searchParam;
                $scope.searchFilter;
                $scope.selectedIndex = -1;
                $scope.setIndex = function(i) {
                    $scope.selectedIndex = parseInt(i);
                };
                this.setIndex = function(i) {
                    $scope.setIndex(i);
                    $scope.$apply();
                };
                $scope.getIndex = function(i) {
                    return $scope.selectedIndex;
                };
                var watching = true;
                $scope.completing = false;
                $scope.searching = false;
                var intervalTimer;
                var initAutoComplete = false;
                $scope.$watch("searchParam", function() {
                    if (intervalTimer) clearInterval(intervalTimer);
                    if (angular.isDefined($scope.initAuto) && !$scope.initAuto && !initAutoComplete) {
                        initAutoComplete = true;
                        return;
                    } else initAutoComplete = true;
                    if (watching && initAutoComplete && $scope.searchParam) {
                        $scope.completing = true;
                        $scope.searchFilter = $scope.searchParam;
                        $scope.selectedIndex = -1;
                    }
                    if (initAutoComplete && $scope.searchParam) if (Utils.isMobile()) {
                        var kwd = $scope.searchParam;
                        JSBridge.callNative("NineGameClient", "searchGift", {
                            url: "/api/op.ka.gift.search",
                            data: {
                                data: {
                                    keyword: kwd
                                },
                                page: {
                                    page: 1,
                                    size: 10
                                }
                            }
                        });
                        if (intervalTimer) {
                            clearInterval(intervalTimer);
                            intervalTimer = null;
                        }
                        intervalTimer = setInterval(function() {
                            var jsonStr = JSBridge.callNative("NineGameClient", "getSearchResult");
                            if (jsonStr) try {
                                var jsonObject = JSON.parse(jsonStr);
                                if (jsonObject && 2 == jsonObject.status) {
                                    clearInterval(intervalTimer);
                                    intervalTimer = null;
                                    if (jsonObject.result) {
                                        var jsonData = jsonObject.result.data;
                                        $scope.suggestions = jsonData.giftDetails;
                                        $scope.$apply();
                                    }
                                }
                            } catch (e) {
                                clearInterval(intervalTimer);
                                intervalTimer = null;
                                console.log(">>>search result:" + jsonStr);
                            }
                        }, 200);
                        setTimeout(function() {
                            clearInterval(intervalTimer);
                            intervalTimer = null;
                            console.log(">>>clearInterval due to timeout");
                        }, 1e4);
                    } else ;
                });
                this.preSelect = function(suggestion) {
                    watching = false;
                    $scope.$apply();
                    watching = true;
                };
                $scope.preSelect = this.preSelect;
                this.preSelectOff = function() {
                    watching = true;
                };
                $scope.preSelectOff = this.preSelectOff;
                $scope.select = function(suggestion) {
                    if (suggestion) NativeApp.openWindow("/gift/detail.html", {
                        sceneId: suggestion.sceneId
                    }, "game_article");
                    watching = false;
                    $scope.completing = false;
                    setTimeout(function() {
                        watching = true;
                    }, 1e3);
                    $scope.setIndex(-1);
                };
            } ],
            link: function(scope, element, attrs) {
                var attr = "";
                scope.attrs = {
                    placeholder: "输入礼包关键字",
                    "class": "",
                    id: ""
                };
                for (var a in attrs) {
                    attr = a.replace("attr", "").toLowerCase();
                    if (0 === a.indexOf("attr")) scope.attrs[attr] = attrs[a];
                }
                if ("true" == attrs["clickActivation"]) element[0].onclick = function(e) {
                    if (!scope.searchParam) {
                        scope.completing = true;
                        scope.$apply();
                    }
                };
                var key = {
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40,
                    enter: 13,
                    esc: 27
                };
                document.addEventListener("keydown", function(e) {
                    var keycode = e.keyCode || e.which;
                    switch (keycode) {
                      case key.esc:
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                        e.preventDefault();
                    }
                }, true);
                document.addEventListener("blur", function(e) {
                    setTimeout(function() {
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                    }, 200);
                }, true);
                element[0].addEventListener("keydown", function(e) {
                    var keycode = e.keyCode || e.which;
                    var l = angular.element(this).find("li").length;
                    switch (keycode) {
                      case key.up:
                        index = scope.getIndex() - 1;
                        if (index < -1) index = l - 1; else if (index >= l) {
                            index = -1;
                            scope.setIndex(index);
                            scope.preSelectOff();
                            break;
                        }
                        scope.setIndex(index);
                        if (index !== -1) scope.preSelect(angular.element(angular.element(this).find("li")[index]).text());
                        scope.$apply();
                        break;

                      case key.down:
                        index = scope.getIndex() + 1;
                        if (index < -1) index = l - 1; else if (index >= l) {
                            index = -1;
                            scope.setIndex(index);
                            scope.preSelectOff();
                            scope.$apply();
                            break;
                        }
                        scope.setIndex(index);
                        if (index !== -1) scope.preSelect(angular.element(angular.element(this).find("li")[index]).text());
                        break;

                      case key.left:
                        break;

                      case key.right:
                      case key.enter:
                        index = scope.getIndex();
                        if (index !== -1) scope.select(angular.element(angular.element(this).find("li")[index]).text());
                        scope.setIndex(-1);
                        scope.$apply();
                        break;

                      case key.esc:
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                        e.preventDefault();
                        break;

                      default:
                        return;
                    }
                    if (scope.getIndex() !== -1 || keycode == key.enter) e.preventDefault();
                });
            },
            templateUrl: "modules/shared/autoSuggestion.tpl.html"
        };
    } ]);
    app.filter("highlight", function($sce) {
        return function(input, searchParam) {
            if (searchParam) {
                var words = searchParam.split(/\ /).join("|"), exp = new RegExp("(" + words + ")", "gi");
                if (words.length) input = $sce.trustAsHtml(input.replace(exp, '<span class="highlight">$1</span>'));
            }
            return input;
        };
    });
    app.directive("suggestion", function() {
        return {
            restrict: "A",
            require: "^autocomplete",
            link: function(scope, element, attrs, autoCtrl) {
                element.bind("mouseenter", function() {
                    autoCtrl.preSelect(attrs["val"]);
                    autoCtrl.setIndex(attrs["index"]);
                });
                element.bind("mouseleave", function() {
                    autoCtrl.preSelectOff();
                });
            }
        };
    });
});