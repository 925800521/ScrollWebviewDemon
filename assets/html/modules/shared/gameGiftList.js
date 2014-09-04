define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.directive("gameGiftList", [ "$location", "$rootScope", "NativeApp", function($location, $rootScope, NativeApp) {
        return {
            scope: {
                gameGiftList: "=gameGiftList"
            },
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                $scope.toList = function(item, $index, a1) {
                    NativeApp.openWindow("/gift/list.html", {
                        gameId: item.game.id,
                        gameName: item.game.name,
                        action: "btn_gamegiftlist",
                        a1: a1
                    }, "game_article");
                };
            } ],
            templateUrl: "modules/shared/gameGiftList.tpl.html"
        };
    } ]);
});