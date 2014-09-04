define(function(require, exports, module) {
    "use strict";
    require("../shared/giftList");
    require("../shared/dialog");
    var app = angular.module("ngmApp");
    app.page = "gift.activation";
    app.controller("activationCtrl", [ "$scope", "NativeApp", "$routeParams", "$sce", "Dialog", "Loader", function($scope, NativeApp, $routeParams, $sce, Dialog, Loader) {
        NativeApp.setNavTitle("激活码");
        var config = {
            giftList: {
                service: "op.ka.basic.getLatestKaList",
                data: {
                    categeryId: 2
                },
                options: {
                    cache: 0,
                    pager: true
                }
            }
        };
        var lastTime = NativeApp.getCache("UCGC.activation.lastTime");
        var newActivationCount = NativeApp.getSession("UCGC.activation.newCount");
        if ("" === newActivationCount) config.activation = {
            service: "op.ka.basic.getIncrCount",
            categoryId: 2,
            lastTime: lastTime ? lastTime : null
        };
        Loader.init({
            configList: config,
            onInit: onInit,
            onData: onPage
        });
        function onInit(response) {
            if (response.data.activation) {
                var currTime = response.data.activation.currTime || new Date().getTime();
                NativeApp.setSession("UCGC.activation.newCount", 0);
                NativeApp.setCache("UCGC.activation.lastTime", currTime);
                NativeApp.triggerEvent(NativeApp.EVENT_GIFT_NEW_COUNT_CHANGED, {
                    categoryId: 2
                });
            }
            Dialog.toastLogin();
        }
        function onPage(response) {
            var list = response.data.giftList.list;
            $scope.giftList = ($scope.giftList || []).concat(list);
        }
    } ]);
});