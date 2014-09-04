define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("albumListCtrl", [ "$scope", "$sce", "$routeParams", "NativeApp", "Loader", function($scope, $sce, $routeParams, NativeApp, Loader) {
        var action = $routeParams.action;
        var a1 = $routeParams.a1;
        var a2 = $routeParams.a2;
        if (action && a1 && a2) NativeApp.addActionStat(action, a1, a2);
        NativeApp.setNavTitle("专题大全");
        $scope.hideImage = !!parseInt(NativeApp.getConfig("image_disabled"));
        if ($scope.hideImage) $scope.noImageHeight = NativeApp.getDefaultImageSize().height;
        $scope.albumList = [];
        Loader.initPager({
            callbackId: "albumList",
            service: "op.collection.album.getNormalList",
            options: {
                required: true,
                pager: true
            }
        }, function(response) {
            Array.prototype.push.apply($scope.albumList, response.data.albumList.list);
        });
        $scope.goAlbumDetail = function(album) {
            NativeApp.openWindow("/album/detail.html", {
                id: album.id,
                posid: album.posId,
                title: encodeURIComponent(album.name),
                action: "detail_topic",
                a1: "ztlb"
            }, "common");
        };
    } ]);
});