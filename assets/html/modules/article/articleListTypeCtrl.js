define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("articleListTypeCtrl", [ "$scope", "$rootScope", "$location", "$routeParams", "$sce", "NativeApp", "Loader", "GameService", function($scope, $rootScope, $location, $routeParams, $sce, NativeApp, Loader, GameService) {
        $scope.isEmpty = false;
        $rootScope.bgColor = "#FFF";
        var gameId = $routeParams.gameId;
        var page = $routeParams.page;
        var isGuide = "gameGuide" == page;
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
            }
        };
        if (isGuide) {
            config.articleList = {
                service: "article.news.getListByCateId",
                data: {
                    gameId: gameId,
                    categoryId: $routeParams.categoryId
                },
                options: {
                    pager: true
                }
            };
            NativeApp.setNavTitle(decodeURIComponent($routeParams.cateName));
        } else {
            var mapping = {
                news: 1,
                activity: 3,
                broke: 9
            };
            var type = mapping[page] || 1;
            config.articleList = {
                service: "article.basic.list",
                data: {
                    gameId: gameId,
                    fid: type
                },
                page: {
                    size: 10
                },
                options: {
                    pager: true
                }
            };
        }
        console.log(config);
        Loader.init({
            configList: config,
            onInit: onInit,
            onData: onPage
        });
        function onInit(response) {
            if (response.data.gameInfo) {
                $scope.gameInfo = response.data.gameInfo;
                var title = "[" + $scope.gameInfo.base.gameName + "]最新资讯大全";
                var content = "我在九游发现[" + $scope.gameInfo.base.gameName + "]的最新资讯，快来拜读一下！";
                var shareUrl = "http://a.9game.cn/" + gameId + "/news-9-1/";
                if (isGuide) {
                    title = "[" + $scope.gameInfo.base.gameName + "]最强攻略大全";
                    content = "我在九游发现[" + $scope.gameInfo.base.gameName + "]超赞攻略，赶紧来恶补一下！";
                    shareUrl = "http://a.9game.cn/" + gameId + "/gonglue-0-1/";
                }
                NativeApp.setShareInfo({
                    title: title,
                    content: content,
                    shareUrl: shareUrl,
                    imgUrl: $scope.gameInfo.base.gameIcon,
                    iconUrl: $scope.gameInfo.base.gameIcon,
                    adWord: "手机游戏尽在九游",
                    adUrl: "http://app.9game.cn/?ch=KD_3",
                    platform: ""
                }, {
                    action: "btn_share",
                    a1: "zxlb_all",
                    a2: gameId
                });
            }
        }
        function onPage(response) {
            if (response.data && response.data.articleList && response.data.articleList.list) $scope.articleList = ($scope.articleList || []).concat(response.data.articleList.list);
            if (!($scope.articleList && $scope.articleList.length > 0)) $scope.isEmpty = true;
        }
        $scope.goArticleDetail = function(item) {
            NativeApp.openWindow("/article/detail.html", {
                id: item.id,
                gameId: item.gameId || gameId,
                type: "guide",
                a1: ""
            }, "game_article");
        };
    } ]);
});