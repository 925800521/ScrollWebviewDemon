define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("crackCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "GameService", function($scope, NativeApp, Loader, $routeParams, GameService) {
        NativeApp.setNavTitle("破解游戏");
        $scope.gameList = [];
        var config = {
            callbackId: "gameList",
            service: "game.search.getTagGameList",
            data: getParams(),
            options: {
                transformResponse: GameService.format
            }
        };
        Loader.initPager(config, function(response) {
            Array.prototype.push.apply($scope.gameList, response.data.gameList);
        });
        function getParams() {
            var typeMap = {
                hot: {
                    field: "downloadWeek",
                    orderId: 0,
                    act: "pj_rqph"
                },
                "new": {
                    field: "uploadTime",
                    orderId: 4,
                    act: "pj_xysx"
                },
                rise: {
                    field: "downloadWeek",
                    orderId: 5,
                    act: "pj_sszk"
                }
            };
            var type = $routeParams.type || "hot";
            var typeObj = typeMap[type] || typeMap["hot"];
            $scope.specailInfoField = typeObj.field;
            $scope.statInfo = {
                a1: typeObj.act
            };
            return {
                kwdslist: "破解",
                issingle: 0,
                orderid: typeObj.orderId
            };
        }
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: $scope.statInfo.a1
            }, "game_detail");
        };
    } ]);
});