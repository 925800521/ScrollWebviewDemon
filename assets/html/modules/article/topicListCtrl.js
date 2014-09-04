define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("topicListCtrl", [ "$scope", "$routeParams", "NativeApp", "Loader", function($scope, $routeParams, NativeApp, Loader) {
        NativeApp.setNavTitle("每日一聊");
        $scope.articleList = [];
        var config = {
            callbackId: "articleList",
            service: "article.basic.list",
            data: {
                fid: 8,
                hasextern: 1
            },
            options: {
                pager: true
            }
        };
        Loader.initPager(config, onPage);
        function onPage(response) {
            Array.prototype.push.apply($scope.articleList, response.data.articleList.list);
        }
        $scope.goArticleDetail = function(item) {
            NativeApp.addActionStat("detail_talk", "mryl", item.id);
            NativeApp.openWindow(item.url, {}, "browser");
        };
    } ]);
});