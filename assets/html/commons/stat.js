define(function(require, exports, module) {
    "use strict";
    var EventUtil = {
        addHandler: function(element, type, handler) {
            if (element.addEventListener) element.addEventListener(type, handler, false); else if (element.attachEvent) element.attachEvent("on" + type, handler); else element["on" + type] = handler;
        }
    };
    function isElementVisible(element) {
        var e = element;
        if (!e) return false;
        var browserViewHeight = window.innerHeight || document.documentElement.clientHeight;
        var rect = e.getBoundingClientRect();
        var elementTopHeight = rect.top;
        var elementHeight = e.offsetHeight;
        if (elementTopHeight >= 0) {
            if (elementTopHeight + 8 < browserViewHeight) return true;
        } else if (Math.abs(elementTopHeight) + 8 < elementHeight) return true;
        return false;
    }
    var cacheList = [], cacheStatusList = [];
    function startStat(areaArr, stat, NativeApp) {
        var t = +new Date();
        var ulList = [];
        var areaLength = areaArr.length;
        for (var k = 0; k < areaLength; k++) {
            var areaId = areaArr[k];
            var domArea = document.getElementById(areaId);
            if (!domArea) continue;
            if (cacheList[areaId]) ulList = cacheList[areaId]; else {
                if ("ad_carousel" == areaId) ulList.push(domArea); else if ("ad_market" == areaId || "ad_daily_one" == areaId) ulList = domArea.getElementsByTagName("img"); else ulList = domArea.getElementsByTagName("li");
                cacheList[areaId] = ulList;
            }
        }
        var len = ulList.length;
        for (var i = 0; i < len; i++) {
            var currentVisibleStatus = isElementVisible(ulList[i]);
            var currentElement = ulList[i];
            if ("ad_carousel" == areaId) {
                var selectedIndex = domArea.getAttribute("selectedIndex");
                if (!isNaN(selectedIndex)) {
                    currentElement = document.getElementById("jdt_image_" + selectedIndex);
                    if (!currentElement) continue;
                }
            }
            var gameId = currentElement.getAttribute("gameId") || "";
            var adpId = currentElement.getAttribute("adpId") || "";
            var admId = currentElement.getAttribute("admId") || "";
            if (0 == gameId) gameId = "";
            if (adpId && admId) {
                var key = areaId + "_" + adpId + "_" + admId;
                var cacheObj = cacheStatusList[key];
                if (cacheObj) {
                    var lastVisibleStatus = cacheObj.isVisible;
                    if (!lastVisibleStatus && currentVisibleStatus) NativeApp.batchAddActionStat(stat.action, stat.a1, gameId, "", adpId, admId);
                    cacheObj.isVisible = currentVisibleStatus;
                    cacheStatusList[key] = cacheObj;
                } else if (currentVisibleStatus) {
                    cacheStatusList[key] = {
                        isVisible: currentVisibleStatus
                    };
                    NativeApp.batchAddActionStat(stat.action, stat.a1, gameId, "", adpId, admId);
                }
            }
        }
    }
    exports.startStat = function(areaArr, stat, NativeApp, isReset) {
        if (isReset) {
            cacheStatusList = [];
            startStat(areaArr, stat, NativeApp);
        } else {
            setTimeout(function() {
                startStat(areaArr, stat, NativeApp);
            }, 300);
            EventUtil.addHandler(window, "scroll", function() {
                startStat(areaArr, stat, NativeApp);
            });
        }
    };
});