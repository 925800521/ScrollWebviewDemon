define(function(require, exports, module) {
    "use strict";
    require("commons/iscroll");
    require("commons/ngmScroller");
    require("commons/ngmMarquee");
    var app = angular.module("ngmApp");
    app.controller("gameInfoCtrl", [ "$scope", "$location", "$routeParams", "$sce", "$timeout", "NativeApp", "Loader", "GameService", "Utils", function($scope, $location, $routeParams, $sce, $timeout, NativeApp, Loader, GameService, Utils) {
        var notice = [ {
            id: 0,
            show: true,
            msg: "公告，有就那个，没有就那个"
        }, {
            id: 1,
            show: false,
            msg: "message, if there be exist."
        } ];
        var gameId = $routeParams.gameId;
        var config = {
            oldDiaryInfo: {
                service: "game.event.getListByGameId",
                data: {
                    gameId: gameId,
                    type: 1
                }
            },
            newDiaryInfo: {
                service: "game.event.getListByGameId",
                data: {
                    gameId: gameId,
                    type: 2
                }
            }
        };
        Loader.initOnce(config, function(response) {
            var data = response.data;
            if (data.oldDiaryInfo.list || data.newDiaryInfo.list) {
                var last = data.oldDiaryInfo.list || [];
                var future = data.newDiaryInfo.list || [];
                $scope.diary = _handleDiary(last.concat(future));
            }
        });
        $scope.notice = notice;
        function _handleDiary(diaryList) {
            console.info(diaryList);
            var YESTERDAY = 0;
            var TODAY = 1;
            var FUTURE = 2;
            var list = [];
            var begin = new Date();
            var end = new Date();
            var item;
            var date;
            var type;
            begin.setHours(0);
            begin.setMinutes(0);
            begin.setSeconds(0);
            begin.setMilliseconds(0);
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);
            end.setMilliseconds(999);
            for (var i = 0; i < diaryList.length; i++) {
                item = diaryList[i];
                date = new Date(item.beginTime);
                if (+date < +begin) type = YESTERDAY; else if (+date > +end) type = FUTURE; else type = TODAY;
                list[i] = {
                    type: type,
                    date: date.getFullYear() < begin.getFullYear() ? Utils.formatDate(date, "yyyy年MM月dd日") : Utils.formatDate(date, [ "MM月dd日", type == TODAY ? " hh:mm:ss" : "" ].join("")),
                    title: 1 == item.typeId ? [ item.type, item.title ].join(".") : item.title
                };
            }
            if (list.length >= 3) ; else ;
            return list;
        }
    } ]);
});