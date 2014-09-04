define(function(require, exports, module) {
    "use strict";
    require("../shared/giftList");
    var app = angular.module("ngmApp");
    app.page = "game.gift.list";
    app.controller("gameGiftCtrl", [ "$scope", "$rootScope", "$location", "$routeParams", "NativeApp", "Loader", "GameService", "Utils", function($scope, $rootScope, $location, $routeParams, NativeApp, Loader, GameService, Utils) {
        $scope.isEmpty = false;
        $rootScope.bgColor = "#FFF";
        var screenHeight = NativeApp.getEnv("webview_dimension_height");
        $scope.imageMarginHeight = screenHeight > 0 ? (screenHeight - 400) / 2 : 100;
        var gameId = $routeParams.gameId;
        var config = {
            gameInfo: {
                service: "game.basic.data.getDetail",
                data: {
                    gameId: gameId
                },
                options: {
                    single: true,
                    required: true,
                    transformResponse: GameService.format
                }
            },
            giftList: {
                service: "op.ka.basic.listByGid",
                data: {
                    gameId: gameId,
                    type: 1
                },
                options: {
                    pager: true,
                    cache: false
                }
            }
        };
        Loader.init({
            configList: config,
            onInit: onInit,
            onData: onPage
        });
        function onInit(response) {
            if (response.data.gameInfo) $scope.gameInfo = response.data.gameInfo;
        }
        function onPage(response) {
            console.log(response);
            if (response.data && response.data.giftList && response.data.giftList.list) $scope.giftList = ($scope.giftList || []).concat(response.data.giftList.list);
            if (!($scope.giftList && $scope.giftList.length > 0)) $scope.isEmpty = true;
        }
    } ]);
});