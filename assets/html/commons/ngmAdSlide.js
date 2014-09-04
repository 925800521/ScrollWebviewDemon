define(function(require, exports, module) {
    "use strict";
    require("commons/Swipe");
    var app = angular.module("ngmApp");
    var attrCache = {};
    app.directive("ngmAdSlide", [ "$rootScope", "NativeApp", function($rootScope, NativeApp) {
        return {
            templateUrl: "modules/shared/imageSlide.tpl.html",
            controller: [ "$scope", "$rootScope", "$attrs", "$interval", "$timeout", "$location", "NativeApp", function($scope, $rootScope, $attrs, $interval, $timeout, $location, NativeApp) {
                var a1 = $attrs.a1 || "";
                var ada1 = $attrs.ada1 || "";
                var region = $attrs.region;
                var isExposureStat = $attrs.exposureStat;
                var isVisible = true;
                $scope.clickCarouselFn = function(item, index, adpId) {
                    item.alink = item.alink || item.url;
                    item.alink = item.alink.replace(/^cdetaillink\/netgamedetail.html\?gid=(\d+)/, "/game/detail.html?gameId=$1&pageType=game_detail");
                    item.alink = item.alink.replace(/^cdetaillink\/sipgamedetail.html\?gid=(\d+)/, "/game/detail.html?gameId=$1&pageType=game_detail");
                    item.alink = item.alink.replace(/^cdetaillink\/newsdetail.html\?gid=(\d+)&nid=(\d+)/, "/article/detail.html?gameId=$1&id=$2&pageType=game_article");
                    item.alink = item.alink.replace(/^specdetail.html\?colid=(\d+)/, "/album/detail.html?columnId=$1");
                    var params = {
                        a1: a1
                    };
                    var title = item.title || item.adWord;
                    if (title) angular.extend(params, {
                        title: encodeURIComponent(title)
                    });
                    if (adpId && item.admId) {
                        angular.extend(params, {
                            adpId: adpId,
                            admId: item.admId,
                            ada1: ada1
                        });
                        NativeApp.addActionStat("ad_click", ada1, item.gameId, "", adpId, item.admId);
                    }
                    if (region) NativeApp.addRegionStat(region, index + 1, "jdt");
                    NativeApp.openWindow(item.alink, params);
                };
                function $$get(id) {
                    return document.getElementById(id);
                }
                var imageInterval;
                var unwatchFn = $scope.$watch($attrs.ngmAdSlide, function(newValue) {
                    var carousel = newValue;
                    if (carousel) {
                        unwatchFn();
                        unwatchFn = void 0;
                        var width = NativeApp.getEnv("webview_dimension_width");
                        if (!width) width = document.documentElement.clientWidth;
                        var height = Math.round(.75 * width * (228 / 456));
                        var imageCount = carousel.length;
                        if (0 == imageCount) return;
                        var image_disabled = NativeApp.getConfig("image_disabled");
                        $scope.imageDisabled = image_disabled;
                        $scope.imageWidth = width;
                        $scope.imageHeight = height;
                        $scope.imageContainerWidth = imageCount * width;
                        $scope.selectedIndex = 0;
                        var sliderSwipe = null;
                        if (imageCount >= 1) $timeout(function() {
                            var t = $$get("imgSwipe");
                            sliderSwipe = new Swipe(t, {
                                startSlide: 0,
                                auto: 5e3,
                                speed: 300,
                                callback: function(index, w) {
                                    var nav = $$get("change_img_nav"), arr = nav.getElementsByClassName("active");
                                    arr.length && arr[0].classList.remove("active");
                                    nav.getElementsByTagName("li")[index].classList.add("active");
                                    if (isExposureStat && isVisible) {
                                        var slider = $$get("ad_carousel");
                                        if (slider) {
                                            var sliderHeight = slider.getBoundingClientRect().top;
                                            if (Math.abs(sliderHeight) < height) {
                                                var currentElement, currentElementName = "jdt_image_" + index;
                                                currentElement = $$get(currentElementName);
                                                if (!currentElement) return;
                                                var gameId, adpId, admId;
                                                if (attrCache[currentElementName]) {
                                                    gameId = attrCache[currentElementName].gameId;
                                                    adpId = attrCache[currentElementName].adpId;
                                                    admId = attrCache[currentElementName].admId;
                                                } else {
                                                    gameId = currentElement.getAttribute("gameId") || "";
                                                    adpId = currentElement.getAttribute("adpId") || "";
                                                    admId = currentElement.getAttribute("admId") || "";
                                                    attrCache[currentElementName] = {
                                                        gameId: gameId,
                                                        adpId: adpId,
                                                        admId: admId
                                                    };
                                                }
                                                if (0 == gameId) gameId = "";
                                                if (ada1 && adpId && admId) NativeApp.addActionStat("ad_show", ada1, gameId, "", adpId, admId);
                                            }
                                        }
                                    }
                                }
                            });
                            t.addEventListener("touchend", function(e) {
                                if (imageInterval) $interval.cancel(imageInterval);
                                if (imageCount > 1) imageInterval = $interval(function() {
                                    sliderSwipe.next();
                                }, 5e3);
                            }, false);
                        }, 0);
                    }
                    NativeApp.registerEvent(NativeApp.EVENT_WEBVIEW_VISIBLE_CHANGED);
                    $rootScope.$on(NativeApp.EVENT_WEBVIEW_VISIBLE_CHANGED, function(event, json) {
                        var currentVisible = json.visible || false;
                        if (isVisible != currentVisible) {
                            isVisible = currentVisible;
                            if (imageInterval) $interval.cancel(imageInterval);
                            if (isVisible) {
                                $scope.startStatTrigger(true);
                                if (imageCount > 1) imageInterval = $interval(function() {
                                    sliderSwipe.next();
                                }, 5e3);
                            } else if (imageCount > 1) sliderSwipe.stop();
                        }
                    });
                    NativeApp.registerEvent(NativeApp.EVENT_CONFIG_CHANGED);
                    $scope.$on(NativeApp.EVENT_CONFIG_CHANGED, function(type, data) {
                        var key = "image_disabled";
                        if (data.hasOwnProperty(key)) {
                            var hideImage = !!data[key];
                            if (hideImage) $scope.imageDisabled = 1; else $scope.imageDisabled = 0;
                        }
                    });
                });
            } ]
        };
    } ]);
});