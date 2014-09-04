define(function(require, exports, module) {
    "use strict";
    require("../shared/dialog");
    var app = angular.module("ngmApp");
    app.controller("grabGiftCtrl", [ "$scope", "NativeApp", "Loader", "Dialog", function($scope, NativeApp, Loader, Dialog) {
        var config = {
            callbackId: "gameGiftList",
            service: "op.ka.gift.listByCategory",
            data: {
                categoryId: 0,
                giftCount: 2
            },
            page: {
                size: 15
            },
            options: {
                pager: true
            }
        };
        $scope.gameGiftList = [];
        Loader.initPager(config, function(response) {
            console.log(response);
            Array.prototype.push.apply($scope.gameGiftList, response.data.gameGiftList.list);
            Dialog.toastLogin();
        });
        $scope.toList = function(item, $index) {
            NativeApp.addActionStat("btn_gamegiftlist", "qlb", item.game.id);
            NativeApp.openWindow("/gift/list.html", {
                gameId: item.game.id,
                gameName: item.game.name
            }, "game_article");
        };
    } ]);
});