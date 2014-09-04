define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.page = "gift.detail";
    require("../shared/giftList");
    require("../shared/dialog");
    app.controller("giftDetailCtrl", [ "$scope", "$rootScope", "NativeApp", "Loader", "$routeParams", "$sce", "$interval", "Dialog", "Utils", "GameService", function($scope, $rootScope, NativeApp, Loader, $routeParams, $sce, $interval, Dialog, Utils, GameService) {
        $rootScope.bgColor = "#FFF";
        var sceneId = $routeParams.sceneId;
        var action = $routeParams.action || "detail_gift";
        var a1 = $routeParams.a1;
        var a3 = $routeParams.a3 || "";
        var ada1 = $routeParams.ada1;
        var adpId = $routeParams.adpId;
        var admId = $routeParams.admId;
        var gameId, gameName, timer;
        var config = {
            giftDetail: {
                service: "op.ka.basic.getDetail",
                data: {
                    sceneId: sceneId
                },
                options: {
                    cache: 0
                }
            }
        };
        Loader.initOnce(config, function(response) {
            var data = response.data.giftDetail;
            gameId = data.gameId;
            data.exchangeStarttime = Utils.formatDate(data.exchangeStarttime, "yyyy年MM月dd日 hh:mm");
            data.exchangeEndtime = Utils.formatDate(data.exchangeEndtime, "yyyy年MM月dd日 hh:mm");
            data.body = $sce.trustAsHtml(data.body);
            data.howToUse = $sce.trustAsHtml(data.howToUse);
            data.name = data.name.replace(/^\[.*]/, "");
            $scope.item = data;
            $scope.giftList = [].concat(data);
            console.log("name:" + data.name + "--- status:" + data.status);
            var giftStartTime = data.getStarttime;
            if (21 == data.status && data.preGetTime) giftStartTime = data.preGetTime;
            giftInterval(data.currentTime || new Date().getTime(), giftStartTime);
            var gameInfoConfig = {
                callbackId: "gameInfo",
                service: "game.basic.data.getDetail",
                data: {
                    gameId: gameId
                },
                options: {
                    single: true,
                    transformResponse: GameService.format
                }
            };
            Loader.request(gameInfoConfig).then(function(response) {
                $scope.gameInfo = response.data.gameInfo;
                gameName = $scope.gameInfo.base.shortName;
                NativeApp.setNavTitle(gameName);
                NativeApp.addActionStat(action, a1, sceneId, a3 || $scope.gameInfo.base.gameId);
                var giftCanGetConfig = {
                    callbackId: "giftCanGet",
                    service: "op.ka.gift.listGetableByGid",
                    data: {
                        gameId: gameId
                    },
                    options: {
                        single: true
                    }
                };
                Loader.request(giftCanGetConfig).then(function(response) {
                    if (response.data.giftCanGet) $scope.gameInfo.status.canGift = 1; else $scope.gameInfo.status.canGift = 0;
                    var statInfo = [ {
                        a1: "lbfhxq",
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
                });
                NativeApp.setShareInfo({
                    title: $scope.item.name,
                    content: angular.element("<div>" + $scope.item.body + "</div>").text(),
                    shareUrl: "http://ka.9game.cn/personal/detail.html?id=" + sceneId,
                    imgUrl: $scope.gameInfo.base.gameIcon,
                    iconUrl: $scope.gameInfo.base.gameIcon,
                    adWord: "手机游戏尽在九游",
                    adUrl: "http://app.9game.cn/?ch=KD_3",
                    platform: ""
                }, {
                    action: "btn_share",
                    a1: "lbxq_all",
                    a2: gameId
                });
            });
            Dialog.toastLogin();
        });
        $scope.goGameDetail = function() {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameId,
                a1: "lbfhxq"
            }, "game_detail");
        };
        $scope.goGiftList = function() {
            NativeApp.openWindow("/gift/list.html", {
                a1: "lbfhxq",
                gameId: gameId,
                gameName: encodeURIComponent(gameName)
            }, "game_article");
        };
        NativeApp.registerEvent(NativeApp.EVENT_GIFT_STATE_CHANGED);
        $scope.$on(NativeApp.EVENT_GIFT_STATE_CHANGED, function(event, json) {
            refreshInterval();
        });
        function giftInterval(serverTime, giftUpTime) {
            if (timer) $interval.cancel(timer);
            var leftTime = giftUpTime - serverTime;
            var leftSeconds = parseInt(leftTime / 1e3);
            var intervalCount = 0;
            if (leftSeconds > 0 && leftSeconds < 3600 * 24) timer = $interval(function() {
                leftSeconds--;
                intervalCount++;
                var hour = Math.floor(leftSeconds / 3600);
                var minute = Math.floor((leftSeconds - 3600 * hour) / 60);
                var second = Math.floor(leftSeconds - 3600 * hour - 60 * minute);
                $scope.interval = {
                    hour: hour,
                    minute: minute,
                    second: second,
                    show: true
                };
                if (intervalCount % 3600 == 0 || 60 == leftSeconds || 30 == leftSeconds || 0 == leftSeconds) {
                    $interval.cancel(timer);
                    refreshInterval();
                }
            }, 1e3); else {
                $interval.cancel(timer);
                $scope.interval = {
                    show: false
                };
            }
        }
        function refreshInterval() {
            var refreshConfig = {
                callbackId: "giftDetail",
                service: "op.ka.basic.getDetail",
                data: {
                    sceneId: $routeParams.sceneId
                },
                options: {
                    cache: 0
                }
            };
            Loader.request(refreshConfig).then(function(response) {
                var data = response.data.giftDetail;
                var giftStartTime = data.getStarttime;
                if (21 == data.status && data.preGetTime) giftStartTime = data.preGetTime;
                giftInterval(data.currentTime || new Date().getTime(), giftStartTime);
            });
        }
    } ]);
});