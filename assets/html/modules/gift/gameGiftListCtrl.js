define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("gameGiftListCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", function($scope, NativeApp, Loader, $routeParams) {
        var configMapping = {
            1: {
                name: "新服礼包",
                stat: {
                    a1: "xflb"
                }
            },
            3: {
                name: "特权礼包",
                stat: {
                    a1: "tqlb"
                }
            }
        };
        var categoryId = $routeParams.categoryId;
        var category = configMapping[categoryId];
        if (category) {
            NativeApp.setNavTitle(category.name);
            var config = {
                callbackId: "gameGiftList",
                service: "op.ka.gift.listByCategory",
                data: {
                    categoryId: categoryId,
                    giftCount: 2
                },
                page: {
                    size: 10
                },
                options: {
                    pager: true
                }
            };
            $scope.gameGiftList = [];
            Loader.initPager(config, function(response) {
                Array.prototype.push.apply($scope.gameGiftList, response.data.gameGiftList.list);
            });
            $scope.toList = function(item, $index) {
                NativeApp.openWindow("/gift/list.html", {
                    a1: category.stat.a1,
                    gameId: item.game.id,
                    gameName: item.game.name
                }, "game_article");
            };
        } else {
            console.error("categoryId参数错误,正确值为1或者3,实际值为" + categoryId);
            NativeApp.setWebViewState("error");
        }
    } ]);
});