define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("recommendCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "GameService", function($scope, NativeApp, Loader, $routeParams, GameService) {
        NativeApp.setNavTitle("小编推荐");
        $scope.specailInfoField = "yb";
        $scope.statInfo = {
            a1: "rmyx"
        };
        $scope.gameList = [];
        var config = {
            callbackId: "gameList",
            service: "op.ad.adm.getGameList",
            data: {
                type: 402
            },
            options: {
                transformResponse: GameService.format
            }
        };
        Loader.initPager(config, function onPage(response, pager) {
            Array.prototype.push.apply($scope.gameList, response.data.gameList);
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: $scope.statInfo.a1
            }, "game_detail");
        };
    } ]);
});