define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("articleListCtrl", [ "$scope", "$rootScope", "$location", "$routeParams", "$sce", "NativeApp", "Loader", "GameService", function($scope, $rootScope, $location, $routeParams, $sce, NativeApp, Loader, GameService) {
        $scope.followClass = "btns";
        $rootScope.bgColor = "#FFF";
        $scope.articleList = [];
        var gameId = $routeParams.gameId;
        var type = $routeParams.type || "news";
        var action = $routeParams.action;
        var a1 = $routeParams.a1;
        var a2 = $routeParams.a2 || gameId;
        var a3 = $routeParams.a3 || "";
        var ada1 = $routeParams.ada1;
        var adpId = $routeParams.adpId;
        var admId = $routeParams.admId;
        var opt = $routeParams.opt;
        var ucid = $routeParams.ucid;
        var nickName = $routeParams.nickName;
        var typeArray = {
            guide: {
                id: 1,
                name: "攻略"
            },
            news: {
                id: 2,
                name: "新闻"
            },
            activity: {
                id: 3,
                name: "活动"
            },
            evaluate: {
                id: 4,
                name: "评测"
            },
            reference: {
                id: 5,
                name: "指引"
            }
        };
        var currentType = typeArray[type] || typeArray["news"];
        NativeApp.setNavTitle(currentType.name + "大全");
        NativeApp.addActionStat(action, a1, a2, a3);
        if (isNaN(gameId)) {
            NativeApp.setWebViewState("error");
            return;
        }
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
            articleList: {
                callbackId: "articleList",
                service: "article.basic.list",
                data: {
                    gameId: gameId,
                    fid: currentType.id
                },
                page: {
                    size: 10
                },
                options: {
                    pager: true
                }
            }
        };
        Loader.init({
            configList: config,
            onInit: onInit,
            onData: onPage
        });
        function onInit(response) {
            if (response.data.gameInfo) {
                $scope.gameInfo = response.data.gameInfo;
                var statInfo = [ {
                    a1: "zxlb",
                    a2: gameId,
                    a3: a3
                } ];
                if (ada1 && adpId && admId) statInfo.push({
                    a1: ada1,
                    a2: gameId,
                    a3: "",
                    ad_position: adpId,
                    ad: admId
                });
                NativeApp.setPackageInfo($scope.gameInfo, statInfo);
                if (!$scope.gameInfo.base.isSimple) if ("follow" == opt) NativeApp.autoFollowApp($scope.gameInfo, {
                    opt: opt,
                    ucid: ucid,
                    nickName: nickName
                }, {
                    action: "btn_bookonlinegame",
                    a1: "ymlq",
                    a2: $scope.gameInfo.base.gameId
                });
                NativeApp.setShareInfo({
                    title: "[" + $scope.gameInfo.base.gameName + "]最新资讯大全",
                    content: "我在九游发现[" + $scope.gameInfo.base.gameName + "]的最新资讯，快来拜读一下！",
                    shareUrl: "http://a.9game.cn/" + $scope.gameInfo.base.gameId + "/news-9-1/",
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
            if (response.data.articleList) Array.prototype.push.apply($scope.articleList, response.data.articleList.list);
        }
        $scope.goArticleDetail = function(article) {
            NativeApp.openWindow("/article/detail.html", {
                id: article.id,
                gameId: gameId,
                type: type,
                a1: "zxlb"
            }, "game_article");
        };
    } ]);
});