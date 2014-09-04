define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("categoryDetailCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "GameService", function($scope, NativeApp, Loader, $routeParams, GameService) {
        var vm = $scope;
        var data = {};
        vm.statInfo = {};
        vm.gameList = [];
        NativeApp.setNavTitle($routeParams.title || "分类详情");
        initQueryData();
        Loader.initPager({
            callbackId: "gameList",
            service: "game.category.getGameInfo",
            data: data,
            options: {
                transformResponse: GameService.format
            }
        }, function(response) {
            Array.prototype.push.apply(vm.gameList, response.data.gameList);
        });
        function initQueryData() {
            var act = $routeParams.act || "";
            var catePos = $routeParams.id;
            var type = $routeParams.type || "hot";
            var cateType = $routeParams.cateType;
            var tabParamsMap = {
                hot: {
                    orderId: 0,
                    field: "downloadWeek",
                    a1: "fl_" + act + "_rqph"
                },
                "new": {
                    orderId: 4,
                    field: "uploadTime",
                    a1: "fl_" + act + "_xysx"
                },
                rise: {
                    orderId: 5,
                    field: "downloadWeek",
                    a1: "fl_" + act + "_sszk"
                }
            };
            var tabParams = tabParamsMap[type] || tabParamsMap["hot"];
            vm.specailInfoField = tabParams.field;
            switch (cateType) {
              case "1":
                vm.statInfo = {
                    a1: tabParams.a1
                };
                data.isNetGame = 0;
                break;

              case "2":
                vm.statInfo = {
                    a1: "xyfl_" + act
                };
                data.isNetGame = 0;
                break;

              case "3":
                vm.statInfo = {
                    a1: "wyfl_" + act
                };
                data.isNetGame = 1;
                break;

              case "4":
                vm.statInfo = {
                    a1: "wytc_" + act
                };
                data.isNetGame = 0;
                break;

              default:
                vm.statInfo = {
                    a1: ""
                };
                data.isNetGame = 0;
            }
            var params = tabParamsMap[type] || tabParamsMap["hot"];
            data.orderid = params.orderId;
            data.type = cateType;
            data.catepos = catePos;
        }
        vm.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                gameName: encodeURIComponent(gameInfo.base.gameName),
                a1: vm.statInfo.a1
            }, "game_detail");
        };
    } ]);
});