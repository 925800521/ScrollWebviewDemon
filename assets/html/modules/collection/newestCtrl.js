define(function(require, exports, module) {
    "use strict";
    var stat = require("commons/stat");
    var app = angular.module("ngmApp");
    app.controller("newestCtrl", [ "$scope", "$timeout", "NativeApp", "Loader", "$routeParams", "$rootScope", "GameService", function($scope, $timeout, NativeApp, Loader, $routeParams, $rootScope, GameService) {
        NativeApp.setNavTitle("新游推荐");
        $scope.groupGameList = [];
        $scope.specailInfoField = "";
        var groupGame = {};
        var isStartStat = false;
        var groupClassArray = [ "day-today", "day-yesterday", "day-other" ];
        var currentGroupName = "";
        Loader.initPager({
            callbackId: "gameList",
            service: "op.collection.newgame.list",
            data: {
                columnId: 2001582,
                extReview: 1
            },
            options: {
                transformResponse: GameService.format
            }
        }, function(response) {
            var games = response.data.gameList;
            var gameCount = games.length;
            for (var i = 0; i < gameCount; i++) {
                var game = games[i];
                if (currentGroupName != game.group.groupName) {
                    groupGame = {};
                    groupGame.gameList = (groupGame.gameList || []).concat(game);
                    groupGame.groupClass = groupClassArray[i < 2 ? i : 2];
                    groupGame.groupName = game.group.groupName;
                    groupGame.groupTotal = game.group.total;
                    if ("今天" == groupGame.groupName) groupGame.groupId = "ad_TodayNewGames";
                    $scope.groupGameList.push(groupGame);
                } else groupGame.gameList = (groupGame.gameList || []).concat(game);
                currentGroupName = game.group.groupName;
            }
            if (!isStartStat) {
                isStartStat = true;
                stat.startStat([ "ad_TodayNewGames" ], {
                    action: "ad_show",
                    a1: "xp_xysx"
                }, NativeApp, false);
            }
        }, {
            a1: "xp"
        });
        $scope.goGameDetail = function(gameInfo) {
            var params = {
                gameId: gameInfo.base.gameId,
                gameName: encodeURIComponent(gameInfo.base.gameName)
            };
            if (gameInfo.adm && gameInfo.adm.adpId && gameInfo.adm.admId) {
                angular.extend(params, {
                    a1: "xp_xysx",
                    ada1: "xp_xysx",
                    adpId: gameInfo.adm.adpId,
                    admId: gameInfo.adm.admId
                });
                NativeApp.addActionStat("ad_click", "xp_xysx", gameInfo.base.gameId, "", gameInfo.adm.adpId, gameInfo.adm.admId);
            }
            NativeApp.openWindow("/game/detail.html", params, "game_detail");
        };
        var isVisible = false;
        NativeApp.registerEvent(NativeApp.EVENT_WEBVIEW_VISIBLE_CHANGED);
        $rootScope.$on(NativeApp.EVENT_WEBVIEW_VISIBLE_CHANGED, function(event, json) {
            var currentVisible = json.visible || false;
            if (isVisible != currentVisible) {
                isVisible = currentVisible;
                if (isVisible) stat.startStat([ "ad_TodayNewGames" ], {
                    action: "ad_show",
                    a1: "xp_xysx"
                }, NativeApp, true);
            }
        });
    } ]);
});