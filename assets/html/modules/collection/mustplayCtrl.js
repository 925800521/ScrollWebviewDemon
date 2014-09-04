define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    var stat = require("commons/stat");
    app.controller("mustplayCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "GameService", function($scope, NativeApp, Loader, $routeParams, GameService) {
        NativeApp.setNavTitle("必玩游戏");
        var groupGame, currentGroupName;
        $scope.groupGameList = [];
        Loader.initPager({
            callbackId: "gameList",
            service: "op.collection.column.listByFree",
            data: {
                freeId: 892
            },
            page: {
                size: 15
            },
            options: {
                transformResponse: GameService.format
            }
        }, function(response) {
            console.log(response);
            var games = response.data.gameList;
            for (var i = 0, len = games.length; i < len; i++) {
                var game = games[i];
                if (currentGroupName != game.base.groupName) {
                    groupGame = {};
                    groupGame.groupName = game.base.groupName;
                    currentGroupName = game.base.groupName;
                    $scope.groupGameList = ($scope.groupGameList || []).concat(groupGame);
                }
                groupGame.gameList = (groupGame.gameList || []).concat(game);
            }
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: "bw_" + gameInfo.base.groupFlag
            }, "game_detail");
        };
    } ]);
});