define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("cacheTestCtrl", [ "NativeApp", "$timeout", "$scope", function(NativeApp, $timeout, $scope) {
        var vm = this;
        NativeApp.setWebViewState("loaded");
        vm.init = function(key, value) {
            vm.key = key;
            vm.value = "string" === typeof value ? value : JSON.stringify(value);
            localStorage.setItem(key, vm.value);
            NativeApp.setCache(key, vm.value);
        };
        vm.nativeCacheProcess = 0;
        vm.nativeCacheResult = 0;
        vm.localStorageProcess = 0;
        vm.localStorageResult = 0;
        vm.testLocalStorage = function() {
            NativeApp.time("testLocalStorage");
            localStorage.getItem(vm.key);
            return NativeApp.timeEnd("testLocalStorage");
        };
        vm.testNativeCache = function() {
            NativeApp.time("testNativeCache");
            NativeApp.getCache(vm.key);
            return NativeApp.timeEnd("testNativeCache");
        };
        var nativeCacheProcess = 0;
        var nativeCacheResult = 0;
        var localStorageProcess = 0;
        var localStorageResult = 0;
        vm.test = function() {
            if (vm.localStorageProcess < 1e4) {
                if (localStorageProcess % 1e3 == 0) $timeout(function() {
                    vm.localStorageProcess = localStorageProcess;
                    vm.localStorageResult = localStorageResult;
                });
                localStorageResult += vm.testLocalStorage();
                localStorageProcess++;
                return setTimeout(vm.test, 0);
            } else if (vm.nativeCacheProcess < 1e4) {
                if (nativeCacheProcess % 1e3 == 0) $timeout(function() {
                    vm.nativeCacheProcess = nativeCacheProcess;
                    vm.nativeCacheResult = nativeCacheResult;
                });
                nativeCacheResult += vm.testNativeCache();
                nativeCacheProcess++;
                return setTimeout(vm.test, 0);
            }
        };
        vm.init("test", "abc");
    } ]);
});