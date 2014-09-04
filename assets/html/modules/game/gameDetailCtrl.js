define(function(require, exports, module) {
    "use strict";
    require("commons/iscroll");
    require("commons/ngmScroller");
    require("commons/ngmMarquee");
    require("commons/ngmTouch");
    require("../shared/giftList");
    var app = angular.module("ngmApp");
    app.page = "game.detail";
    app.controller("gameDetailCtrl", [ "$scope", "$location", "$routeParams", "$sce", "$timeout", "NativeApp", "Loader", "GameService", "Utils", function($scope, $location, $routeParams, $sce, $timeout, NativeApp, Loader, GameService, Utils) {
        $scope.$root.bgColor = "#FFF";
        var gameId = $routeParams.gameId || $routeParams.gid || $routeParams.id;
        var action = $routeParams.action || "detail_game";
        var a1 = $routeParams.a1;
        var a2 = $routeParams.a2 || gameId;
        var a3 = $routeParams.a3 || "";
        var ada1 = $routeParams.ada1;
        var adpId = $routeParams.adpId;
        var admId = $routeParams.admId;
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
                    require: true,
                    transformResponse: GameService.format
                }
            },
            serverTime: {
                service: "client.basic.getServerInfo"
            },
            oldEventList: {
                service: "game.event.getListByGameId",
                data: {
                    gameId: gameId,
                    type: 1
                }
            },
            eventList: {
                service: "game.event.getListByGameId",
                data: {
                    gameId: gameId,
                    type: 2
                }
            },
            guideList: {
                service: "article.basic.list",
                data: {
                    gameId: gameId,
                    fid: 1
                },
                page: {
                    size: 2
                }
            },
            guideCategoryList: {
                service: "article.news.getCategoryList",
                data: {
                    gameId: gameId,
                    type: 1
                }
            },
            articleList: {
                service: "article.basic.getMixList",
                data: {
                    gameId: gameId,
                    type: 1
                },
                page: {
                    size: 4
                }
            },
            referenceList: {
                service: "article.basic.list",
                data: {
                    gameId: gameId,
                    fid: 5
                }
            },
            forumList: {
                service: "article.basic.forum.getTopicsByGameId",
                data: {
                    gameId: gameId
                },
                page: {
                    size: 4
                }
            },
            boardList: {
                service: "article.basic.board.getNoticesByGameId",
                data: {
                    gameId: gameId,
                    acount: 2,
                    fcount: 0
                },
                page: {
                    size: 2
                }
            },
            giftList: NativeApp.getEnv("imei") && {
                service: "op.ka.basic.listByGid",
                data: {
                    gameId: gameId,
                    categoryId: 0,
                    type: 1
                },
                page: {
                    size: 2
                }
            },
            imageList: !parseInt(NativeApp.getConfig("image_disabled")) && {
                service: "game.image.getGameImgList",
                data: {
                    gameId: gameId
                },
                page: {
                    size: 6
                }
            }
        };
        Loader.initOnce(config, function(response) {
            var data = response.data;
            console.log(data);
            if (data && data.gameInfo) {
                var gameInfo = data.gameInfo;
                $scope.gameInfo = gameInfo;
                $scope.boardList = data.boardList && data.boardList.list;
                initEventList(data);
                $scope.giftList = data.giftList && data.giftList.list;
                var articleList = data.articleList && data.articleList.list;
                if (articleList) {
                    $scope.topNews = articleList.shift();
                    $scope.articleList = articleList;
                }
                $scope.guideList = data.guideList && data.guideList.list;
                $scope.guideCategoryList = data.guideCategoryList && data.guideCategoryList.list;
                $scope.referenceList = data.referenceList && data.referenceList.list;
                $scope.forumList = data.forumList && data.forumList.list;
                initImageList(data.imageList && data.imageList.list);
                initRegion(gameInfo);
                cacheNetGame();
            }
        }, {
            a1: "xqy"
        });
        function initRegion(gameInfo) {
            if (!gameInfo.base.isSimple) NativeApp.getPackageState(gameInfo, function(json) {
                var state = String(json.state);
                var isInstall = "300" == state || "301" == state || "302" == state;
                $scope.isExpandSnapShot = 1 == gameInfo.status.stage || !isInstall;
                $scope.isShowGuide = !$scope.isExpandSnapShot;
                $scope.isShowForum = 1 == gameInfo.status.stage && !isInstall || 3 == gameInfo.status.stage && isInstall;
                console.debug("$scope.isExpandSnapShot: %s, isShowGuide: %s,  isShowForum: %s.", $scope.isExpandSnapShot, $scope.isShowGuide, $scope.isShowForum);
            }); else {
                $scope.isExpandSnapShot = true;
                $scope.isShowGuide = false;
                $scope.isShowForum = false;
            }
            if ($scope.gameInfo.detail.description.length <= 200) $scope.descriptionClass = "auto"; else $scope.showMoreDescription = function() {
                $scope.descriptionClass = "auto";
                NativeApp.addRegionStat("gamezone", 3, "xq_yxjt", gameId);
            };
            if ($scope.gameInfo.detail.versionUpdateDesc.length <= 200) $scope.mustReadClass = "auto"; else $scope.showMoreMustRead = function() {
                $scope.mustReadClass = "auto";
                NativeApp.addRegionStat("gamezone", 1, "xq_wjbd", gameId);
            };
        }
        function initEventList(data) {
            var serverTime = data.serverTime ? new Date(data.serverTime.currTime) : new Date();
            serverTime.setHours(0, 0, 0, 0);
            var oldEventList = data.oldEventList && data.oldEventList.list || [];
            var eventList = data.eventList && data.eventList.list || [];
            if (0 == oldEventList.length || oldEventList.length + eventList.length <= 3) $scope.eventIndex = 0; else if (eventList.length < 2) $scope.eventIndex = oldEventList.length + eventList.length - 3; else $scope.eventIndex = oldEventList.length - 1;
            var eventList = oldEventList.concat(eventList);
            angular.forEach(eventList, function(item) {
                var beginTime = new Date(item.beginTime);
                var beginDate = new Date(item.beginTime);
                beginDate.setHours(0, 0, 0, 0);
                var timeDiff = (beginDate - serverTime) / 1e3 / 3600 / 24;
                if (beginDate.getYear() < serverTime.getYear()) {
                    item.bgStyle = "status-gray";
                    item.beginTime = Utils.formatDate(beginTime, "yy年MM月dd日");
                } else if (timeDiff < 0) {
                    item.bgStyle = "status-gray";
                    item.beginTime = Utils.formatDate(beginTime, "MM月dd日hh:mm");
                } else if (0 == timeDiff) {
                    item.beginTime = "今天" + Utils.formatDate(beginTime, "hh:mm");
                    item.bgStyle = "status-orange";
                } else if (1 == timeDiff) {
                    item.bgStyle = "status-green";
                    item.beginTime = "明天" + Utils.formatDate(beginTime, "hh:mm");
                } else {
                    item.bgStyle = "status-green";
                    item.beginTime = Utils.formatDate(beginTime, "MM月dd日hh:mm");
                }
                item.beginTime = item.beginTime.replace(/00:00$/, "");
                if (1 == item.typeId) item.content = [ /^\d+$/g.test(item.type) ? item.type + "区" : item.type, item.title ].join(""); else item.content = item.type;
            });
            $scope.eventList = eventList;
        }
        function initImageList(imageList) {
            if (imageList && imageList.length > 0) {
                if (0 == imageList[0].isV) {
                    $scope.imageClassName = "ui-page-slideWrap_hor";
                    $scope.imageDisplayType = "h";
                    $scope.imageHeight = 190;
                    $scope.scrollWith = 317 * imageList.length + 4;
                } else {
                    $scope.imageClassName = "ui-page-slideWrap_ver";
                    $scope.imageDisplayType = "v";
                    $scope.imageHeight = 316;
                    $scope.scrollWith = 191 * imageList.length + 4;
                }
                $scope.imageList = imageList;
                $scope.showSlideShow = function(index) {
                    var imageUrl = $scope.imageList.map(function(item) {
                        return item.imgUrl;
                    });
                    NativeApp.showSlideShow(imageUrl, index);
                    NativeApp.addRegionStat("gamezone", 2, "xq_yxjt", gameId);
                };
            }
        }
        $scope.setPageScroll = function(flag) {
            console.info(flag);
            NativeApp.setGameDetailPageScroll(flag);
        };
        function cacheNetGame() {
            if (!$scope.gameInfo.base.isSimple) $timeout(function() {
                var gameIds = NativeApp.getCache("netGameVisitedHistory");
                if (angular.isDefined(gameIds) && "" != gameIds) {
                    var gameIdsArr = gameIds.split(",");
                    for (var index = 0; index < gameIdsArr.length; index++) if (gameIdsArr[index] == gameId) {
                        gameIdsArr.splice(index, 1);
                        break;
                    }
                    gameIdsArr.unshift(gameId);
                    if (gameIdsArr.length > 8) gameIdsArr = gameIdsArr.splice(0, 8);
                    NativeApp.setCache("netGameVisitedHistory", gameIdsArr.join(","));
                } else NativeApp.setCache("netGameVisitedHistory", gameId);
            }, 50);
        }
        $scope.screenShotExpandClick = function() {
            $scope.isExpandSnapShot = !$scope.isExpandSnapShot;
            NativeApp.addRegionStat("gamezone", 1, "xq_yxjt", gameId);
        };
        $scope.goArticleDetail = function(id, type, a1, regionStat) {
            if (regionStat && regionStat.p1) NativeApp.addRegionStat("gamezone", regionStat.position, regionStat.p1, gameId);
            NativeApp.openWindow("/article/detail.html", {
                gameId: gameId,
                id: id,
                type: type,
                a1: a1
            }, "game_article");
        };
        $scope.goGuideCategoryDetail = function(item, $index) {
            var index = $index + 2;
            if ($scope.guideList) index = ($scope.guideList.length || 0) + index;
            NativeApp.addRegionStat("gamezone", index, "xq_gldq", gameId);
            NativeApp.openWindow("/article/listType.html", {
                gameId: gameId,
                categoryId: item.cateId,
                page: "gameGuide"
            }, "common");
        };
        $scope.goBoardDetail = function(item, type, a1) {
            NativeApp.addRegionStat("gamezone", 1, "xq_gg", gameId);
            if (item.newsId) $scope.goArticleDetail(item.newsId, type, a1); else NativeApp.openWindow(item.url, {}, "browser");
        };
        $scope.goGiftList = function() {
            NativeApp.addRegionStat("gamezone", 1, "xq_lbfh", gameId);
            NativeApp.switchTab(0, "zq_gift");
        };
        $scope.goGiftDetail = function(item) {
            NativeApp.openWindow("/gift/detail.html", {
                gameId: item.gameId,
                sceneId: item.sceneId,
                a1: "xqy_xq"
            }, "game_article");
        };
        $scope.goMoreArticleDetail = function(type, a1) {
            NativeApp.openWindow("/article/list.html", {
                gameId: gameId,
                type: type
            }, "game_article");
        };
        $scope.goMoreGuide = function() {
            NativeApp.switchTab(0, "zq_strategy");
            NativeApp.addRegionStat("gamezone", 1, "xq_gldq", gameId);
        };
        $scope.goMoreArticleList = function(url, tabIndex, position) {
            NativeApp.addRegionStat("gamezone", position, "xq_zxhd", gameId);
            NativeApp.openWindow(url, {
                tabIndex: tabIndex,
                gameId: $scope.gameInfo.base.gameId
            }, "game_article_type");
        };
        $scope.goMoreForum = function() {
            NativeApp.addRegionStat("gamezone", 1, "xq_wjlt", gameId);
            NativeApp.switchTab(0, "zq_forum");
        };
        $scope.goForum = function(forum, $index) {
            NativeApp.addRegionStat("gamezone", $index + 2, "xq_wjlt", gameId);
            var url = forum.bbsDomain + forum.alink;
            NativeApp.openWindow(url, {}, "browser");
        };
        $scope.reportGame = function(gameInfo) {
            NativeApp.addRegionStat("gamezone", 2, "xq_xgxx", gameId);
            NativeApp.showReportDialog(gameInfo);
        };
    } ]);
    app.directive("detailgame-autoresize", [ "$scope", function($scope) {
        if ($scope.isExpandSnapShot) $timeout(function() {
            window.dispatchEvent(new Event("resize"));
        });
    } ]);
});