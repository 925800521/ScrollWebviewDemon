define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    var stat = require("commons/stat");
    require("commons/ngmAdSlide");
    app.controller("newgameCtrl", [ "$scope", "$rootScope", "NativeApp", "Loader", "GameService", function($scope, $rootScope, NativeApp, Loader, GameService) {
        NativeApp.setNavTitle("新游");
        var width = NativeApp.getEnv("webview_dimension_width");
        if (!width) width = document.documentElement.clientWidth;
        $scope.marketHeight = Math.round(.75 * (width - 36) * (151 / 273));
        var config = {
            carousel: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 200
                }
            },
            brokeList: {
                service: "article.basic.list",
                data: {
                    fid: 6,
                    hasextern: 1
                },
                page: {
                    size: 3
                }
            },
            expectList: {
                service: "op.ad.adm.getGameList",
                data: {
                    type: 200,
                    hasAdm: true
                },
                page: {
                    size: 5
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            evaluateList: {
                service: "article.basic.list",
                data: {
                    fid: 7,
                    hasextern: 1
                },
                page: {
                    size: 3
                }
            },
            openTestList: {
                service: "op.ad.adm.getEventGameList",
                data: {
                    type: 200
                },
                page: {
                    size: 4
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            latestGameList: {
                service: "game.rank.list",
                data: {
                    orderid: 8,
                    hasAdm: true
                },
                page: {
                    size: 8
                },
                options: {
                    transformResponse: GameService.format
                }
            },
            marketLarge: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 201
                },
                page: {
                    size: 1
                }
            },
            marketSmall: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 203
                },
                page: {
                    size: 2
                }
            },
            hotWords: {
                service: "op.ad.adm.getTextPicList",
                data: {
                    type: 202
                },
                page: {
                    size: 8
                }
            }
        };
        Loader.initOnce(config, function(response) {
            var data = response.data;
            console.log(data);
            $scope.loaded = true;
            $scope.carousel = data.carousel ? data.carousel.adms : [];
            $scope.carouselAdpId = data.carousel ? data.carousel.adpId : "";
            $scope.brokeList = data.brokeList.list;
            $scope.expectList = setGameFollowStatus(data.expectList.list);
            $scope.expectAdpId = data.expectList ? data.expectList.adpId : "";
            $scope.evaluateList = data.evaluateList.list;
            if (data.openTestList && angular.isArray(data.openTestList.list)) {
                var openTestList = data.openTestList.list.slice(0, 4);
                if (openTestList.length % 2 == 1) openTestList.pop();
                $scope.openTestList = openTestList;
            }
            $scope.openTestAdpId = data.openTestList ? data.openTestList.adpId : "";
            $scope.latestGameList = data.latestGameList;
            $scope.marketLarge = data.marketLarge ? data.marketLarge.adms : [];
            $scope.marketLargeAdpId = data.marketLarge ? data.marketLarge.adpId : "";
            $scope.marketSmall = data.marketSmall ? data.marketSmall.adms : [];
            $scope.marketSmallAdpId = data.marketSmall ? data.marketSmall.adpId : "";
            $scope.hotWords = data.hotWords ? data.hotWords.adms : [];
            $scope.hotWordsAdpId = data.hotWords ? data.hotWords.adpId : "";
            $scope.startStatTrigger(false);
        }, {
            a1: "xy"
        });
        if ($scope.imei) {
            var lastTime = NativeApp.getCache("UCGC.activation.lastTime");
            var newGiftCount = NativeApp.getSession("UCGC.activation.newCount");
            if ("" === newGiftCount) Loader.request({
                callbackId: "giftCount",
                service: "op.ka.basic.getIncrCount",
                data: {
                    categoryId: 2,
                    lastTime: lastTime ? lastTime : null
                }
            }).then(function(response) {
                var data = response.data.giftCount;
                var newGiftCount = data.incrCount;
                var currTime = data.currTime || new Date().getTime();
                NativeApp.setSession("UCGC.activation.newCount", newGiftCount);
                NativeApp.setCache("UCGC.activation.lastTime", currTime);
                $scope.giftCount = newGiftCount > 99 ? "99+" : newGiftCount;
            }); else $scope.giftCount = newGiftCount;
            NativeApp.registerEvent(NativeApp.EVENT_GIFT_NEW_COUNT_CHANGED, function(type, data) {
                if (data && "2" == data.categoryId) $scope.giftCount = 0;
            });
        }
        $scope.openPage = function(url, params, target, stat) {
            if (!url) return;
            if (stat) {
                if (stat.action && stat.a1) NativeApp.addActionStat(stat.action, stat.a1, stat.a2, stat.a3);
                if (stat.p1) NativeApp.addRegionStat(stat.region || "newgame", stat.position || 1, stat.p1, stat.p2, stat.p3);
                if (params.adpId && params.admId) {
                    NativeApp.addActionStat("ad_click", "xy", stat.gameId || "", "", params.adpId, params.admId);
                    angular.extend(params, {
                        adpId: params.adpId,
                        admId: params.admId,
                        ada1: "xy"
                    });
                }
                if (stat.a1) angular.extend(params, {
                    a1: stat.a1,
                    a3: stat.a3 || ""
                });
            }
            if (url.indexOf("gift.html") > -1) {
                $scope.giftCount = 0;
                NativeApp.setSession("UCGC.activation.newCount", 0);
            }
            NativeApp.openWindow(url, params, target);
        };
        $scope.goGameDetail = function(gameInfo, stat) {
            var params = {
                gameId: gameInfo.base.gameId,
                gameName: encodeURIComponent(gameInfo.base.gameName)
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
                    ada1: "xy"
                });
                if (stat.p1) NativeApp.addRegionStat(stat.region || "newgame", stat.position || 1, stat.p1, stat.p2, stat.p3);
                if (stat.adpId && gameInfo.adm && gameInfo.adm.admId) NativeApp.addActionStat("ad_click", "xy", gameInfo.base.gameId, "", adpId, admId);
            }
            NativeApp.openWindow("/game/detail.html", params, "game_detail");
        };
        $scope.goGiftList = function($event, gameInfo, stat) {
            $event.stopPropagation();
            if (gameInfo.status.hasActiCode) {
                if (stat.adpId && gameInfo.adm && gameInfo.adm.admId) NativeApp.addActionStat("ad_click", "xy", gameInfo.base.gameId, "", stat.adpId, gameInfo.adm.admId);
                NativeApp.openWindow("/gift/list.html", {
                    a1: stat.a1,
                    gameId: gameInfo.base.gameId,
                    ada1: stat.ada1,
                    adpId: stat.adpId,
                    admId: gameInfo.adm.admId,
                    gameName: encodeURIComponent(gameInfo.base.gameName)
                }, "game_article");
            }
        };
        $scope.goArticleDetail = function(item, type, stat) {
            if (stat && stat.p1) NativeApp.addRegionStat(stat.region || "newgame", stat.position || 1, stat.p1, stat.p2, stat.p3);
            NativeApp.openWindow("/article/detail.html", {
                gameId: item.gameId,
                id: item.id,
                type: type,
                a1: stat.a1
            }, "game_article");
        };
        $scope.toggleFollowState = function($event, gameInfo, adpId) {
            $event.stopPropagation();
            if (!gameInfo.isFollowed && !gameInfo.base.isSimple) {
                if (adpId && gameInfo.adm && gameInfo.adm.admId) NativeApp.addActionStat("ad_click", "xy", gameInfo.base.gameId, "", adpId, gameInfo.adm.admId);
                NativeApp.followApp(gameInfo, {
                    action: "btn_bookonlinegame",
                    a1: "xy_xyqdb",
                    a2: gameInfo.base.gameId
                });
            }
        };
        $scope.startStatTrigger = function(isReset) {
            stat.startStat([ "ad_carousel", "ad_expectList", "ad_openTest", "ad_market", "ad_hotWords" ], {
                action: "ad_show",
                a1: "xy"
            }, NativeApp, isReset);
        };
        function setGameFollowStatus(gameList) {
            angular.forEach(gameList, function(value, key) {
                value.isFollowed = NativeApp.isFollowApp(value);
            });
            return gameList;
        }
        NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
        $rootScope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
            $scope.safeApply(function() {
                angular.forEach($scope.expectList, function(value, key) {
                    var matchData = GameService.findSameGameInfo(json, value);
                    if (matchData) value.isFollowed = !!matchData.isFollow;
                });
            });
        });
    } ]);
});