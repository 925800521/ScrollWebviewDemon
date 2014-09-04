define(function(require, exports, module) {
    "use strict";
    console.log(">>>>>>>>>>>>>1");
    var app = angular.module("ngmApp");
    app.controller("loaderTestCtrl", [ "$scope", "$filter", "NativeApp", "GameService", "Protocol", "Loader", "$rootScope", "Pager", "PagerLoader", function($scope, $filter, NativeApp, GameService, Protocol, Loader, $rootScope, Pager, PagerLoader) {
        NativeApp.setWebViewState("loaded");
        var gameId = "34950";
        var initConfig = {
            gameInfo: {
                service: "1",
                data: {
                    gid: gameId
                },
                options: {
                    require: true,
                    single: true
                }
            },
            rankGameInfo: {
                callbackId: "rankGameInfo",
                service: "game.rank.list",
                page: {
                    page: 1,
                    size: 2
                },
                options: {
                    autoLoad: true,
                    transformResponse: transformResponse
                }
            }
        };
        var pagerConfig = [ {
            callbackId: "gameList1",
            service: "104",
            data: {
                kwds: "小鸟"
            },
            page: {
                page: 32,
                size: 3
            },
            options: {
                autoLoad: true,
                delay: 3e3,
                preload: false,
                maxCount: 4,
                transformResponse: transformResponse
            }
        }, {
            callbackId: "rankList",
            service: "game.rank.list",
            page: {
                page: 1,
                size: 2
            },
            options: {
                delay: 1e3,
                autoLoad: true,
                transformResponse: transformResponse
            }
        } ];
        Loader.init({
            initConfig: initConfig,
            pagerConfig: pagerConfig,
            options: {},
            onInit: onInit,
            onPage: onPage
        });
        function transformResponse(data) {
            return GameService.format(data.list || data);
        }
        function onInit(response) {
            $scope.initData = {
                gameInfo: response.data.gameInfo.game.name,
                rankGameInfo: response.data.rankGameInfo.length
            };
            $scope.gameInfo = GameService.format(response.data.gameInfo);
        }
        $scope.gameList = [];
        function onPage(response, pager) {
            $scope.gameList = $scope.gameList.concat(response.data);
        }
        $rootScope.loadPage = function() {
            PagerLoader.reload();
        };
        $scope.triggerEvent = function() {
            JSBridge.onEvent("page_scroll_bottom");
        };
    } ]);
});