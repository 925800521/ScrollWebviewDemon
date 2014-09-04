define(function(require, exports, module) {
    "use strict";
    require("../shared/giftList");
    require("../shared/dialog");
    var app = angular.module("ngmApp");
    app.page = "gift.list";
    app.controller("giftListCtrl", [ "$scope", "$rootScope", "NativeApp", "Loader", "$routeParams", "$sce", "Dialog", "GameService", function($scope, $rootScope, NativeApp, Loader, $routeParams, $sce, Dialog, GameService) {
        $rootScope.bgColor = "#FFF";
        var gameId = $routeParams.gameId;
        var gameName = $routeParams.gameName;
        var action = $routeParams.action || "btn_gamegiftlist";
        var a1 = $routeParams.a1;
        var a3 = $routeParams.a3;
        var ada1 = $routeParams.ada1;
        var adpId = $routeParams.adpId;
        var admId = $routeParams.admId;
        var opt = $routeParams.opt;
        var ucid = $routeParams.ucid;
        var nickName = $routeParams.nickName;
        var from = $routeParams.from;
        if (a1) NativeApp.addActionStat(action, a1, gameId, a3);
        if (gameName) NativeApp.setNavTitle(gameName + "礼包");
        var config = {
            giftList: {
                service: "op.ka.basic.listByGid",
                data: {
                    gameId: gameId
                },
                options: {
                    pager: true,
                    cache: false
                }
            },
            gameInfo: {
                service: "game.basic.data.getDetail",
                data: {
                    gameId: gameId
                },
                options: {
                    single: true,
                    transformResponse: GameService.format
                }
            },
            giftSummary: {
                service: "op.ka.gift.getByGids",
                data: {
                    gameIds: gameId,
                    giftCount: 0
                }
            }
        };
        Loader.init({
            configList: config,
            onInit: onInit,
            onData: onPage
        });
        function onInit(response) {
            var data = response.data;
            var gameInfo = data.gameInfo;
            if (gameInfo.detail.description) gameInfo.detail.description = $sce.trustAsHtml(gameInfo.detail.description);
            if (gameInfo.detail.versionUpdateDesc) gameInfo.detail.versionUpdateDesc = $sce.trustAsHtml(gameInfo.detail.versionUpdateDesc);
            $scope.noPic = true;
            $scope.gameInfo = gameInfo;
            if (data.giftSummary && angular.isArray(data.giftSummary.list) && data.giftSummary.list.length > 0) $scope.giftSummary = data.giftSummary.list[0].giftSummary;
            if (!$scope.gameInfo.base.isSimple) {
                $scope.isFollowed = NativeApp.isFollowApp($scope.gameInfo);
                $scope.isShowFollowTip = !NativeApp.getCache("UCGC.game.hideFollowTip");
                NativeApp.autoFollowApp($scope.gameInfo, {
                    opt: opt,
                    ucid: ucid,
                    nickName: nickName
                }, {
                    action: "btn_bookonlinegame",
                    a1: "lbfhyx",
                    a2: $scope.gameInfo.base.gameId
                });
            }
            NativeApp.setShareInfo({
                title: "[" + $scope.gameInfo.base.gameName + "]九游超多礼包免费领",
                content: "我刚在九游领取了[" + $scope.gameInfo.base.gameName + "]礼包，手快有，手慢无！",
                shareUrl: "http://ka.9game.cn/game/" + gameId + "_-5_1.html",
                imgUrl: $scope.gameInfo.base.gameIcon,
                iconUrl: $scope.gameInfo.base.gameIcon,
                adWord: "手机游戏尽在九游",
                adUrl: "http://app.9game.cn/?ch=KD_3",
                platform: ""
            }, {
                action: "btn_share",
                a1: "lbyxlb_all",
                a2: gameId
            });
            var statInfo = [ {
                a1: "msg" == from ? "lbfhyx_all_xx" : "lbfhyx",
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
            if (!gameName && gameInfo.base.gameName) NativeApp.setNavTitle(gameInfo.base.gameName + "礼包");
            Dialog.toastLogin();
        }
        function onPage(response) {
            $scope.giftList = ($scope.giftList || []).concat(response.data.giftList.list);
            angular.forEach($scope.giftList, function(item, key) {
                console.log("name:" + item.name + "--- status:" + item.status);
            });
        }
        $scope.toggleFollowState = function(follow) {
            if (follow) {
                $scope.hideFollowTip();
                NativeApp.followApp($scope.gameInfo, {
                    action: "btn_bookonlinegame",
                    a1: "lbfhyx",
                    a2: $scope.gameInfo.base.gameId
                }, null, false);
            } else NativeApp.unfollowApp($scope.gameInfo, {
                action: "btn_unbookonlinegame",
                a1: "lbfhyx",
                a2: $scope.gameInfo.base.gameId
            });
        };
        $scope.hideFollowTip = function() {
            $scope.isShowFollowTip = false;
            NativeApp.setCache("UCGC.game.hideFollowTip", true, 1e3 * 60 * 60 * 24 * 365);
        };
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId
            }, "game_detail");
        };
        NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
        $rootScope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
            console.log(">>>>>>>>>>>>H5:" + JSON.stringify(json));
            console.log(">>>>>>>>>>>>H5:gameInfo:" + JSON.stringify($scope.gameInfo));
            var matchData = GameService.findSameGameInfo(json, $scope.gameInfo);
            console.log(">>>>>>>>>>>>H5:matchData:" + JSON.stringify(matchData));
            if (matchData) {
                $scope.isFollowed = !!matchData.isFollow;
                console.log(">>>>>>>>>>>>H5:isFollowed:" + $scope.isFollowed);
            }
            $scope.isShowFollowTip = !NativeApp.getCache("UCGC.game.hideFollowTip");
        });
    } ]);
});