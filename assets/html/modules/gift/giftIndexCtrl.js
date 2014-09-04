define(function(require, exports, module) {
    "use strict";
    require("commons/ngmAdSlide");
    require("commons/autocomplete");
    require("../shared/gameGiftList");
    require("../shared/dialog");
    var app = angular.module("ngmApp");
    app.controller("giftIndexCtrl", [ "$scope", "NativeApp", "Loader", "GameService", "$q", "$http", "Dialog", "Utils", function($scope, NativeApp, Loader, GameService, $q, $http, Dialog, Utils) {
        app.page = "gift.index";
        NativeApp.setNavTitle("礼包");
        var config = {
            carousel: {
                service: "op.ad.getAdPositionList",
                data: {
                    adposid: 1297
                }
            },
            activation: {
                service: "op.ka.gift.listByCategory",
                data: {
                    categoryId: 2,
                    giftCount: 1
                },
                page: {
                    size: 5
                }
            },
            beginner: {
                service: "op.ka.gift.listByCategory",
                data: {
                    categoryId: 1,
                    giftCount: 1
                },
                page: {
                    size: 5
                }
            },
            privilege: {
                service: "op.ka.gift.listByCategory",
                data: {
                    categoryId: 3,
                    giftCount: 1
                },
                page: {
                    size: 5
                }
            }
        };
        var lastTime = NativeApp.getCache("UCGC.gift.lastTime");
        var newActivationCount = NativeApp.getSession("UCGC.gift.newCount");
        if ("" === newActivationCount) config.newGift = {
            service: "op.ka.basic.getIncrCount",
            data: {
                lastTime: lastTime ? lastTime : null
            }
        };
        var promises = [];
        var defer1 = $q.defer();
        var defer2 = $q.defer();
        NativeApp.getInstalledApp(function(data) {
            defer1.resolve(data);
        });
        NativeApp.getFollowApps(function(data) {
            defer2.resolve(data);
        });
        promises.push(defer1.promise);
        promises.push(defer2.promise);
        $q.all(promises).then(function(data) {
            var installGameIds = getGameIds(data.shift() || []);
            var followGameIds = getGameIds(data.shift() || []);
            var cacheNetGameIds = getCacheNetGameIds();
            if (installGameIds.length > 0) config.installed = {
                service: "op.ka.gift.getByGids",
                data: {
                    gameIds: installGameIds.join(","),
                    giftCount: 2
                }
            };
            var guessGameIds = getGuessGameIds(installGameIds, followGameIds, cacheNetGameIds);
            config.guessList = {
                service: "op.ka.gift.getByRecommend",
                data: {
                    gameIds: guessGameIds.join(","),
                    giftCount: 0,
                    maxCount: 8
                }
            };
            Loader.initOnce(config, function(response) {
                var data = response.data;
                $scope.carousel = data.carousel.list;
                $scope.installed = data.installed ? data.installed.list : [];
                $scope.guessList = data.guessList ? data.guessList.list : [];
                $scope.activation = data.activation.list;
                $scope.beginner = data.beginner.list;
                $scope.privilege = data.privilege.list;
                if (data.newGift) {
                    var currTime = data.newGift.currTime || new Date().getTime();
                    NativeApp.setSession("UCGC.gift.newCount", 0);
                    NativeApp.setCache("UCGC.gift.lastTime", currTime);
                    NativeApp.triggerEvent(NativeApp.EVENT_GIFT_NEW_COUNT_CHANGED);
                }
                Dialog.toastLogin();
            }, {
                a1: "lbfh"
            });
        });
        function getGameIds(res) {
            if (angular.isDefined(res)) {
                var list = res.data, ids = [];
                if (res.result && list.length) angular.forEach(list, function(v, k) {
                    ids.push(String(v.gameId));
                });
                return ids;
            } else return [];
        }
        function getCacheNetGameIds() {
            var gameIds = NativeApp.getCache("netGameVisitedHistory");
            return gameIds ? gameIds.split(",") : [];
        }
        function getGuessGameIds(installGameIds, followGameIds, cacheNetGameIds) {
            angular.forEach(cacheNetGameIds, function(v, k) {
                if (followGameIds.indexOf(v) == -1) followGameIds.push(v);
            });
            angular.forEach(installGameIds, function(v, k) {
                var index = followGameIds.indexOf(v);
                if (index > -1) followGameIds.splice(index, 1);
            });
            if (followGameIds.length > 8) followGameIds = followGameIds.splice(0, 8);
            return followGameIds;
        }
        $scope.statInfo = {
            a1: "lbfh"
        };
        $scope.switchTab = function(index) {
            NativeApp.switchTab(index);
        };
        $scope.goMoreGiftPage = function(categoryId, action, a1) {
            NativeApp.addActionStat(action, a1);
            NativeApp.openWindow("/gift/gameGiftList.html", {
                categoryId: categoryId
            }, "common");
        };
        $scope.toList = function(item, $index, a1) {
            NativeApp.openWindow("/gift/list.html", {
                gameId: item.game.id,
                gameName: item.game.name,
                a1: a1
            }, "game_article");
        };
        $scope.goGiftDetail = function(item, index) {
            var sceneId;
            if (angular.isArray(item.gifts) && item.gifts.length > 0) sceneId = item.gifts[0].id;
            NativeApp.addActionStat("detail_gift", "lbfhsy_jhm", sceneId, item.game.id);
            NativeApp.openWindow("/gift/detail.html", {
                sceneId: sceneId
            }, "game_article");
        };
        $scope.search = function(keyword) {
            if (keyword) NativeApp.openWindow("/gift/search.html", {
                keyword: keyword
            }, "common");
        };
        document.addEventListener("touchstart", function(e) {
            e.stopPropagation();
            if (!Utils.closest(e.target, "index-show")) NativeApp.setGameDetailPageScroll(false); else NativeApp.setGameDetailPageScroll(true);
        }, false);
    } ]);
});