define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("expectListCtrl", [ "$scope", "$rootScope", "$routeParams", "NativeApp", "Loader", "GameService", function($scope, $rootScope, $routeParams, NativeApp, Loader, GameService) {
        $scope.gameList = [];
        NativeApp.setNavTitle("新游期待榜");
        Loader.initPager({
            callbackId: "gameList",
            service: "op.ad.adm.getGameList",
            data: {
                type: $routeParams.type,
                hasAdm: true
            },
            options: {
                pager: true,
                transformResponse: GameService.format
            }
        }, function(response) {
            Array.prototype.push.apply($scope.gameList, setGameFollowStatus(response.data.gameList.list));
        });
        $scope.toggleFollowState = function($event, gameInfo) {
            $event.stopPropagation();
            if (!gameInfo.isFollowed && !gameInfo.base.isSimple) NativeApp.followApp(gameInfo, {
                action: "btn_bookonlinegame",
                a1: "xyqdb",
                a2: gameInfo.base.gameId
            });
        };
        function setGameFollowStatus(gameList) {
            angular.forEach(gameList, function(value, key) {
                value.isFollowed = NativeApp.isFollowApp(value);
            });
            return gameList;
        }
        NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
        $rootScope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
            $scope.safeApply(function() {
                angular.forEach($scope.gameList, function(value, key) {
                    var matchData = GameService.findSameGameInfo(json, value);
                    if (matchData) value.isFollowed = !!matchData.isFollow;
                });
            });
        });
        $scope.goGameDetail = function(gameInfo, stat) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                gameName: encodeURIComponent(gameInfo.base.gameName),
                a1: stat.a1
            }, "game_detail");
        };
    } ]);
});