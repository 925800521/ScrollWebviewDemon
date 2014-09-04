define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("netgameEventCtrl", [ "$scope", "$rootScope", "$location", "NativeApp", "Loader", "$routeParams", "GameService", function($scope, $rootScope, $location, NativeApp, Loader, $routeParams, GameService) {
        NativeApp.setNavTitle("开服开测");
        var eventType = $routeParams.type || 0;
        if (1 == eventType) $scope.statInfo = {
            a1: "kfkc_kf"
        }; else if (0 == eventType) $scope.statInfo = {
            a1: "kfkc_kc"
        };
        $scope.tipName = 0 == eventType ? "开测" : "开服";
        var viewGroupNames = [ "今天", "明天", "未来3天", "昨天", "历史" ];
        var viewGroupColors = [ "day-today", "day-yesterday", "day-other", "day-past", "day-past" ];
        $scope.groupGameList = [];
        var loadedCount = 0;
        var currentGroup = initNewGroup();
        Loader.init({
            configList: getConfigList(),
            onData: function(response) {
                Array.prototype.push.apply(currentGroup.gameList, response.data.gameList);
                loadedCount += response.data.gameList.length;
            },
            onRegionChange: function(newRegion) {
                if (newRegion) currentGroup = initNewGroup(); else if (0 == loadedCount) $scope.tipName = 0 == eventType ? "开测" : "开服";
            }
        });
        function initNewGroup() {
            var group = {
                gameList: [],
                groupName: viewGroupNames.shift(),
                groupClass: viewGroupColors.shift()
            };
            $scope.groupGameList.push(group);
            return group;
        }
        function getConfigList() {
            var moduleParams = [ {
                type: eventType,
                startDay: 0,
                period: 1
            }, {
                type: eventType,
                startDay: 1,
                period: 1
            }, {
                type: eventType,
                startDay: 2,
                period: 3
            }, {
                type: eventType,
                startDay: -1,
                period: 1
            }, {
                type: eventType,
                startDay: -99999,
                period: 99998
            } ];
            var list = [];
            for (var i = 0, len = moduleParams.length; i < len; i++) list.push({
                callbackId: "gameList",
                service: "game.event.listByType",
                data: moduleParams[i],
                options: {
                    pager: true,
                    transformResponse: GameService.format
                }
            });
            return list;
        }
        $scope.goGameDetail = function(gameId) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameId,
                a1: $scope.statInfo.a1
            }, "game_detail");
        };
    } ]);
});