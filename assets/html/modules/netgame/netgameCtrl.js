define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    require("commons/ngmAdSlide");
    var stat = require("commons/stat");
    app.controller("netgameCtrl", [ "$scope", "$rootScope", "NativeApp", "Loader", "GameService", "Utils", function($scope, $rootScope, NativeApp, Loader, GameService, Utils) {
        NativeApp.setNavTitle("网游");
        var config = {
            carousel: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 300,
                    hasAdm: true
                }
            },
            topImageAdList: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 301,
                    hasAdm: true
                },
                page: {
                    size: 1
                }
            },
            topAdList: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 302,
                    hasAdm: true
                },
                page: {
                    size: 3
                }
            },
            hotGameList: {
                service: "op.ad.adm.getGameList",
                data: {
                    type: 300,
                    hasAdm: true
                },
                page: {
                    size: 8
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            recGameList: {
                service: "op.ad.adm.getGameList",
                data: {
                    type: 301,
                    hasAdm: true
                },
                page: {
                    size: 8
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            dailyImageGame: {
                service: "op.ad.adm.getGameList",
                data: {
                    type: 302,
                    hasAdm: true
                },
                page: {
                    size: 1
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            gameList: {
                service: "op.ad.adm.getGameList",
                data: {
                    type: 303,
                    hasAdm: true
                },
                page: {
                    size: 3
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            openGameList: {
                service: "op.ad.adm.getEventGameList",
                data: {
                    type: 300,
                    hasAdm: true
                },
                page: {
                    size: 4
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            categoryList: {
                service: "game.category.getInfo",
                data: {
                    type: 6,
                    hasExcellent: 0
                },
                page: {
                    size: 8
                }
            },
            subjectList: {
                service: "game.category.getInfo",
                data: {
                    type: 7,
                    isnetgame: 1
                },
                page: {
                    size: 15
                }
            }
        };
        Loader.initOnce(config, function(response) {
            var data = response.data;
            $scope.loaded = true;
            $scope.carousel = data.carousel ? data.carousel.adms : [];
            $scope.carouselAdpId = data.carousel ? data.carousel.adpId : "";
            $scope.topImageAdList = data.topImageAdList ? data.topImageAdList.adms : [];
            $scope.topImageAdpId = data.topImageAdList ? data.topImageAdList.adpId : "";
            $scope.topAdList = setTopAdStyle(data.topAdList ? data.topAdList.adms : []);
            $scope.topAdAdpId = data.topAdList ? data.topAdList.adpId : "";
            $scope.hotGameList = data.hotGameList.list;
            $scope.hotGameAdpId = data.hotGameList ? data.hotGameList.adpId : "";
            $scope.recGameList = data.recGameList.list;
            $scope.recGameAdpId = data.recGameList ? data.recGameList.adpId : "";
            $scope.dailyImageGame = data.dailyImageGame.list;
            $scope.dailyImageAdpId = data.dailyImageGame ? data.dailyImageGame.adpId : "";
            $scope.gameList = data.gameList.list;
            $scope.gameListAdpId = data.gameList ? data.gameList.adpId : "";
            $scope.openGameList = data.openGameList.list;
            $scope.openGameAdpId = data.openGameList ? data.openGameList.adpId : "";
            angular.forEach($scope.openGameList, function(gameInfo, key) {
                syncGameState(gameInfo);
            });
            $scope.categoryList = data.categoryList.list;
            $scope.subjectList = data.subjectList.list;
            $scope.dailyImageHeight = NativeApp.getDefaultImageSize().height;
            $scope.startStatTrigger(false);
        }, {
            a1: "wy"
        });
        if ($scope.imei) {
            var lastTime = NativeApp.getCache("UCGC.gift.lastTime");
            var newGiftCount = NativeApp.getSession("UCGC.gift.newCount");
            if ("" === newGiftCount) Loader.request({
                callbackId: "giftCount",
                service: "op.ka.basic.getIncrCount",
                data: {
                    lastTime: lastTime ? lastTime : null
                }
            }).then(function(response) {
                var data = response.data.giftCount;
                var newGiftCount = data.incrCount;
                var currTime = data.currTime || new Date().getTime();
                NativeApp.setSession("UCGC.gift.newCount", newGiftCount);
                NativeApp.setCache("UCGC.gift.lastTime", currTime);
                $scope.giftCount = newGiftCount > 99 ? "99+" : newGiftCount;
            }); else $scope.giftCount = newGiftCount;
            NativeApp.registerEvent(NativeApp.EVENT_GIFT_NEW_COUNT_CHANGED, function(type, data) {
                if (!(data && "2" == data.categoryId)) $scope.giftCount = 0;
            });
        }
        $scope.openPage = function(url, params, target, stat) {
            if (!url) return;
            if (stat) {
                if (stat.action && stat.a1) NativeApp.addActionStat(stat.action, stat.a1, stat.a2, stat.a3);
                if (stat.p1) NativeApp.addRegionStat(stat.region || "onlinegame", stat.position || 1, stat.p1, stat.p2, stat.p3);
                if (params.adpId && params.admId) {
                    NativeApp.addActionStat("ad_click", "wy", stat.gameId || "", "", params.adpId, params.admId);
                    angular.extend(params, {
                        adpId: params.adpId,
                        admId: params.admId,
                        ada1: "wy"
                    });
                }
                if (stat.a1) angular.extend(params, {
                    a1: stat.a1,
                    a3: stat.a3 || ""
                });
            }
            if (url.indexOf("gift.html") > -1) {
                $scope.giftCount = 0;
                NativeApp.setSession("UCGC.gift.newCount", 0);
                NativeApp.triggerEvent(NativeApp.EVENT_GIFT_NEW_COUNT_CHANGED);
            }
            NativeApp.openWindow(url, params, target);
        };
        $scope.showTotalGame = true;
        $scope.gameScoreInstructDesc = "instruction";
        $scope.goGameDetail = function(gameInfo, stat) {
            var params = {
                gameId: gameInfo.base.gameId,
                gameName: gameInfo.base.gameName
            };
            if (stat) {
                var adpId = stat.adpId || "";
                var admId = gameInfo.adm ? gameInfo.adm.admId || "" : "";
                angular.extend(params, {
                    a1: stat.a1 || "",
                    a2: stat.a2 || "",
                    a3: stat.a3 || "",
                    action: stat.action || "",
                    adpId: adpId,
                    admId: admId,
                    ada1: "wy"
                });
                if (stat.p1) NativeApp.addRegionStat(stat.region || "onlinegame", stat.position || 1, stat.p1, stat.p2, stat.p3);
                if (stat.adpId && gameInfo.adm && gameInfo.adm.admId) NativeApp.addActionStat("ad_click", "wy", gameInfo.base.gameId, "", adpId, admId);
            }
            NativeApp.openWindow("/game/detail.html", params, "game_detail");
        };
        $scope.goGiftList = function($event, gameInfo, stat) {
            $event.stopPropagation();
            if ($scope.imei && gameInfo.status.gift) NativeApp.openWindow("/gift/list.html", {
                gameId: gameInfo.base.gameId,
                gameName: encodeURIComponent(gameInfo.base.gameName),
                a1: stat.a1,
                p1: stat.p1,
                position: stat.position
            }, "game_article");
        };
        $scope.download = function($event, gameInfo, stat) {
            $event.stopPropagation();
            var state = gameInfo.gameState;
            var gameId = gameInfo.base.gameId;
            var currentTime = Utils.formatDate(new Date(), "yyyyMMddhhmmss");
            if (107 == state || 207 == state || 302 == state) NativeApp.installApp(gameInfo, {
                action: "btn_install",
                a1: stat.a1,
                a2: gameId
            }); else if (300 == state || 301 == state) NativeApp.startupApp(gameInfo, {
                action: "btn_open",
                a1: stat.a1,
                a2: gameId,
                a3: currentTime
            }); else if (400 == state) NativeApp.startupWebApp(gameInfo, {
                action: "btn_open",
                a1: stat.a1,
                a2: gameId,
                a3: currentTime
            }); else {
                NativeApp.addActionStat("ad_click", "wy", gameId, "", stat.adpId, gameInfo.adm.admId);
                NativeApp.startDownloadApp(gameInfo, [ {
                    action: "btn_down",
                    a1: stat.a1,
                    a2: gameId
                }, {
                    action: "ad_down",
                    a1: "wy",
                    a2: gameId,
                    a3: "",
                    ad_position: stat.adpId,
                    ad: gameInfo.adm.admId
                } ]);
                NativeApp.showMessage("已加入下载队列,请到[我的游戏]查看下载进度!");
            }
        };
        $scope.goCategoryDetailPage = function(category, index) {
            NativeApp.openWindow("/rank.html", {
                cateTag: category.mark,
                rankTag: "wyrb"
            }, "rank");
            NativeApp.addRegionStat("onlinegame", index + 2, "wyfl_" + category.mark + "_wyrb");
        };
        $scope.goArticleDetail = function(item, type, stat) {
            if (stat && stat.p1) NativeApp.addRegionStat(stat.region || "newgame", stat.position || 1, stat.p1, stat.p2, stat.p3, stat.positon);
            NativeApp.openWindow("/article/detail.html", {
                gameId: item.gameId,
                id: item.id,
                type: type,
                a1: stat.a1
            }, "game_article");
        };
        $scope.goToSubjectPage = function(subject, index) {
            NativeApp.openWindow("/rank.html", {
                cateTag: subject.mark,
                rankTag: "wyrb"
            }, "rank");
            NativeApp.addRegionStat("onlinegame", index + 1, "wytc_" + subject.mark + "_wyrb");
        };
        NativeApp.registerEvent(NativeApp.EVENT_PACKAGE_STATE_CHANGED);
        $scope.$on(NativeApp.EVENT_PACKAGE_STATE_CHANGED, function(event, json) {
            angular.forEach($scope.openGameList, function(gameInfo, key) {
                if (gameInfo.base.gameId == json.gameId) syncGameState(gameInfo);
            });
        });
        $scope.startStatTrigger = function(isReset) {
            stat.startStat([ "ad_carousel", "ad_topAd", "ad_hotGame", "ad_recGame", "ad_daily_one", "ad_dailyRec", "ad_openService" ], {
                action: "ad_show",
                a1: "wy"
            }, NativeApp, isReset);
        };
        function syncGameState(gameInfo) {
            NativeApp.getPackageState(gameInfo, function(json) {
                $rootScope.$apply(function() {
                    if (json && json.data) {
                        if (107 == json.data.state || 207 == json.data.state || 302 == json.data.state) gameInfo.downClass = "ico-set"; else if (300 == json.data.state || 301 == json.data.state || 400 == json.data.state) gameInfo.downClass = "ico-open";
                        gameInfo.gameState = json.data.state;
                    }
                });
            });
        }
        function setTopAdStyle(topAdList) {
            var len = angular.isArray(topAdList) ? topAdList.length : 0;
            var className = [ "bg_blue", "bg_orange", "bg_yellow" ];
            for (var i = 0; i < len; i++) {
                topAdList[i].className = className[i];
                if (2 == len && topAdList[0].p1 == topAdList[1].p1) topAdList[1].className = className[0]; else if (3 == len) if (topAdList[2].p1 == topAdList[1].p1) topAdList[2].className = topAdList[1].className; else if (topAdList[2].p1 == topAdList[0].p1) topAdList[2].className = topAdList[0].className;
            }
            return topAdList;
        }
        document.addEventListener("touchstart", function(e) {
            var stat = !Utils.closest(e.target, "index-show");
            e.stopPropagation();
            NativeApp.setNativeDefaultActionState(stat);
        }, false);
    } ]);
});