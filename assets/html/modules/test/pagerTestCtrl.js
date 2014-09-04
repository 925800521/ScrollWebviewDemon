define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("pagerTestCtrl", [ "$scope", "GameService", "NativeApp", "$routeParams", "InitLoader", "$rootScope", "Pager", "PagerLoader", function($scope, GameService, NativeApp, $routeParams, InitLoader, $rootScope, Pager, PagerLoader) {
        NativeApp.setWebViewState("loaded");
        var transformResponse = function(data) {
            console.log(data);
            return GameService.format(data.list);
        };
        var config1 = {
            callbackId: "gameList1",
            service: "104",
            data: {
                kwds: "小鸟"
            },
            page: {
                page: 32,
                size: 3
            },
            options: {
                delay: 0,
                preload: false,
                maxCount: 4,
                transformResponse: transformResponse
            }
        };
        var config2 = {
            callbackId: "rankList",
            service: "game.rank.list",
            page: {
                page: 1,
                size: 2
            },
            options: {
                delay: 1e3,
                autoLoad: true,
                transformResponse: transformResponse
            }
        };
        var config3 = {
            callbackId: "gameList2",
            service: "game.event.listByType",
            data: {
                type: 0,
                startDay: 0,
                period: 4
            },
            page: {
                page: 1,
                size: 2
            },
            options: {
                transformResponse: transformResponse
            }
        };
        function onPage(response, pager) {
            if (pager == pager1 || pager == pager2) $scope.gameList = $scope.seqGameList = $scope.seqGameList.concat(response.data); else $scope.gameList = $scope.switchGameList = $scope.switchGameList.concat(response.data);
        }
        var pager1 = new Pager(config1);
        var pager2 = new Pager(config2);
        var pager3 = new Pager(config3);
        $rootScope.loadPage = function() {
            PagerLoader.reload();
        };
        $scope.seqGameList = [];
        $scope.seqMode = function() {
            $scope.mode = "串行模式";
            $scope.gameList = $scope.seqGameList;
            PagerLoader.init([ pager1, pager2 ], onPage);
        };
        $scope.switchGameList = [];
        $scope.switchMode = function() {
            $scope.mode = "切换模式";
            $scope.gameList = $scope.switchGameList;
            PagerLoader.init(pager3, onPage);
        };
        $scope.triggerEvent = function() {
            setTimeout(function() {
                JSBridge.onEvent("page_scroll_bottom");
            }, 0);
        };
        $scope.seqMode();
    } ]);
});