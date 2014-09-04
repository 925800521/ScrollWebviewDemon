define(function(require, exports, module) {
    "use strict";
    require("commons/autocomplete");
    require("../shared/giftList");
    var app = angular.module("ngmApp");
    app.page = "gift.search";
    app.controller("giftSearchCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "$sce", "$rootScope", function($scope, NativeApp, Loader, $routeParams, $sce, $rootScope) {
        var keyword = decodeURIComponent($routeParams.keyword || "");
        var screenHeight = NativeApp.getEnv("webview_dimension_height");
        $rootScope.bgColor = "#FFF";
        $scope.keyword = keyword;
        $scope.noPic = true;
        $scope.page = 1;
        $scope.imageMarginHeight = screenHeight && screenHeight - 260 > 0 ? (screenHeight - 260) / 2 : 60;
        function getConfig(keyword) {
            return {
                searchGameList: {
                    service: "op.ka.gift.searchGame",
                    data: {
                        keyword: keyword,
                        giftCount: 0
                    },
                    page: {
                        page: 1,
                        size: 18
                    },
                    options: {
                        cache: 0
                    }
                },
                searchGiftList: {
                    service: "op.ka.gift.search",
                    data: {
                        keyword: keyword,
                        detailNeed: 1
                    },
                    page: {
                        page: 1,
                        size: 10
                    },
                    options: {
                        cache: 0,
                        pager: true
                    }
                }
            };
        }
        function search(keyword) {
            $scope.empty = false;
            $scope.gameList = [];
            $scope.giftList = [];
            Loader.clean();
            Loader.init({
                configList: getConfig(keyword),
                onData: function(response) {
                    var data = response.data.searchGameList;
                    if (data && data.list) {
                        var games = data.list;
                        var len = games.length;
                        if (len % 3 > 0 && len > 3) games = games.splice(0, len - len % 3);
                        $scope.gameList = games;
                    }
                    var giftList = response.data.searchGiftList;
                    if (giftList) $scope.giftList = $scope.giftList.concat(giftList.giftDetails || []);
                    if (0 == $scope.gameList.length && 0 == $scope.giftList.length) {
                        $scope.empty = true;
                        $scope.tipMessage = '没有找到与"' + $scope.keyword + '"相关的礼包信息';
                    }
                }
            });
            NativeApp.setNavTitle("搜索:" + $scope.keyword);
        }
        $scope.toList = function(item) {
            NativeApp.openWindow("/gift/list.html", {
                a1: "lbfhss",
                gameId: item.game.id,
                gameName: item.game.name
            }, "game_article");
        };
        $scope.search = function(keyword) {
            if (keyword) {
                $scope.page = 1;
                $scope.keyword = keyword;
                $scope.giftList = [];
                $scope.gameList = [];
                $scope.Empty = false;
                search(keyword);
                NativeApp.addActionStat("btn_searchforgift", "lbfh", $scope.keyword);
            }
        };
        $scope.search($scope.keyword);
    } ]);
});