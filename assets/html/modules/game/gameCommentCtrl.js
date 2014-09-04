define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("gameCommentCtrl", [ "$scope", "$rootScope", "$location", "$routeParams", "$http", "NativeApp", "Loader", function($scope, $rootScope, $location, $routeParams, $http, NativeApp, Loader) {
        var CACHE_MAX_AGE = 1e3 * 3600 * 24 * 7;
        var hostName = NativeApp.getServerUrl();
        var gameId = $routeParams.gameId;
        var userUUID = NativeApp.getEnv("uuid");
        if (isNaN(gameId)) {
            NativeApp.setWebViewState("error");
            return;
        }
        var initMark = function() {
            var mark = NativeApp.getCache("comment_mark_" + gameId);
            if (gameId && mark) {
                $scope.curIndex = mark - 1;
                setMarkStyle();
            } else {
                $scope.markStatus = "评分";
                $scope.chooseMark = function(index) {
                    $scope.curIndex = index;
                };
            }
        };
        var setMarkStyle = function() {
            $scope.chooseMark = null;
            $scope.doMark = null;
            $scope.markStatus = "已评";
            $scope.btnMarkClass = "-dis";
        };
        $scope.doMark = function(curIndex) {
            if (void 0 == curIndex) return;
            var score = curIndex + 1;
            var url = hostName + "/score.html";
            var params = {
                game_id: gameId,
                score: score,
                platform_id: 2
            };
            $scope.markStatus = "评分中..";
            NativeApp.addActionStat("btn_score", "xqy_pl", gameId, score);
            $http.get(url, {
                params: params
            }).success(function(data) {
                if (1 == data) {
                    setMarkStyle();
                    NativeApp.setCache("comment_mark_" + gameId, score, CACHE_MAX_AGE);
                    NativeApp.showMessage("评分成功");
                } else {
                    $scope.markStatus = "评分";
                    NativeApp.showMessage("评分失败");
                }
            }).error(function(data) {
                $scope.markStatus = "评分";
            });
        };
        var initPlayStyle = function() {
            var isPlay = NativeApp.getCache("comment_play_" + gameId);
            if ("" != isPlay && void 0 != isPlay) setPlayStyle(isPlay);
        };
        var setPlayStyle = function(isPlay) {
            if (isPlay) {
                $scope.playOkClass = " on";
                $scope.playNoClass = "";
            } else {
                $scope.playOkClass = "";
                $scope.playNoClass = " on";
            }
        };
        var initPlayInfo = function() {
            var config = {
                callbackId: "playInfo",
                service: "user.comment.getPlayableInfo",
                data: {
                    gameId: gameId
                },
                options: {
                    single: true
                }
            };
            Loader.request(config).then(function(response) {
                var playInfo = response.data.playInfo;
                if (playInfo) {
                    $scope.modelId = playInfo.modelId;
                    $scope.modelName = playInfo.modelName;
                    $scope.pkgId = playInfo.pkgId;
                    if ($scope.pkgId > 0) {
                        var enable = playInfo.enableCount || 0;
                        var disabled = playInfo.disableCount || 0;
                        var totalCount = enable + disabled;
                        if (totalCount > 9) {
                            var s = enable / totalCount;
                            var str = 100 * s.toFixed(2) + "%";
                            $scope.playDesc = "(" + str + "用户投票可以玩)";
                        }
                    }
                }
            });
        };
        $scope.doPlay = function(isPlay, playType, statActionName) {
            if (" on" == $scope.playOkClass || " on" == $scope.playNoClass) return;
            setPlayStyle(isPlay);
            var url = hostName + "/packageplayability.html";
            var playType = isPlay ? "1" : "-1";
            var params = {
                package_id: $scope.pkgId,
                model_id: $scope.modelId,
                play: playType,
                uuid: userUUID
            };
            $http.get(url, {
                params: params
            }).success(function(data) {
                $scope.played = true;
                NativeApp.setCache("comment_play_" + gameId, isPlay, CACHE_MAX_AGE);
                NativeApp.addActionStat(statActionName, "xqy_pl");
            });
        };
        function getCommentConfig(orderby) {
            return {
                topCommentList: {
                    service: "user.comment.getCommentList",
                    data: {
                        gameId: gameId,
                        istop: 1
                    },
                    page: {
                        page: 1,
                        size: 5
                    }
                },
                commentList: {
                    service: "user.comment.getCommentList",
                    data: {
                        gameId: gameId,
                        orderby: orderby
                    },
                    page: {
                        page: 1,
                        size: 10
                    },
                    options: {
                        pager: true
                    }
                }
            };
        }
        $scope.showComment = function(orderby) {
            $scope.commentList = [];
            $scope.orderby = orderby;
            Loader.clean();
            Loader.init({
                configList: getCommentConfig(orderby),
                onData: onPage
            });
            function onPage(response) {
                var data = response.data;
                if (response.page && 1 == response.page.commentList.currPage) {
                    var myComment = JSON.parse(NativeApp.getCache("comment_mycomment_" + gameId) || "[]");
                    var topCommentList = data.topCommentList.list || [];
                    $scope.commentList = [].concat(myComment).concat(topCommentList);
                }
                $scope.commentList = ($scope.commentList || []).concat(response.data.commentList.list);
            }
        };
        $scope.voteUp = function(comment) {
            if (comment) {
                var commentId = comment.id;
                var voted = NativeApp.getCache("comment_voted_" + commentId);
                if ("" == voted || void 0 == voted) {
                    NativeApp.setCache("comment_voted_" + commentId, "up", CACHE_MAX_AGE);
                    var url = hostName + "/support/" + commentId + ".html";
                    $http.get(url).success(function(data) {
                        comment.up++;
                        comment.voteUpClass = "on";
                    });
                }
            }
        };
        $scope.voteDown = function(comment) {
            if (comment) {
                var commentId = comment.id;
                var voted = NativeApp.getCache("comment_voted_" + commentId);
                if ("" == voted || void 0 == voted) {
                    NativeApp.setCache("comment_voted_" + commentId, "down", CACHE_MAX_AGE);
                    var url = hostName + "/unsupport/" + comment.id + ".html";
                    $http.get(url).success(function(data) {
                        comment.down++;
                        comment.voteDownClass = "on";
                    });
                }
            }
        };
        $scope.setMyVoteStyle = function(comment) {
            var voted = NativeApp.getCache("comment_voted_" + comment.id);
            if ("up" == voted) {
                comment.up = comment.up + 1;
                comment.voteUpClass = "on";
            } else if ("down" == voted) {
                comment.down = comment.down + 1;
                comment.voteDownClass = "on";
            }
        };
        NativeApp.registerEvent(NativeApp.EVENT_COMMENT_ADDED, function(type, data) {
            var myNewComment = {
                createTime: data.createTime,
                nickName: "我",
                comment: data.comment,
                modelType: data.modelType,
                up: 0,
                down: 0,
                hideVote: true
            };
            $scope.$apply(function() {
                $scope.commentList.unshift(myNewComment);
            });
            NativeApp.setCache("comment_mycomment_" + gameId, JSON.stringify(myNewComment), CACHE_MAX_AGE);
        });
        var initialize = function() {
            initMark();
            initPlayStyle();
            initPlayInfo();
            $scope.showComment(0);
        };
        initialize();
    } ]);
});