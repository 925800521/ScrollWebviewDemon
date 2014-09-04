define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("latestGameListCtrl", [ "NativeApp", "Loader", "GameService", "$scope", function(NativeApp, Loader, GameService, $scope) {
        var vm = $scope;
        vm.gameList = [];
        NativeApp.setNavTitle("最新专区");
        Loader.initPager({
            callbackId: "gameList",
            service: "game.rank.list",
            data: {
                orderid: 8
            },
            options: {
                pager: true,
                transformResponse: GameService.format
            }
        }, function(response) {
            vm.gameScoreInstructDesc = true;
            vm.showTime = true;
            vm.statInfo = {
                a1: "zxzq"
            };
            Array.prototype.push.apply($scope.gameList, response.data.gameList);
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                gameName: encodeURIComponent(gameInfo.base.gameName),
                a1: "zxzq"
            }, "game_detail");
        };
    } ]);
});