define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("freeUnicomCtrl", [ "NativeApp", "Loader", "$scope", "$routeParams", "GameService", function(NativeApp, Loader, $scope, $routeParams, GameService) {
        $scope.specailInfoField = "instruction";
        $scope.gameList = [];
        $scope.fileSize = 0;
        $scope.$root.bgColor = "#EC685F";
        $scope.statInfo = {
            a1: "qgltmllzq_all_sy"
        };
        var flagText = {
            "2": "联通"
        }[$routeParams.flag] || "";
        NativeApp.setNavTitle(flagText + "免流量专区");
        var config = {
            gameList: {
                callbackId: "gameList",
                service: "op.activity.special.getFreeFlowGameList",
                data: {
                    freeFlowFlag: $routeParams.flag,
                    needInstruction: 1
                },
                options: {
                    pager: true,
                    transformResponse: GameService.format
                }
            }
        };
        Loader.init({
            configList: config,
            onData: onData,
            statInfo: $scope.statInfo
        });
        function onData(response) {
            $scope.gameList = ($scope.gameList || []).concat(response.data.gameList || []);
        }
        $scope.countDownLoad = function(gameInfo, gameState) {
            var network = NativeApp.getEnv("network");
            if (0 == gameState.state && "unavailable" != network && "" != network) {
                $scope.fileSize += gameInfo.base.fileSize;
                NativeApp.setCache("UCGC.events.freeUnicom.totalFileSize", $scope.fileSize, 1e3 * 60 * 60 * 24 * 365);
            }
        };
        $scope.fileSize = parseInt(NativeApp.getCache("UCGC.events.freeUnicom.totalFileSize") || 0);
        $scope.share = function() {
            var shareText = "[九游]全国联通福利包，免流量下游戏，不花钱，九游给你“埋单”啦，http://a.9game.cn/hezuo/unicom/";
            NativeApp.share(shareText, $scope.statInfo);
        };
        $scope.goGameDetail = function(gameInfo) {};
    } ]);
});