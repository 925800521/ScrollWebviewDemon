define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("pastCommendListCtrl", [ "$scope", "$routeParams", "NativeApp", "Loader", "GameService", function($scope, $routeParams, NativeApp, Loader, GameService) {
        var type = $routeParams.type;
        if (400 == type) NativeApp.setNavTitle("往期推荐"); else if (401 == type) NativeApp.setNavTitle("往期精品");
        $scope.statInfo = {
            a1: "mryj"
        };
        $scope.gameScoreInstructDesc = "instruction";
        var config = {
            callbackId: "gameList",
            service: "op.ad.adm.getGameList",
            data: {
                type: type
            },
            options: {
                pager: true,
                transformResponse: GameService.format
            }
        };
        $scope.gameList = [];
        Loader.initPager(config, function(response) {
            Array.prototype.push.apply($scope.gameList, response.data.gameList.list);
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                gameName: gameInfo.base.gameName,
                a1: $scope.statInfo.a1
            }, "game_detail");
        };
    } ]);
});