define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("dataLoaderTestCtrl", [ "$scope", "$filter", "NativeApp", "GameService", "Protocol", "Loader", "$rootScope", function($scope, $filter, NativeApp, GameService, Protocol, Loader, $rootScope) {
        var gameId = "34950";
        var singleConfig = {
            service: "game.rank.list",
            page: {
                page: 10,
                size: 5,
                maxCount: 6
            },
            options: {
                require: true,
                pager: true,
                transformResponse: GameService.format
            }
        };
        var combineConfig2 = {
            gameInfo: {
                service: "game.basic.data.getDetail",
                data: {
                    gameId: gameId
                },
                options: {
                    single: true,
                    require: true,
                    transformResponse: GameService.format
                }
            },
            rankList: {
                service: "game.rank.list",
                page: {
                    page: 20,
                    size: 5,
                    maxCount: 13
                },
                options: {
                    require: true,
                    pager: true,
                    transformResponse: GameService.format
                }
            }
        };
        var combineConfig = {
            gameInfo: {
                service: "game.basic.data.getDetail",
                data: {
                    gameId: gameId
                },
                options: {
                    single: true,
                    require: true,
                    transformResponse: GameService.format
                }
            },
            rankList: {
                service: "game.rank.list",
                page: {
                    size: 5,
                    maxCount: 13
                },
                options: {
                    require: true,
                    pager: true,
                    transformResponse: GameService.format
                }
            }
        };
        Loader.init([ combineConfig, singleConfig, combineConfig2 ], onInit, onRegion);
        function onInit(response) {
            console.log("onInit", response);
            $scope.initData = {
                gameInfo: response.data.gameInfo.base.gameName,
                rankList: response.data.rankList.length
            };
            $scope.gameInfo = response.data.gameInfo;
        }
        $scope.gameList = [];
        function onRegion(response, pagerResponse, region) {
            console.log("onRegion", response, pagerResponse, region.pager);
            Array.prototype.push.apply($scope.gameList, pagerResponse.data);
        }
        $rootScope.loadPage = function() {
            PagerLoader.reload();
        };
        $scope.triggerEvent = function() {
            DataLoader.loadData();
        };
    } ]);
});