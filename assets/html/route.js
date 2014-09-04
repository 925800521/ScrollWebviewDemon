!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmApp");
    var route = {
        "/category": {
            name: "分类",
            controller: "categoryCtrl",
            controllerUrl: "modules/category/categoryCtrl.js",
            templateUrl: "modules/category/category.tpl.html"
        },
        "/category/detail": {
            name: "分类详情",
            controller: "categoryDetailCtrl",
            controllerUrl: "modules/category/categoryDetailCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/rank": {
            name: "排行",
            controller: "rankCtrl",
            controllerUrl: "modules/rank/rankCtrl.js",
            templateUrl: "modules/rank/rank.tpl.html"
        },
        "/newgame": {
            name: "新游专区",
            controller: "newgameCtrl",
            controllerUrl: "modules/newgame/newgameCtrl.js",
            templateUrl: "modules/newgame/newgame.tpl.html"
        },
        "/newgame/category": {
            name: "新游分类",
            controller: "categoryCtrl",
            controllerUrl: "modules/category/categoryCtrl.js",
            templateUrl: "modules/category/categoryList.tpl.html"
        },
        "/newgame/brokeList": {
            name: "新游爆料列表",
            controller: "brokeListCtrl",
            controllerUrl: "modules/newgame/brokeListCtrl.js",
            templateUrl: "modules/newgame/brokeList.tpl.html"
        },
        "/newgame/evaluateList": {
            name: "评测列表",
            controller: "evaluateListCtrl",
            controllerUrl: "modules/newgame/evaluateListCtrl.js",
            templateUrl: "modules/newgame/evaluateList.tpl.html"
        },
        "/newgame/expectList": {
            name: "新游期待榜列表",
            controller: "expectListCtrl",
            controllerUrl: "modules/newgame/expectListCtrl.js",
            templateUrl: "modules/newgame/expectList.tpl.html"
        },
        "/newgame/latestGameList": {
            name: "新游最新专区列表",
            controller: "latestGameListCtrl",
            controllerUrl: "modules/newgame/latestGameListCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/netgame": {
            name: "网游",
            controller: "netgameCtrl",
            controllerUrl: "modules/netgame/netgameCtrl.js",
            templateUrl: "modules/netgame/netgame.tpl.html"
        },
        "/netgame/event": {
            name: "开服开测",
            controller: "netgameEventCtrl",
            controllerUrl: "modules/netgame/netgameEventCtrl.js",
            templateUrl: "modules/netgame/netgameEvent.tpl.html"
        },
        "/netgame/category": {
            name: "网游分类",
            controller: "categoryCtrl",
            controllerUrl: "modules/category/categoryCtrl.js",
            templateUrl: "modules/category/categoryList.tpl.html"
        },
        "/netgame/pastCommend": {
            name: "往期推荐列表",
            controller: "pastCommendListCtrl",
            controllerUrl: "modules/shared/gameList.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/netgame/subject": {
            name: "网游题材详情",
            controller: "netGameCategoryDetailCtrl",
            controllerUrl: "modules/netgame/categoryDetailCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/gift": {
            name: "礼包领取",
            controller: "giftIndexCtrl",
            controllerUrl: "modules/gift/giftIndexCtrl.js",
            templateUrl: "modules/gift/giftIndex.tpl.html"
        },
        "/gift/list": {
            name: "某游戏的礼包列表",
            controller: "giftListCtrl",
            controllerUrl: "modules/gift/giftListCtrl.js",
            templateUrl: "modules/gift/giftList.tpl.html"
        },
        "/gift/gameGiftList": {
            name: "更多礼包列表",
            controller: "gameGiftListCtrl",
            controllerUrl: "modules/gift/gameGiftListCtrl.js",
            templateUrl: "modules/shared/gameGiftList.tpl.html"
        },
        "/gift/detail": {
            name: "礼包详情",
            controller: "giftDetailCtrl",
            controllerUrl: "modules/gift/giftDetailCtrl.js",
            templateUrl: "modules/gift/giftDetail.tpl.html"
        },
        "/gift/thirdParty": {
            name: "中转发号",
            controller: "thirdPartyCtrl",
            controllerUrl: "modules/gift/thirdPartyCtrl.js",
            templateUrl: "modules/gift/thirdParty.tpl.html"
        },
        "/gift/giftModal": {
            name: "礼包弹窗",
            controller: "giftModalCtrl",
            controllerUrl: "modules/gift/giftModalCtrl.js",
            templateUrl: "modules/gift/giftModal.tpl.html"
        },
        "/gift/grabGift": {
            name: "抢礼包",
            controller: "grabGiftCtrl",
            controllerUrl: "modules/gift/grabGiftCtrl.js",
            templateUrl: "modules/gift/grabGift.tpl.html"
        },
        "/gift/activation": {
            name: "激活码",
            controller: "activationCtrl",
            controllerUrl: "modules/gift/activationCtrl.js",
            templateUrl: "modules/gift/activation.tpl.html"
        },
        "/gift/myGift": {
            name: "存号箱",
            controller: "myGiftCtrl",
            controllerUrl: "modules/gift/myGiftCtrl.js",
            templateUrl: "modules/gift/myGift.tpl.html"
        },
        "/gift/test": {
            name: "礼包弹窗",
            controller: "test",
            controllerUrl: "modules/gift/test.js",
            templateUrl: "modules/gift/test.tpl.html"
        },
        "/gift/search": {
            name: "礼包搜索列表页",
            controller: "giftSearchCtrl",
            controllerUrl: "modules/gift/giftSearchCtrl.js",
            templateUrl: "modules/gift/giftSearch.tpl.html"
        },
        "/game/detail": {
            name: "游戏详情",
            controller: "gameDetailCtrl",
            controllerUrl: "modules/game/gameDetailCtrl.js",
            templateUrl: "modules/game/gameDetail.tpl.html"
        },
        "/game/comment": {
            name: "游戏评论",
            controller: "gameCommentCtrl",
            controllerUrl: "modules/game/gameCommentCtrl.js",
            templateUrl: "modules/game/gameComment.tpl.html"
        },
        "/article/detail": {
            name: "资讯详情",
            controller: "articleDetailCtrl",
            controllerUrl: "modules/article/articleDetailCtrl.js",
            templateUrl: "modules/article/articleDetail.tpl.html"
        },
        "/article/list": {
            name: "资讯列表",
            controller: "articleListCtrl",
            controllerUrl: "modules/article/articleListCtrl.js",
            templateUrl: "modules/article/articleList.tpl.html"
        },
        "/article/topicList": {
            name: "每日一聊",
            controller: "topicListCtrl",
            controllerUrl: "modules/article/topicListCtrl.js",
            templateUrl: "modules/article/topicList.tpl.html"
        },
        "/collection/recommend": {
            name: "每日一荐",
            controller: "recommendCtrl",
            controllerUrl: "modules/collection/recommendCtrl.js",
            templateUrl: "modules/rank/rank.tpl.html"
        },
        "/collection/crack": {
            name: "破解频道",
            controller: "crackCtrl",
            controllerUrl: "modules/collection/crackCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/collection/newest": {
            name: "新游频道",
            controller: "newestCtrl",
            controllerUrl: "modules/collection/newestCtrl.js",
            templateUrl: "modules/collection/newest.tpl.html"
        },
        "/collection/worth": {
            name: "必玩频道",
            controller: "mustplayCtrl",
            controllerUrl: "modules/collection/mustplayCtrl.js",
            templateUrl: "modules/collection/mustplay.tpl.html"
        },
        "/collection/excellent": {
            name: "优质频道",
            controller: "excellentCtrl",
            controllerUrl: "modules/collection/excellentCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/album/list": {
            name: "专辑列表",
            controller: "albumListCtrl",
            controllerUrl: "modules/album/albumListCtrl.js",
            templateUrl: "modules/album/albumList.tpl.html"
        },
        "/album/detail": {
            name: "专辑详情",
            controller: "albumDetailCtrl",
            controllerUrl: "modules/album/albumDetailCtrl.js",
            templateUrl: "modules/album/albumDetail.tpl.html"
        },
        "/search": {
            name: "搜索结果",
            controller: "searchCtrl",
            controllerUrl: "modules/search/searchCtrl.js",
            templateUrl: "modules/search/search.tpl.html"
        },
        "/game/info": {
            name: "专区游戏基本信息",
            controller: "gameInfoCtrl",
            controllerUrl: "modules/game/gameInfoCtrl.js",
            templateUrl: "modules/game/gameInfo.tpl.html"
        },
        "/game/guide": {
            name: "专区攻略",
            controller: "gameGuideCtrl",
            controllerUrl: "modules/game/gameGuideCtrl.js",
            templateUrl: "modules/game/gameGuide.tpl.html"
        },
        "/game/gift": {
            name: "专区礼包",
            controller: "gameGiftCtrl",
            controllerUrl: "modules/game/gameGiftCtrl.js",
            templateUrl: "modules/game/gameGift.tpl.html"
        },
        "/article/listType": {
            name: "资讯活动3个TAB页",
            controller: "articleListTypeCtrl",
            controllerUrl: "modules/article/articleListTypeCtrl.js",
            templateUrl: "modules/article/articleListType.tpl.html"
        },
        "/events/free": {
            name: "联通免流量活动",
            controller: "freeUnicomCtrl",
            controllerUrl: "modules/events/free/freeUnicomCtrl.js",
            templateUrl: "modules/events/free/freeUnicom.tpl.html"
        },
        "/modal": {
            name: "弹窗",
            controller: "modalCtrl",
            controllerUrl: "modules/shared/modalCtrl.js",
            templateUrl: "modules/shared/modal.tpl.html"
        },
        "/remote": {
            name: "远端页面测试",
            controller: "remoteCtrl",
            controllerUrl: "modules/remote/remoteCtrl.js",
            templateUrl: "modules/remote/remote.tpl.html"
        },
        "/remote/pageOpen": {
            name: "页面跳转",
            controller: "pageOpenCtrl",
            controllerUrl: "modules/remote/pageOpenCtrl.js",
            templateUrl: "modules/remote/pageOpen.tpl.html"
        },
        "/remote/submit": {
            name: "提交",
            controller: "submitCtrl",
            controllerUrl: "modules/remote/submitCtrl.js",
            templateUrl: "modules/remote/submit.tpl.html"
        },
        "/remote/dialog": {
            name: "dialog",
            controller: "dialogCtrl",
            controllerUrl: "modules/remote/dialogCtrl.js",
            templateUrl: "modules/remote/dialog.tpl.html"
        },
        "/remote/upgrade": {
            name: "升级",
            controller: "upgradeCtrl",
            controllerUrl: "modules/remote/upgradeCtrl.js",
            templateUrl: "modules/remote/upgrade.tpl.html"
        },
        "/remote/giftList": {
            name: "礼包",
            controller: "giftListCtrl",
            controllerUrl: "modules/remote/giftListCtrl.js",
            templateUrl: "modules/remote/giftList.tpl.html"
        },
        "/test/pager": {
            name: "测试分页",
            controller: "pagerTestCtrl",
            controllerUrl: "modules/test/pagerTestCtrl.js",
            templateUrl: "modules/test/pagerTest.tpl.html"
        },
        "/test/loader": {
            name: "测试加载",
            controller: "loaderTestCtrl",
            controllerUrl: "modules/test/loaderTestCtrl.js",
            templateUrl: "modules/test/loaderTest.tpl.html"
        },
        "/test/dataloader": {
            name: "测试加载",
            controller: "dataLoaderTestCtrl",
            controllerUrl: "modules/test/dataLoaderTestCtrl.js",
            templateUrl: "modules/test/loaderTest.tpl.html"
        },
        "/test/protocol": {
            name: "测试Protocol",
            controller: "protocolTestCtrl",
            controllerUrl: "modules/test/protocolTestCtrl.js",
            templateUrl: "modules/test/protocolTest.tpl.html"
        },
        "/test/cache": {
            name: "测试Cache",
            controller: "cacheTestCtrl",
            controllerUrl: "modules/test/cacheTestCtrl.js",
            templateUrl: "modules/test/cacheTest.tpl.html"
        },
        "/test/default": {
            name: "路由列表",
            controller: [ "$scope", function($scope) {
                $scope.route = route;
                angular.element(document.body).css("visibility", "visible");
                $scope.changeRoute = function(key) {
                    window.location.search = "route=" + key;
                };
            } ],
            template: [ '<div ng-repeat="(key, value) in route track by key">', "<ul>", '<li><a ng-click="changeRoute(key)">{{value.name || key}}</a></li>', "</ul>", "</div>" ].join("")
        }
    };
    var params = getURLParameters(global.location.href);
    var routePath = params["route"] ? params["route"].replace(/\.html$/, "") : "/test/default";
    var target = route[routePath] || route["/test/default"];
    params["$$routePath"] = routePath;
    app.value("$routeParams", params);
    app.run(function() {
        console.info("Route#init route: " + routePath, target, params);
    });
    if (target.controllerUrl) seajs.use(target.controllerUrl, function() {
        bootstrap();
    }); else bootstrap();
    function bootstrap() {
        if (!target.controllerUrl) {
            app.controller("defaultCtrl", target.controller);
            document.body.setAttribute("ng-controller", "defaultCtrl as " + (target.controllerAs || "vm"));
        } else document.body.setAttribute("ng-controller", target.controller + " as " + (target.controllerAs || "vm"));
        if (!target.templateUrl) document.getElementById("view").innerHTML = target.template; else document.getElementById("view").setAttribute("ng-include", "'" + target.templateUrl + "'");
        angular.bootstrap(document, [ "ngmApp" ]);
    }
    function getURLParameters(url, name) {
        var params = {};
        url.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function(m, key, value) {
            params[key] = decodeURIComponent(value);
        });
        return name ? params[name] : params;
    }
}(window);