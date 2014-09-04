define(function(require, exports, module) {
    "use strict";
    require("../../framework/jsbridge");
    module.exports = function(app) {
        app.register.controller("testCtrl", [ "$scope", "$location", "$routeParams", "NativeApp", "DataService", function($scope, $location, $routeParams, NativeApp, DataService) {
            JSBridge.callNative("NineGameClient", "showMessage", {
                msg: "欢迎你[来自showMessage测试]"
            });
            $scope.checkInterface = function(methodName, myMethodName) {
                var name = myMethodName;
                if (angular.isDefined(methodName) && "" != methodName) name = methodName;
                console.log("Method Name is :" + name);
                var result = NativeApp.checkInterface("NineGameClient", name);
                $scope.showMessage("接口" + name + "是否存在:" + result);
            };
            $scope.showMessage = function(msg) {
                console.log("showMessage>>>>" + msg);
                NativeApp.showMessage(msg);
            };
            $scope.getEnv = function(key) {
                if (angular.isDefined(key) || "" == key) $scope.showMessage("请选择环境变量");
                var result = NativeApp.getEnv(key);
                console.log("getEnv>>>>key:" + key + "  value:" + result);
                $scope.showMessage("key:" + key + ",value:" + result);
            };
            $scope.setCache = function(cacheKey, cacheValue, maxAge) {
                console.log("setCache>>>cacheKey:" + cacheKey + " cacheValue:" + cacheValue + " maxAge:" + maxAge);
                NativeApp.setCache(cacheKey, cacheValue, maxAge);
                $scope.showMessage("OK");
            };
            $scope.getCache = function(cacheKey, clearCache) {
                console.log("getCache>>>cacheKey:" + cacheKey + " clearCache:" + clearCache);
                var value = NativeApp.getCache(cacheKey, clearCache);
                $scope.showMessage("getCache key:" + cacheKey + ", value:" + value);
            };
            $scope.setSession = function(sessionKey, sessionValue) {
                NativeApp.setSession(sessionKey, sessionValue);
                $scope.showMessage("OK");
            };
            $scope.getSession = function(sessionKey, clearCache) {
                var value = NativeApp.getSession(sessionKey, clearCache);
                $scope.showMessage("getSession key:" + sessionKey + ", value:" + value);
            };
            $scope.setConfig = function(configKey, configValue) {
                NativeApp.setConfig(configKey, configValue);
                $scope.showMessage("OK");
            };
            $scope.getConfig = function(configKey, configedKey) {
                var key = configKey;
                if ("" != configedKey && "undefined" != configedKey) key = configedKey;
                console.log("getConfig key:" + key);
                var result = "";
                if ("" == configedKey || angular.isUndefined(configedKey)) {
                    result = NativeApp.getConfig("");
                    $scope.showMessage("getConfig:" + result);
                } else {
                    result = NativeApp.getConfig(key);
                    $scope.showMessage("getConfig key:" + key + ", value:" + JSON.stringify(result));
                }
            };
            $scope.setClipboard = function(clipboard) {
                NativeApp.setClipboard(clipboard);
                $scope.showMessage("OK！已复制到剪贴板");
            };
            $scope.getClipboard = function() {
                $scope.showMessage("getClipboard value:" + NativeApp.getClipboard());
            };
            $scope.logMsg = "writeLog test!!!!";
            $scope.writeLog = function(msg) {
                var _msg = "writeLog msg is:" + msg;
                console.log(_msg);
                NativeApp.writeLog(msg, 3);
                $scope.showMessage("OK");
            };
            $scope.readFile = function(pathUrl, isSyn) {
                console.log("readFile>>>pathUrl:" + pathUrl + "  isSyn:" + isSyn);
                var callback = null;
                if (!isSyn) callback = function(data, error) {
                    $scope.showMessage("readFile异步读取结果:" + JSON.stringify(data) + " error:" + JSON.stringify(error || "没有错误"));
                };
                var result = NativeApp.readFile(pathUrl, null, callback);
                if (isSyn) $scope.showMessage("readFile同步读取结果>>>result:" + result);
            };
            $scope.addStat = function(key) {
                console.log("addStat>>> key:" + key);
                NativeApp.addActionStat("detail_news", "act1", "gameId", "act3");
                $scope.showMessage("OK");
            };
        } ]);
    };
});