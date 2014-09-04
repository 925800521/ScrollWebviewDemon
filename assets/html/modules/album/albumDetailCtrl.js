define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("albumDetailCtrl", [ "$scope", "$routeParams", "$sce", "NativeApp", "Loader", "GameService", function($scope, $routeParams, $sce, NativeApp, Loader, GameService) {
        var columnId = $routeParams.id || $routeParams.columnId || $routeParams.colid || 2000563;
        var action = $routeParams.action || "detail_topic";
        var a1 = $routeParams.a1;
        var a2 = $routeParams.a2 || columnId;
        var a3 = $routeParams.a3 || "";
        NativeApp.setNavTitle($routeParams.title || "专题详情");
        NativeApp.addActionStat(action, a1, a2, a3);
        if ("msg" == $routeParams.from) $scope.statInfo = {
            a1: "zt_xx",
            a3: columnId
        }; else $scope.statInfo = {
            a1: "zt",
            a3: columnId
        };
        $scope.specailInfoField = "downloadTotal";
        $scope.gameScoreInstructDesc = "instruction";
        $scope.hideImage = !!parseInt(NativeApp.getConfig("image_disabled"));
        if ($scope.hideImage) $scope.noImageHeight = NativeApp.getDefaultImageSize().height;
        $scope.gameList = [];
        var configList = [ {
            albumInfo: {
                service: "op.collection.album.getDetailInfo",
                data: {
                    columnId: columnId
                },
                options: {
                    single: true,
                    required: true
                }
            },
            gameList: {
                service: "op.collection.album.getGameList",
                data: {
                    columnId: columnId,
                    extReview: 1
                },
                options: {
                    transformResponse: GameService.format,
                    pager: true
                }
            }
        }, {
            callbackId: "crossAlbumList",
            service: "op.collection.album.getCrossList",
            data: {
                columnId: columnId
            },
            page: {
                size: 3
            }
        } ];
        Loader.init({
            configList: configList,
            onData: onData
        });
        function onData(response) {
            if (response.data.albumInfo) $scope.albumInfo = response.data.albumInfo;
            if (response.data.gameList) Array.prototype.push.apply($scope.gameList, response.data.gameList);
            if (response.data.crossAlbumList) $scope.crossAlbumList = response.data.crossAlbumList.list;
        }
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId,
                a1: "zt",
                a3: columnId
            }, "game_detail");
        };
        $scope.goCrossAlbumDetail = function(album) {
            NativeApp.openWindow("/album/detail.html", {
                id: album.id,
                posid: album.posId,
                title: encodeURIComponent(album.name),
                a1: "ztxq"
            }, "self");
        };
        $scope.goAlbum = function() {
            NativeApp.openWindow("/album/list.html", {
                action: "btn_getmore",
                a1: "ztxq"
            }, "common");
        };
    } ]);
});