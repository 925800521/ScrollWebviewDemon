define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("protocolTestCtrl", [ "$scope", "$routeParams", "NativeApp", "Protocol", function($scope, $routeParams, NativeApp, Protocol) {
        NativeApp.setWebViewState("loaded");
        $scope.item = "查询中";
        $scope.testCombine = function() {
            var combine = function() {
                var requestList = {
                    articleList: {
                        callbackId: "articleList",
                        service: "401",
                        data: {
                            gid: 34950
                        },
                        page: {
                            size: 2
                        }
                    },
                    gameList: {
                        service: "game.event.listByType",
                        data: {
                            type: 0,
                            startDay: 0,
                            period: 1
                        },
                        page: {
                            page: 1,
                            size: 5
                        },
                        options: {
                            require: true
                        }
                    },
                    gameList2: {
                        service: "game.event.listByType",
                        data: {
                            type: 0,
                            startDay: 0,
                            period: 1
                        },
                        page: {
                            page: 1,
                            size: 5
                        }
                    },
                    gameInfo: {
                        service: "1",
                        data: {
                            gid: 34950
                        },
                        options: {
                            single: true,
                            cache: 60,
                            transformResponse: function(data) {
                                return data;
                            }
                        }
                    }
                };
                Protocol.request(requestList).then(function(response) {
                    console.log("Protocol request", response);
                    $scope.combineItem = JSON.stringify(response, null, "  ");
                });
            };
            combine();
        };
        $scope.testRequest = function() {
            var request = function() {
                var request = {
                    service: "401",
                    data: {
                        gid: 34950
                    },
                    page: {
                        size: 2
                    }
                };
                request = {
                    callbackId: "eventList",
                    service: "game.event.listByType",
                    data: {
                        type: 0,
                        startDay: 0,
                        period: 1
                    },
                    page: {
                        page: 1,
                        size: 1
                    }
                };
                Protocol.request(request).then(function(response) {
                    console.log("Protocol single", response.data, response.page, response);
                    $scope.requestItem = JSON.stringify(response.data, null, "  ");
                });
            };
            request();
        };
    } ]);
});