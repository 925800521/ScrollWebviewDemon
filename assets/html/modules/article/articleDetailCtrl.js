define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("articleDetailCtrl", [ "$rootScope", "$scope", "$routeParams", "$sce", "NativeApp", "Loader", "Utils", "GameService", "Video", function($rootScope, $scope, $routeParams, $sce, NativeApp, Loader, Utils, GameService, Video) {
        $rootScope.bgColor = "#FFF";
        $scope.followClass = "btns";
        var from = $routeParams.from;
        var id = $routeParams.articleId || $routeParams.id || $routeParams.nid;
        var type = $routeParams.type;
        var gameId = $routeParams.gameId || $routeParams.gid;
        var action = $routeParams.action || "detail_news";
        var a1 = $routeParams.a1;
        var a2 = $routeParams.a2 || id;
        var a3 = $routeParams.a3 || "";
        var ada1 = $routeParams.ada1;
        var adpId = $routeParams.adpId;
        var admId = $routeParams.admId;
        var opt = $routeParams.opt;
        var ucid = $routeParams.ucid;
        var nickName = $routeParams.nickName;
        var typeArray = {
            guide: {
                id: 1,
                name: "攻略",
                shareTitle: "我在九游发现完美攻略"
            },
            news: {
                id: 2,
                name: "新闻",
                shareTitle: "我在九游发现劲爆信息"
            },
            activity: {
                id: 3,
                name: "活动",
                shareTitle: "九游活动奖品多多"
            },
            evaluate: {
                id: 4,
                name: "评测",
                shareTitle: "我在九游发现一个精彩的游戏评测"
            },
            reference: {
                id: 5,
                name: "指引",
                shareTitle: "我在九游发现劲爆信息"
            },
            broke: {
                id: 6,
                name: "新游爆料",
                shareTitle: "我在九游发现一条精彩的游戏爆料"
            },
            evaluateList: {
                id: 7,
                name: "新游评测",
                shareTitle: "我在九游发现一个精彩的游戏评测"
            }
        };
        var typeMapping = {
            1: "guide",
            2: "news",
            3: "activity",
            4: "evaluate",
            5: "reference",
            6: "broke",
            7: "evaluateList"
        };
        if (/^\d+$/.test(type)) type = typeMapping[type];
        var currentType = typeArray[type] || typeArray["news"];
        NativeApp.setNavTitle(currentType.name + "详情");
        var config = {
            articleInfo: {
                service: "article.basic.getDetail",
                data: {
                    nid: id
                },
                options: {
                    single: true,
                    required: true,
                    cache: 24 * 3600
                }
            }
        };
        var gameInfoConfig = {
            service: "game.basic.data.getDetail",
            data: {
                gameId: gameId
            },
            page: {
                size: 1
            },
            options: {
                single: true,
                transformResponse: GameService.format,
                cache: 24 * 3600
            }
        };
        var isClient = "client" == from;
        if (!isClient && gameId) config.gameInfo = gameInfoConfig; else if (a1) NativeApp.addActionStat(action, a1, a2, a3);
        var articleListConfig = {
            service: "article.basic.list",
            data: {
                gameId: gameId,
                fid: currentType.id,
                outids: id
            },
            page: {
                size: 4
            }
        };
        if (!isClient && type) config.articleList = articleListConfig;
        Loader.initOnce(config, function(response) {
            var articleInfo = response.data.articleInfo;
            articleInfo.content = Utils.htmlDecode(articleInfo.content);
            $scope.articleInfo = articleInfo;
            if (articleInfo && articleInfo.content) Video.getJSONInContent(articleInfo.content, function(data) {
                if (data) {
                    articleInfo.content = Video.inject(articleInfo.content);
                    Video.getVideoUrl(data, function(url, data) {
                        Video.replace(url);
                    }, function(data) {
                        console.log(error, data);
                    });
                }
            });
            processData(response.data);
            function processData(data) {
                if (data.gameInfo) {
                    $scope.gameInfo = data.gameInfo;
                    var statInfo = [ {
                        a1: "zxxq",
                        a2: gameId,
                        a3: a3
                    } ];
                    if (ada1 && adpId && admId) statInfo.push({
                        a1: ada1,
                        a2: gameId,
                        a3: "",
                        ad_position: adpId,
                        ad: admId
                    });
                    NativeApp.setPackageInfo($scope.gameInfo, statInfo);
                    if (!$scope.gameInfo.base.isSimple) if ("follow" == opt) NativeApp.autoFollowApp($scope.gameInfo, {
                        opt: opt,
                        ucid: ucid,
                        nickName: nickName
                    }, {
                        action: "btn_bookonlinegame",
                        a1: "ymlq",
                        a2: $scope.gameInfo.base.gameId
                    });
                    if (a1) NativeApp.addActionStat(action, a1, a2, a3 || gameId);
                }
                $scope.typeName = currentType.name;
                $scope.articleList = data.articleList ? data.articleList.list : [];
                var icon = "";
                if ($scope.gameInfo && $scope.gameInfo.base) icon = $scope.gameInfo.base.gameIcon;
                NativeApp.setFavoriteInfo({
                    title: $scope.articleInfo.title,
                    gameId: gameId,
                    gameName: $scope.gameInfo ? $scope.gameInfo.base.gameName : "",
                    logo: icon,
                    url: "/article/detail.html?gameId=" + gameId + "&id=" + id + "&pageType=game_article"
                }, {
                    action: "btn_collet",
                    a1: "zxxq_all",
                    a2: id,
                    a3: gameId
                });
                NativeApp.setShareInfo({
                    title: $scope.articleInfo.title || currentType.shareTitle,
                    content: Utils.removeHtml($scope.articleInfo.summary) || "手机游戏尽在九游",
                    shareUrl: "http://a.9game.cn/news/" + id + ".html",
                    imgUrl: icon,
                    iconUrl: icon,
                    adWord: "手机游戏尽在九游",
                    adUrl: "http://app.9game.cn/?ch=KD_3",
                    platform: ""
                }, {
                    action: "btn_share",
                    a1: "zxxq_all",
                    a2: gameId
                });
            }
            var secondConfig = {};
            if (!isClient && !gameId && articleInfo.gameId) {
                gameId = articleInfo.gameId;
                gameInfoConfig.data.gameId = articleInfo.gameId;
                secondConfig.gameInfo = gameInfoConfig;
                if (!type) {
                    type = typeMapping[articleInfo.cateId] || "news";
                    currentType = typeArray[type] || typeArray["news"];
                    articleListConfig.data.gameId = articleInfo.gameId;
                    articleListConfig.data.fid = currentType.id;
                    secondConfig.articleList = articleListConfig;
                    NativeApp.setNavTitle(currentType.name + "详情");
                }
                var secondPromise = Loader.request(secondConfig).then(function(secondResponse) {
                    processData(secondResponse.data);
                });
                return secondPromise;
            }
        });
        $scope.goGameDetail = function(gameInfo) {
            NativeApp.openWindow("/game/detail.html", {
                gameId: gameInfo.base.gameId
            }, "game_detail");
        };
        $scope.goArticleDetail = function(articleInfo) {
            NativeApp.openWindow("/article/detail.html", {
                gameId: gameId,
                id: articleInfo.id,
                type: type,
                action: "detail_news",
                a1: "zxxq"
            }, "game_article");
        };
    } ]);
    app.factory("Video", [ "$http", function($http) {
        var Base64 = {
            decode: function(c) {
                var d, a, b, e, h, k = 0, g = 0;
                e = "";
                var j = [];
                if (!c) return c;
                c += "";
                do d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), 
                a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), 
                e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), 
                h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), 
                b = d << 18 | a << 12 | e << 6 | h, d = b >> 16 & 255, a = b >> 8 & 255, b &= 255, 
                64 == e ? j[g++] = String.fromCharCode(d) : 64 == h ? j[g++] = String.fromCharCode(d, a) : j[g++] = String.fromCharCode(d, a, b); while (k < c.length);
                return e = j.join("");
            },
            encode: function(c) {
                var d, a, b, e, h = 0, k = 0, g = "", g = [];
                if (!c) return c;
                c = this.utf8_encode(c + "");
                do d = c.charCodeAt(h++), a = c.charCodeAt(h++), b = c.charCodeAt(h++), e = d << 16 | a << 8 | b, 
                d = e >> 18 & 63, a = e >> 12 & 63, b = e >> 6 & 63, e &= 63, g[k++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e); while (h < c.length);
                g = g.join("");
                switch (c.length % 3) {
                  case 1:
                    g = g.slice(0, -2) + "==";
                    break;

                  case 2:
                    g = g.slice(0, -1) + "=";
                }
                return g;
            }
        };
        var VIDEO_MIN = "video_1";
        var VIDEO_MED = "video_2";
        var VIDEO_MAX = "video_3";
        var RATIO = 9 / 16;
        var HEIGHT = Math.min(document.documentElement.clientWidth * RATIO, 640 * RATIO);
        return {
            getJSONInContent: function(html, callback) {
                if (/(?:letvcloud_player_conf\s*?=\s*?)(\{.*?\})/gi.test(html)) {
                    var match = RegExp.$1.match(/['"](?:uu|vu)['"]\s*?:\s*?['"](.*?)['"]/g);
                    callback(JSON.parse([ "{", match.join(","), "}" ].join("")));
                }
                callback(null);
            },
            getVideoUrl: function(data, succ, fail) {
                var url = "http://api.letvcloud.com/gpc.php?cf=html5&sign=signxxxxx&ver=2.0&format=jsonp&callback=JSON_CALLBACK";
                url += [ "&vu=", data.vu, "&uu=", data.uu ].join("");
                $http.jsonp(url).success(function(data, status, headers, config) {
                    succ && succ(Base64.decode(data.data["video_list"][VIDEO_MIN].main_url), data);
                }).error(function(data, status, headers, config) {
                    fail && fail(data);
                });
            },
            inject: function(html) {
                var regExp = /<div\s+style=".*?">([^<]*<script[^>]+>.*?<\/script>)+.*?<\/div>/gi;
                if (regExp.test(html)) return html.replace(regExp, '<div id="videoContainer" style="height:' + HEIGHT + 'px"></div>');
                return html;
            },
            replace: function(url) {
                var dom = document.getElementById("videoContainer");
                var tmpl = [ "<div >", '<div  style="width: 100%; height: ', HEIGHT, 'px;">', '<video controls="controls" poster="" preload="none" type="video/mp4" ', ' style="width: 100%; height: ', HEIGHT, 'px;background: black; -webkit-transform: translate3d(0, 0, 0);">', '<source src="${url}" />', "</video>", '<div id=""></div>', "</div>", "</div>" ].join("");
                if (dom) dom.innerHTML = tmpl.replace("${url}", url);
            }
        };
    } ]);
});