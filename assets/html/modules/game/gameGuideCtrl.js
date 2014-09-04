define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("gameGuideCtrl", [ "$scope", "$rootScope", "$location", "$routeParams", "$sce", "NativeApp", "Loader", "Utils", function($scope, $rootScope, $location, $routeParams, $sce, NativeApp, Loader, Utils) {
        $scope.isEmpty = false;
        $scope.isSearchEmpty = false;
        $rootScope.bgColor = "#FFF";
        var screenHeight = NativeApp.getEnv("webview_dimension_height");
        $scope.imageMarginHeight = screenHeight > 0 ? (screenHeight - 400) / 2 : 100;
        var gameId = $routeParams.gameId;
        var config = {
            guideCategoryList: {
                service: "article.news.getCategoryList",
                data: {
                    gameId: gameId,
                    type: 1
                }
            }
        };
        Loader.initOnce(config, function(response) {
            console.log(response);
            var data = response.data;
            if (data && data.guideCategoryList && angular.isArray(data.guideCategoryList.list) && data.guideCategoryList.list.length > 0) $scope.guideCategoryList = data.guideCategoryList.list; else $scope.isEmpty = true;
        });
        $scope.search = function(guideInput) {
            if (guideInput) {
                console.log(guideInput);
                var searchConfig = [ {
                    searchResult: {
                        service: "article.news.search",
                        data: {
                            gameId: gameId,
                            keyword: guideInput,
                            type: 1
                        },
                        page: {
                            size: 50
                        }
                    }
                } ];
                Loader.clean();
                Loader.init({
                    configList: searchConfig,
                    onData: function(response) {
                        console.log(">>>response:" + JSON.stringify(response));
                        var data = response.data;
                        if (data && data.searchResult && angular.isArray(data.searchResult.list) && data.searchResult.list.length > 0) {
                            var searchResult = data.searchResult.list;
                            angular.forEach(searchResult, function(item, key) {
                                if (item.title) item.title = $sce.trustAsHtml(item.title.replace(guideInput, '<span class="em">' + guideInput + "</span>"));
                                if (item.summary) item.summary = $sce.trustAsHtml(item.summary.replace(guideInput, '<span class="em">' + guideInput + "</span>"));
                            });
                            $scope.searchResult = searchResult;
                            NativeApp.addActionStat("btn_searchtip", guideInput, gameId, 1);
                        } else {
                            $scope.searchResult = [];
                            $scope.isSearchEmpty = true;
                            NativeApp.addActionStat("btn_searchtip", guideInput, gameId, 0);
                        }
                    }
                });
                NativeApp.addRegionStat("gamezone", 1, "gg_sgl", gameId);
            }
        };
        $scope.close = function() {
            $scope.isSearchEmpty = false;
            $scope.searchResult = void 0;
        };
        $scope.goArticleList = function(category, $index) {
            NativeApp.addRegionStat("gamezone", $index + 1, "gg", gameId);
            NativeApp.openWindow("/article/listType.html", {
                gameId: gameId,
                categoryId: category.cateId,
                cateName: encodeURIComponent(category.cateName),
                page: "gameGuide"
            }, "common");
        };
        $scope.goArticleDetail = function(item) {
            NativeApp.openWindow("/article/detail.html", {
                id: item.id,
                gameId: item.gameId,
                type: "guide",
                a1: ""
            }, "game_article");
        };
        NativeApp.setWebViewState("loaded");
    } ]);
});