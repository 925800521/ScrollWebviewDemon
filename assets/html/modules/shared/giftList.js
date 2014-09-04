define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    var cfg = {
        0: {
            tmpl: "willGet",
            btnText: "即将领号",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        1: {
            tmpl: "willSubscribe",
            btnText: "即将预订",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        10: {
            tmpl: "subscribe",
            btnText: "预订",
            btnClass: "gift.detail" == app.page ? "btn-gift btn-primary" : "btn-primary",
            btnFn: "subscribeGift",
            nextTmpl: "subscribed"
        },
        11: {
            tmpl: "subscribeStop",
            btnText: "暂停预订",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        20: {
            tmpl: "willGet",
            btnText: "即将领号",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        21: "gift.detail" != app.page ? {
            tmpl: "subscribed",
            btnText: "已预订",
            btnClass: "btn-primary-dis",
            btnFn: "",
            nextTmpl: "subscribe"
        } : {
            tmpl: "subscribed",
            btnText: "取消预订",
            btnClass: "btn-primary-long",
            btnFn: "unsubscribeGift",
            nextTmpl: "subscribe"
        },
        30: {
            tmpl: "get",
            btnText: "领号",
            btnClass: "gift.detail" == app.page ? "btn-gift btn-primary" : "btn-primary",
            btnFn: "getGift",
            nextTmpl: "got"
        },
        32: {
            tmpl: "got",
            btnText: "已领号",
            btnClass: "btn-primary-dis",
            btnFn: "",
            nextTmpl: ""
        },
        35: {
            tmpl: "willDredge",
            btnText: "即将淘号",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        31: {
            tmpl: "getStop",
            btnText: "暂停领号",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        40: {
            tmpl: "dredge",
            btnText: "淘号",
            btnClass: "gift.detail" == app.page ? "btn-gift btn-primary" : "btn-primary",
            btnFn: "dredgeGift",
            nextTmpl: ""
        },
        41: {
            tmpl: "dredgeStop",
            btnText: "暂停淘号",
            btnClass: "btn-primary-long-dis",
            btnFn: "",
            nextTmpl: ""
        },
        50: {
            tmpl: "end",
            btnText: "已过期",
            btnClass: "btn-primary-dis",
            btnFn: "",
            nextTmpl: ""
        }
    };
    function formatData(scope, customCfg) {
        if (!scope) return false;
        customCfg.percentage = parseInt(100 * (1 - scope.item.assignedCount / scope.item.totalCount));
        if ("gift.detail" == app.page) customCfg.isDetail = true;
        if ("gift.activation" == app.page) customCfg.isActivation = true;
        if ("game.detail" == app.page) customCfg.isGameDetail = true;
        if (scope.item.body) scope.item.filterBody = angular.element("<div>" + scope.item.body + "</div>").text();
        customCfg.isLoading = false;
        console.log(">>>customCfg.isLoading(formatData):" + customCfg.isLoading);
        return customCfg;
    }
    function getCfgByTmpl(tmpl) {
        if (tmpl) for (var i in cfg) if (cfg[i].tmpl == tmpl) return cfg[i];
    }
    function getCode(data) {
        if (!data || !data.property) return;
        var property = data.property.split(","), code = encodeURI(data.code).split("%09"), rt = [];
        for (var i = 0; i < property.length; i++) if ("" != property[i] && "" != code[i]) rt.push({
            key: property[i],
            value: code[i]
        });
        return rt;
    }
    function getGiftCodeList(NativeApp, giftItem, storeId) {
        var codeList = [];
        if (NativeApp.isLogin()) {
            var propertyArray = [], codeArray = [];
            if (angular.isDefined(giftItem.property)) propertyArray = giftItem.property.split(",");
            if (angular.isDefined(giftItem.code)) codeArray = giftItem.code.split("	");
            angular.forEach(propertyArray, function(value, key) {
                var codeValue = codeArray.shift();
                if ("" != value && void 0 != codeValue && "" != codeValue) codeList.push({
                    key: value,
                    value: codeValue
                });
            });
            if (0 == codeList.length) {
                var codeInfo = NativeApp.readGiftInfo(giftItem.sceneId, storeId);
                codeList = getCode(codeInfo);
            }
        } else {
            var codeInfo = NativeApp.readGiftInfo(giftItem.sceneId, storeId);
            codeList = getCode(codeInfo);
        }
        return codeList;
    }
    app.directive("giftList", [ "$location", "$rootScope", "NativeApp", function($location, $rootScope, NativeApp) {
        NativeApp.registerEvent(NativeApp.EVENT_GIFT_STATE_CHANGED);
        return {
            scope: {
                giftList: "=giftList",
                noPic: "=noPic",
                goGameDetail: "=goGameDetail",
                goGiftList: "=goGiftList",
                gameInfo: "=gameInfo",
                interval: "=interval"
            },
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                var watchProcess = $scope.$watch($attrs.giftList, function(giftList) {
                    $scope.giftList = giftList;
                });
            } ],
            templateUrl: "modules/shared/giftList.tpl.html"
        };
    } ]);
    app.directive("simpleGiftList", [ "$location", "$rootScope", "NativeApp", function($location, $rootScope, NativeApp) {
        NativeApp.registerEvent(NativeApp.EVENT_GIFT_STATE_CHANGED);
        return {
            scope: {
                giftList: "=simpleGiftList",
                gameInfo: "=gameInfo"
            },
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                var watchProcess = $scope.$watch($attrs.simpleGiftList, function(giftList) {
                    $scope.giftList = giftList;
                });
            } ],
            templateUrl: "modules/shared/simpleGiftList.tpl.html"
        };
    } ]);
    app.directive("giftItem", [ "$location", "$rootScope", "NativeApp", "Protocol", "Utils", function($location, $rootScope, NativeApp, Protocol, utils) {
        return {
            controller: [ "$scope", "$attrs", "$routeParams", function($scope, $attrs, $routeParams) {
                $scope.customCfg = $scope.customCfg || {};
                Object.defineProperty($scope.customCfg, "isLoading", {
                    get: function() {
                        return this._value;
                    },
                    set: function(value) {
                        console.log(">>>customCfg defineProperty:" + this._value + " -> " + value);
                        this._value = value;
                    }
                });
                var watchProcess = $scope.$watch($attrs.giftItem, function(giftItem) {
                    if (giftItem) {
                        var codeList, customCfg = cfg[$scope.item.status], storeId = $routeParams.storeId || 0;
                        customCfg.styleShow = {
                            display: "block"
                        };
                        customCfg = formatData($scope, customCfg);
                        console.log(">>>customCfg.isLoading(directive giftItem formatData):" + customCfg.isLoading);
                        if (customCfg.isDetail) {
                            customCfg.codeList = getGiftCodeList(NativeApp, $scope.item, storeId);
                            if (30 == giftItem.status && $routeParams.hasOwnProperty("auto")) $scope.getGift($scope);
                        }
                        angular.extend($scope.customCfg || {}, customCfg);
                        watchProcess();
                        watchProcess = void 0;
                    }
                });
                $scope.redirectToDetail = function(item, $index) {
                    if ($scope.customCfg.isDetail) return false;
                    var statInfo = $scope.getStatInfo({
                        action: "detail_gift"
                    });
                    NativeApp.addActionStat(statInfo.action, statInfo.a1, statInfo.a2, statInfo.a3);
                    if ("game.gift.list" == app.page) NativeApp.addRegionStat("gamezone", $index + 1, "lb", $scope.item.gameId); else if ("game.detail" == app.page) NativeApp.addRegionStat("gamezone", $index + 2, "xq_lbfh", $scope.item.gameId);
                    NativeApp.openWindow("/gift/detail.html", {
                        sceneId: item.sceneId
                    }, "game_article");
                };
                $scope.$on(NativeApp.EVENT_GIFT_STATE_CHANGED, function(event, json) {
                    console.log(">>>gift item change:" + JSON.stringify($scope.item));
                    console.log(">>>gift item json:" + JSON.stringify(json));
                    if ($scope.item.sceneId == json.sceneId) $scope.changeGiftState(json);
                });
                $scope.changeGiftState = function(json) {
                    var tmpl = $scope.customCfg.tmpl, nextTmpl = $scope.customCfg.nextTmpl;
                    $scope.$apply(function() {
                        console.log(">>>customCfg.isLoading:" + $scope.customCfg.isLoading);
                        $scope.customCfg.isLoading = false;
                        if (2e6 == json.code) {
                            if (tmpl && json.sceneId == $scope.item.sceneId) {
                                switch (tmpl) {
                                  case "get":
                                    nextTmpl = $scope.item.sole ? "got" : "get";
                                }
                                angular.extend($scope.customCfg, getCfgByTmpl(nextTmpl));
                                if ($scope.customCfg.isDetail) $scope.customCfg.codeList = getCode(json.data);
                            }
                        } else setTimeout(function() {
                            $scope.handerError(json);
                        }, 10);
                    });
                };
                $scope.copyCode = function(value) {
                    NativeApp.setClipboard(value);
                    NativeApp.showMessage("复制成功");
                };
                $scope.btnClick = function() {
                    console.log(">>>gift item:" + JSON.stringify($scope.item));
                    var fn = $scope.customCfg.btnFn;
                    if (fn) {
                        if (("subscribeGift" == fn || "getGift" == fn) && $scope.item.needLogin && !NativeApp.isLogin()) $scope.customCfg.isLoading = false; else $scope.customCfg.isLoading = true;
                        console.log(">>>customCfg isLoading(btnClick):" + $scope.customCfg.isLoading);
                        $scope[fn]($scope);
                    }
                };
                $scope.handerError = function(res, isCurrentPage) {
                    var arrRereshCode;
                    arrRereshCode = [ 5000104, 5000106, 5000107, 5000108, 5000110, 5000111, 5000112, 5000202 ];
                    if (res.data && arrRereshCode.indexOf(+res.data.code) > -1) {
                        $scope.customCfg.isLoading = true;
                        Protocol.request("op.ka.basic.getDetail", {
                            sceneId: $scope.item.sceneId
                        }, {}).then(function(res) {
                            var data = res.data, customCfg = cfg[res.data.status];
                            $scope.item = data;
                            customCfg = formatData($scope, customCfg);
                            $scope.customCfg = $scope.customCfg || {};
                            angular.extend($scope.customCfg, customCfg);
                        });
                    }
                    if (isCurrentPage) NativeApp.openWindow("/modal.html", {
                        title: "温馨提示",
                        content: encodeURIComponent(res.msg),
                        btnList: encodeURIComponent(JSON.stringify([ {
                            id: "close",
                            text: "关闭"
                        } ]))
                    }, "blank", {
                        width: 280,
                        height: 300
                    });
                    console.log(">>>customCfg isLoading(handerError):" + $scope.customCfg.isLoading);
                    $scope.customCfg.isLoading = false;
                    $scope.$apply();
                };
                $scope.getGift = function(st, status) {
                    var stat = {
                        action: "btn_getgift",
                        a1: st ? st.a1 : ""
                    };
                    var statInfo = $scope.getStatInfo(stat);
                    if ("login" != status) NativeApp.addActionStat(statInfo.action, statInfo.a1, statInfo.a2, statInfo.a3);
                    if (!$scope.item.issueForm) NativeApp.getGift($scope.item, {}, statInfo, function(res) {
                        if (res.data && 5000014 == res.data.code) {
                            NativeApp.addActionStat("btn_signindialog", "lbfh");
                            NativeApp.login({}, {
                                a1: "lbdltc"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) $scope.getGift(null, "login");
                            });
                        } else if (res.result) if ($scope.gameInfo) NativeApp.getPackageState($scope.gameInfo, function(json) {
                            var tip = "";
                            var downState = "";
                            var downStyle = false;
                            var display = true;
                            var downHandler = angular.noop;
                            switch (String(json.data.state)) {
                              case "0":
                                tip = downState = "下载游戏";
                                downStyle = true;
                                downHandler = function() {
                                    NativeApp.startDownloadApp($scope.gameInfo, {
                                        action: "btn_down",
                                        a1: "lbxzfc",
                                        a2: $scope.gameInfo.base.gameId
                                    });
                                };
                                break;

                              case "107":
                              case "207":
                              case "302":
                                tip = downState = "安装游戏";
                                downStyle = true;
                                downHandler = function() {
                                    NativeApp.installApp($scope.gameInfo, {
                                        action: "btn_install",
                                        a1: "lbxzfc",
                                        a2: $scope.gameInfo.base.gameId
                                    });
                                };
                                break;

                              case "300":
                              case "301":
                                tip = downState = "打开游戏";
                                downStyle = true;
                                downHandler = function() {
                                    NativeApp.startupApp($scope.gameInfo, {
                                        action: "btn_open",
                                        a1: "lbxzfc",
                                        a2: $scope.gameInfo.base.gameId,
                                        a3: utils.formatDate(new Date(), "yyyyMMddhhmmss")
                                    });
                                };
                                break;

                              case "400":
                                tip = downState = "进入游戏";
                                downStyle = true;
                                downHandler = function() {
                                    NativeApp.startupWebApp($scope.gameInfo, {
                                        action: "btn_entergame",
                                        a1: "lbxzfc",
                                        a2: $scope.gameInfo.base.gameId
                                    });
                                };
                                break;

                              case "1":
                                downState = "";
                                tip = "下载游戏";
                                display = false;
                                downHandler = angular.noop;
                                break;

                              default:
                                downState = "下载中...";
                                tip = "下载游戏";
                                downHandler = angular.noop;
                            }
                            var btnList = [ {
                                id: "close",
                                text: "关闭"
                            } ];
                            display && btnList.push({
                                id: "ok",
                                text: downState,
                                primary: downStyle
                            });
                            NativeApp.openWindow("/gift/giftModal.html", {
                                title: "领号成功",
                                content: encodeURIComponent('<div>兑换码已保存至"存号箱"。</div><p class="tips">请尽快' + tip + "使用，否则会进入淘号。</p>"),
                                codeList: encodeURIComponent(JSON.stringify(getCode(res.data.data))),
                                btnList: encodeURIComponent(JSON.stringify(btnList))
                            }, "blank", {
                                width: 280,
                                height: 300
                            }, function(btn) {
                                if ("ok" == btn.id) downHandler();
                            });
                        }); else NativeApp.openWindow("/gift/giftModal.html", {
                            title: "领号成功",
                            content: encodeURIComponent('<div>兑换码已保存至"存号箱"。</div><p class="tips">请尽快进入游戏使用，否则会进入淘号。</p>'),
                            codeList: encodeURIComponent(JSON.stringify(getCode(res.data.data))),
                            btnList: encodeURIComponent(JSON.stringify([ {
                                id: "close",
                                text: "关闭"
                            } ]))
                        }, "blank", {
                            width: 280,
                            height: 300
                        }); else $scope.handerError(res, true);
                    }); else {
                        console.log(">>>customCfg isLoading(getGift):" + $scope.customCfg.isLoading);
                        $scope.customCfg.isLoading = false;
                        if ($scope.item.needLogin && !NativeApp.isLogin()) {
                            NativeApp.addActionStat("btn_signindialog", "lbfh");
                            NativeApp.login({}, {
                                a1: "lbdltc"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) NativeApp.openWindow("/gift/thirdParty.html", {
                                    sceneId: $scope.item.sceneId,
                                    page: app.page
                                }, "", {
                                    width: 280,
                                    height: 300
                                });
                            });
                        } else NativeApp.openWindow("/gift/thirdParty.html", {
                            sceneId: $scope.item.sceneId,
                            page: app.page
                        }, "", {
                            width: 280,
                            height: 300
                        });
                    }
                };
                $scope.dredgeGift = function() {
                    console.log(">>>customCfg isLoading(dredgeGift):" + $scope.customCfg.isLoading);
                    var statInfo = $scope.getStatInfo({
                        action: "btn_diggift"
                    });
                    NativeApp.dredgeGift($scope.item, statInfo, function(res) {
                        console.log(">>>H5 res:" + JSON.stringify(res));
                        if (res.result) {
                            $scope.item.taoCount++;
                            if ($scope.gameInfo) NativeApp.getPackageState($scope.gameInfo, function(json) {
                                var tip = "";
                                var downState = "";
                                var downStyle = false;
                                var display = true;
                                var downHandler = angular.noop;
                                switch (String(json.data.state)) {
                                  case "0":
                                    tip = downState = "下载游戏";
                                    downStyle = true;
                                    downHandler = function() {
                                        NativeApp.startDownloadApp($scope.gameInfo, {
                                            action: "btn_down",
                                            a1: "lbxzfc",
                                            a2: $scope.gameInfo.base.gameId
                                        });
                                    };
                                    break;

                                  case "300":
                                  case "301":
                                    tip = downState = "打开游戏";
                                    downStyle = true;
                                    downHandler = function() {
                                        NativeApp.startupApp($scope.gameInfo, {
                                            action: "btn_open",
                                            a1: "lbxzfc",
                                            a2: $scope.gameInfo.base.gameId,
                                            a3: utils.formatDate(new Date(), "yyyyMMddhhmmss")
                                        });
                                    };
                                    break;

                                  case "400":
                                    tip = downState = "进入游戏";
                                    downStyle = true;
                                    downHandler = function() {
                                        NativeApp.startupWebApp($scope.gameInfo, {
                                            action: "btn_entergame",
                                            a1: "lbxzfc",
                                            a2: $scope.gameInfo.base.gameId
                                        });
                                    };
                                    break;

                                  case "1":
                                    downState = "";
                                    tip = "下载游戏";
                                    display = false;
                                    downHandler = angular.noop;
                                    break;

                                  default:
                                    tip = "下载游戏";
                                    downState = "下载中...";
                                    downHandler = angular.noop;
                                }
                                var btnList = [ {
                                    id: "close",
                                    text: "关闭"
                                } ];
                                display && btnList.push({
                                    id: "ok",
                                    text: downState,
                                    primary: downStyle
                                });
                                NativeApp.openWindow("/gift/giftModal.html", {
                                    title: "淘号成功",
                                    content: encodeURIComponent('<div>兑换码已保存至"存号箱"。</div><p class="tips">淘到的号不保证一定能兑换，请尽快' + tip + "使用。</p>"),
                                    codeList: encodeURIComponent(JSON.stringify(getCode(res.data.data))),
                                    btnList: encodeURIComponent(JSON.stringify(btnList))
                                }, "blank", {
                                    width: 280,
                                    height: 300
                                }, function(btn) {
                                    if ("ok" == btn.id) downHandler();
                                });
                            }); else NativeApp.openWindow("/gift/giftModal.html", {
                                title: "淘号成功",
                                content: encodeURIComponent('<div>兑换码已保存至"存号箱"。</div><p class="tips">淘到的号不保证一定能兑换，请尽快使用。</p>'),
                                codeList: encodeURIComponent(JSON.stringify(getCode(res.data.data)))
                            }, "blank", {
                                width: 280,
                                height: 300
                            });
                        } else $scope.handerError(res, true);
                        console.log(">>>customCfg isLoading(dredgeGift):" + $scope.customCfg.isLoading);
                    });
                };
                $scope.subscribeGift = function(statInfo, status) {
                    var statInfo = $scope.getStatInfo({
                        action: "btn_bookgift",
                        a1: statInfo ? statInfo.a1 : ""
                    });
                    if ("login" != status) NativeApp.addActionStat(statInfo.action, statInfo.a1, statInfo.a2, statInfo.a3);
                    NativeApp.subscribeGift($scope.item, {
                        content: "登录预订礼包"
                    }, statInfo, function(res) {
                        if (res.data && 5000014 == res.data.code) {
                            NativeApp.addActionStat("btn_signindialog", "lbfh");
                            NativeApp.login({}, {
                                a1: "lbdltc"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) $scope.subscribeGift(statInfo, "login");
                            });
                        } else if (res.result) NativeApp.openWindow("/modal.html", {
                            title: "预订成功",
                            content: encodeURIComponent("<div>获得优先领号权，可提前30分钟领号！请留意通知栏消息。</div>"),
                            btnList: encodeURIComponent(JSON.stringify([ {
                                id: "close",
                                text: "关闭"
                            } ]))
                        }, "blank", {
                            width: 280,
                            height: 300
                        }); else setTimeout(function() {
                            $scope.handerError(res, true);
                        }, 10);
                    });
                };
                $scope.unsubscribeGift = function() {
                    if ($scope.item.needLogin && !NativeApp.isLogin()) {
                        NativeApp.addActionStat("btn_signindialog", "lbfh");
                        NativeApp.login({}, {
                            a1: "lbdltc"
                        }, function(json) {
                            if (json.data && 1 == json.data.code) $scope.unsubscribeGift();
                        });
                    } else NativeApp.openWindow("/modal.html", {
                        title: "取消预订",
                        content: encodeURIComponent("<div>取消预订将失去优先领号特权哦，确定取消吗？</p>")
                    }, "blank", {
                        width: 280,
                        height: 300
                    }, function(btn) {
                        $scope.$apply(function() {
                            if ("ok" == btn.id) {
                                var statInfo = $scope.getStatInfo({
                                    action: "btn_unbookgift"
                                });
                                NativeApp.unsubscribeGift($scope.item, statInfo, function(res) {
                                    if (res.data && 5000014 == res.data.code) {
                                        NativeApp.addActionStat("btn_signindialog", "lbfh");
                                        NativeApp.login({}, {
                                            a1: "lbdltc"
                                        }, function(json) {
                                            if (json.data && 1 == json.data.code) NativeApp.unsubscribeGift($scope.item, statInfo, function(res) {
                                                if (res.result) NativeApp.showMessage("取消预订成功"); else $scope.handerError(res, true);
                                            });
                                        });
                                    } else if (res.result) NativeApp.showMessage("取消预订成功"); else $scope.handerError(res, true);
                                });
                            } else {
                                console.log(">>>customCfg isLoading(unsubscribeGift):" + $scope.customCfg.isLoading);
                                $scope.customCfg.isLoading = false;
                            }
                        });
                    });
                };
                $scope.getStatInfo = function(stat) {
                    var pageMapping = {
                        "gift.list": "lbfhyx",
                        "gift.activation": "jhm",
                        "gift.detail": "lbfhxq",
                        "gift.search": "lbfhss",
                        "game.gift.list": "zq_lb",
                        "game.detail": "zq_xq-lbfh"
                    };
                    var a1 = pageMapping[app.page];
                    if (!a1) return;
                    var statInfo = {
                        action: stat.action,
                        a1: stat.a1 || a1,
                        a2: $scope.item.sceneId,
                        a3: $scope.item.gameId
                    };
                    return statInfo;
                };
                var opt = $routeParams.opt;
                if ("gift.detail" == app.page) if ("subscribe" == opt) if ($scope.item.needLogin) NativeApp.changeAccount({
                    ucid: $routeParams.ucid,
                    nickName: $routeParams.nickName
                }, {
                    message: "预订礼包"
                }, function() {
                    $scope.subscribeGift({
                        a1: "lbfhxq_ymlq"
                    }, null);
                }); else $scope.subscribeGift(null, null); else if ("get" == opt) if ($scope.item.needLogin) NativeApp.changeAccount({
                    ucid: $routeParams.ucid,
                    nickName: $routeParams.nickName
                }, {
                    message: "领取礼包"
                }, function() {
                    $scope.getGift({
                        a1: "lbfhxq_ymlq"
                    }, null);
                }); else $scope.getGift(null, null);
            } ]
        };
    } ]);
});