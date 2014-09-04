define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("excellentCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "GameService", function($scope, NativeApp, Loader, $routeParams, GameService) {
        NativeApp.setNavTitle("优质游戏");
        $scope.specailInfoField = "downloadWeek";
        $scope.statInfo = {
            a1: "fl_yzyx"
        };
        $scope.gameList = [];
        var config = {
            callbackId: "gameList",
            service: "game.evaluation.listExcellent",
            options: {
                transformResponse: GameService.format
            }
        };
        Loader.initPager(config, function(response) {
            angular.forEach(response.data.gameList, function(gameInfo) {
                gameInfo.status.excellent = null;
            });
            Array.prototype.push.apply($scope.gameList, response.data.gameList);
        }, {
            a1: "fl_yzyx"
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: "yzyx"
            }, "game_detail");
        };
    } ]);
});