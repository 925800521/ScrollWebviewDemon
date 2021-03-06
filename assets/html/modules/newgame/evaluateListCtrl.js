define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("evaluateListCtrl", [ "NativeApp", "Loader", function(NativeApp, Loader) {
        var vm = this;
        vm.articleList = [];
        NativeApp.setNavTitle("评测");
        Loader.initPager({
            callbackId: "articleList",
            service: "article.basic.list",
            data: {
                fid: 7,
                hasextern: 1
            },
            options: {
                pager: true
            }
        }, function(response) {
            Array.prototype.push.apply(vm.articleList, response.data.articleList.list);
        });
        vm.goArticleDetail = function(item, type) {
            NativeApp.openWindow("/article/detail.html", {
                gameId: item.gameId,
                id: item.id,
                type: type,
                a1: "pc"
            }, "game_article");
        };
    } ]);
});