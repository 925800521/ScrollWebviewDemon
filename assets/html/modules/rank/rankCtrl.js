define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("rankCtrl", [ "$scope", "$rootScope", "NativeApp", "Loader", "GameService", "$routeParams", function($scope, $rootScope, NativeApp, Loader, GameService, $routeParams) {
        var cateTag = $routeParams.cateTag;
        var rankTag = $routeParams.rankTag;
        $scope.vm = {};
        $scope.isEmpty = false;
        $rootScope.bgColor = "#FFF";
        if ($routeParams.a1) NativeApp.addActionStat("tab_categorylist", $routeParams.a1, $routeParams.a2, $routeParams.a3);
        angular.element(document.body).addClass("pixdouble");
        var config = {
            rankList: {
                service: "game.categoryRank.getTagList",
                page: {
                    size: 100
                }
            },
            categoryList: {
                service: "game.category.getInfo",
                data: {
                    hasExcellent: 1,
                    type: 5
                },
                page: {
                    size: 100
                }
            },
            gameList: {
                service: "game.categoryRank.getGameList",
                data: {
                    cateTag: cateTag,
                    rankTag: rankTag
                },
                options: {
                    pager: true,
                    transformResponse: GameService.format
                }
            }
        };
        Loader.init({
            configList: config,
            onInit: onInit,
            onData: onData,
            onRegionChange: onRegionChange,
            statInfo: {
                a1: "flbd"
            }
        });
        function onInit(response) {
            if (response.data.rankList) {
                var isFoundRankTag = false;
                if (rankTag) angular.forEach(response.data.rankList.list, function(item) {
                    if (item.tag && item.tag == rankTag) isFoundRankTag = true;
                });
                if (!isFoundRankTag) rankTag = response.data.rankList.list[0].tag;
            }
            $scope.specailInfoField = rankTag;
            if (response.data.categoryList) {
                response.data.categoryList.list.unshift({
                    name: "全部",
                    mark: "qb"
                });
                var isFoundCateTag = false;
                if (cateTag) angular.forEach(response.data.categoryList.list, function(item) {
                    if (item.mark && item.mark == cateTag) isFoundCateTag = true;
                });
                if (!isFoundCateTag) cateTag = response.data.categoryList.list[0].mark;
            }
            $scope.statInfo = {
                a1: "flbd_" + cateTag + "_" + rankTag
            };
        }
        function onData(response) {
            if (response.data && angular.isArray(response.data.gameList)) $scope.gameList = ($scope.gameList || []).concat(response.data.gameList);
            if (!$scope.gameList || 0 == $scope.gameList.length) $scope.isEmpty = true; else $scope.isEmpty = false;
        }
        function onRegionChange(newRegion) {
            if (!newRegion) if (!$scope.gameList || 0 == $scope.gameList.length) {
                $scope.isEmpty = true;
                NativeApp.addActionStat("categorylistnotfound", cateTag + "_" + rankTag);
                NativeApp.setLoadMoreState(null);
            } else if ($scope.gameList.length < 10) {
                $scope.isEmpty = false;
                NativeApp.setLoadMoreState("end");
            }
        }
        $scope.goGameDetail = function(gameInfo, index) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: "flbd_" + cateTag + "_" + rankTag
            }, "game_detail");
        };
        $scope.toggleTouchStyle = function(item, index) {
            $scope.vm.currentIndex = index;
        };
    } ]);
});