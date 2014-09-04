define(function(require, exports, module) {
    "use strict";
    require("../shared/dialog");
    var app = angular.module("ngmApp");
    app.controller("myGiftCtrl", [ "$scope", "$rootScope", "$timeout", "NativeApp", "Loader", "Dialog", function($scope, $rootScope, $timeout, NativeApp, Loader, Dialog) {
        NativeApp.setWebViewState("loading");
        var tabMapping = {
            1: "get",
            2: "dredge",
            3: "subscribe"
        };
        var screenHeight = NativeApp.getEnv("webview_dimension_height");
        $scope.tabIndex = 1;
        $scope.myGiftTab = tabMapping[1];
        $scope.ImageMarginHeight = screenHeight > 0 ? (screenHeight - 300) / 2 : 30;
        $rootScope.bgColor = "#FFF";
        $scope.isEmpty = false;
        $scope.switchTab = function(index) {
            $scope.tabIndex = index;
            $scope.myGiftTab = tabMapping[index];
            switch (index) {
              case 1:
                $scope.isEmpty = !($scope.getGiftList && $scope.getGiftList.length > 0);
                $scope.tipMessage = "手快有手慢无,快去领取珍贵礼包!";
                break;

              case 2:
                $scope.isEmpty = !($scope.dredgeGiftList && $scope.dredgeGiftList.length > 0);
                $scope.tipMessage = "未淘到任何礼包,一大波礼包正在等着你!";
                break;

              case 3:
                $scope.isEmpty = !($scope.subscribeGiftList && $scope.subscribeGiftList.length > 0);
                $scope.tipMessage = "预订享受优先领号特权哦,快去预订吧!";
            }
            NativeApp.setWebViewState("loaded");
            console.log(">>>H5 isEmpty:" + $scope.isEmpty);
            if ($scope.isEmpty) $timeout(function() {
                angular.element(document.getElementById("empty")).css("display", "block");
            }, 0);
        };
        function getMyGiftInfo() {
            NativeApp.getMyGiftInfo(function(json) {
                if (json.data && 5000014 == json.data.code) {
                    NativeApp.addActionStat("btn_signindialog", "lbfh");
                    NativeApp.login({}, {
                        a1: "lbdltc"
                    }, function(json) {});
                } else {
                    var getGiftList = [], dredgeGiftList = [], giftIds = [];
                    if (json && json.result && json.data) {
                        angular.forEach(json.data, function(value, key) {
                            if (value.giftCode) {
                                var propertyArray = [], codeArray = [], codeList = [];
                                if (angular.isDefined(value.giftCode.property)) propertyArray = value.giftCode.property.split(",");
                                if (angular.isDefined(value.giftCode.code)) codeArray = value.giftCode.code.split("	");
                                angular.forEach(propertyArray, function(value, key) {
                                    var codeValue = codeArray.shift();
                                    if ("" != value && void 0 != codeValue && "" != codeValue) codeList.push({
                                        property: value,
                                        code: codeValue
                                    });
                                });
                                value.codeList = codeList;
                            }
                            if (0 == value.pickupType) {
                                getGiftList.push(value);
                                giftIds.push(value.giftId);
                            } else if (1 == value.pickupType) dredgeGiftList.push(value);
                        });
                        $scope.dredgeGiftList = dredgeGiftList;
                        $timeout(function() {
                            if (giftIds.length > 0) synGiftInfo(giftIds, getGiftList); else {
                                $scope.switchTab($scope.tabIndex);
                                Dialog.toastLogin();
                            }
                        }, 0);
                    } else $scope.switchTab($scope.tabIndex);
                }
            });
        }
        function synGiftInfo(giftIds, giftList) {
            Loader.request({
                callbackId: "synGiftInfo",
                service: "op.ka.basic.listByKaIds",
                data: {
                    sceneIds: giftIds.join(",")
                },
                options: {
                    cache: 0
                }
            }).then(function(response) {
                var synGiftList = response.data.synGiftInfo;
                if (synGiftList) angular.forEach(giftList, function(value, key) {
                    var synInfo = synGiftList[value.giftId];
                    if (synInfo) value.giftSynInfo = synGiftList[value.giftId]; else value.giftSynInfo = {
                        exchangeStarttime: value.validTimeBegin,
                        exchangeEndtime: value.validTimeEnd
                    };
                });
                $scope.getGiftList = giftList;
                $scope.switchTab($scope.tabIndex);
                Dialog.toastLogin();
            });
        }
        function getSubscribeInfo() {
            NativeApp.getSubscribeInfo(function(json) {
                $timeout(function() {
                    $scope.subscribeGiftList = json.data;
                }, 0);
            });
        }
        function init() {
            getMyGiftInfo();
            getSubscribeInfo();
        }
        init();
        $scope.unsubscribeGift = function($event, item) {
            $event.stopPropagation();
            NativeApp.openWindow("/modal.html", {
                title: "取消预订",
                content: encodeURIComponent("<div>取消预订将失去优先领号特权哦，确定取消吗？</p>")
            }, "blank", {
                width: 280,
                height: 300
            }, function(btn) {
                $scope.$apply(function() {
                    if ("ok" == btn.id) NativeApp.unsubscribeGift({
                        sceneId: item.giftId
                    }, {
                        a1: "chx",
                        a2: item.giftId,
                        a3: item.gameId
                    }, function(res) {
                        if (res.data && 5000014 == res.data.code) {
                            NativeApp.addActionStat("btn_signindialog", "lbfh");
                            NativeApp.login({}, {
                                a1: "lbdltc"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) NativeApp.unsubscribeGift({
                                    sceneId: item.giftId
                                }, {
                                    a1: "chx",
                                    a2: item.giftId,
                                    a3: item.gameId
                                }, function(res) {
                                    showUnSubscribeGiftMsg(res);
                                });
                            });
                        } else showUnSubscribeGiftMsg(res);
                    });
                });
            });
        };
        function showUnSubscribeGiftMsg(res) {
            var errorCode = [ 5000104, 5000106, 5000107, 5000108, 5000110, 5000111, 5000112, 5000202 ];
            if (res.data) if (2e6 == res.data.code) NativeApp.showMessage("取消预订成功"); else if (errorCode.indexOf(+res.data.code) > -1) NativeApp.showMessage(res.msg || "取消预订失败"); else NativeApp.showMessage("取消预订失败"); else NativeApp.showMessage("取消预订失败");
        }
        $scope.copyCode = function($event, value) {
            NativeApp.setClipboard(value);
            NativeApp.showMessage("复制成功");
        };
        $scope.openGame = function(item) {
            NativeApp.startupApp({
                key: {
                    pkgName: item.packageName
                }
            }, {
                action: "btn_open",
                a1: "wdlb",
                a2: item.gameId,
                a3: utils.formatDate(new Date(), "yyyyMMddhhmmss")
            });
        };
        $scope.goGiftDetail = function(item) {
            NativeApp.addActionStat("detail_gift", "chx", item.giftId, item.gameId);
            NativeApp.openWindow("/gift/detail.html", {
                sceneId: item.giftId
            }, "game_article");
        };
        NativeApp.registerEvent(NativeApp.EVENT_GIFT_STATE_CHANGED);
        $scope.$on(NativeApp.EVENT_GIFT_STATE_CHANGED, function(event, json) {
            init();
        });
        NativeApp.registerEvent(NativeApp.EVENT_ACCOUNT_STATE_CHANGED);
        $scope.$on(NativeApp.EVENT_ACCOUNT_STATE_CHANGED, function(event, json) {
            init();
        });
    } ]);
});