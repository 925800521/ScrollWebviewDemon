define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("searchCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", "GameService", "Utils", function($scope, NativeApp, Loader, $routeParams, GameService, Utils) {
        var keyword = decodeURIComponent($routeParams.keyword || "");
        var pkgName = $routeParams.pkgName;
        var searchText, service, params;
        if (pkgName) {
            service = "game.search.listByPkgName";
            params = {
                pkgName: pkgName
            };
            searchText = pkgName;
            NativeApp.setNavTitle("搜索结果");
        } else {
            service = "game.search.searchGame";
            params = {
                kwds: keyword
            };
            searchText = keyword;
            NativeApp.setNavTitle("搜索:" + keyword);
        }
        $scope.statInfo = {
            a1: "ss_yjg",
            a3: searchText
        };
        $scope.specailInfoField = "downloadMonth";
        $scope.resultType = "search";
        $scope.gameList = [];
        $scope.adList = [];
        var config = {
            callbackId: "gameList",
            service: service,
            data: params,
            options: {
                transformResponse: GameService.format,
                pager: true
            }
        };
        var alreadyStat = false;
        Loader.init({
            configList: config,
            onData: function(response) {
                Array.prototype.push.apply($scope.gameList, response.data.gameList);
                if ($scope.gameList.length > 0 && !alreadyStat) {
                    NativeApp.addActionStat("btn_search", "ss_yjg", searchText);
                    alreadyStat = true;
                }
            },
            onRegionChange: function(newRegion) {
                if (!newRegion && 0 == $scope.gameList.length) {
                    NativeApp.addActionStat("btn_search", "ss_wjg", searchText);
                    $scope.resultType = "empty";
                    Loader.request({
                        callbackId: "adList",
                        service: "op.ad.getAdPositionList",
                        data: {
                            adposid: 242
                        },
                        page: {
                            size: 20
                        }
                    }).then(function(response) {
                        angular.forEach(response.data.adList.list, function(item) {
                            var m = item.alink && item.alink.match(/gid=(\d+)/);
                            if (m) item.gameId = m[1];
                        });
                        $scope.adList = Utils.group(response.data.adList.list, 3);
                    });
                }
            },
            statInfo: {
                a1: "ss"
            }
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.addActionStat("btn_searchclick", "ss_yjg", searchText);
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: "ss_yjg",
                a3: searchText
            }, "game_detail");
        };
        $scope.goRecommendedGameDetail = function(gameId) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameId,
                a1: "ss_wjg",
                a3: searchText
            }, "game_detail");
        };
    } ]);
});