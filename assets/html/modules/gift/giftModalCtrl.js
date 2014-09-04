define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("giftModalCtrl", [ "$scope", "NativeApp", "$routeParams", "$sce", function($scope, NativeApp, $routeParams, $sce) {
        NativeApp.setWebViewState("loaded");
        angular.element(document.body).css("background-color", "rgba(0, 0, 0, 0)");
        $scope.title = $routeParams.title;
        $scope.content = $sce.trustAsHtml($routeParams.content);
        $scope.codeList = JSON.parse($routeParams.codeList || "{}");
        $scope.btnList = $routeParams.btnList ? JSON.parse($routeParams.btnList) : [ {
            id: "close",
            text: "关闭"
        } ];
        $scope.clickBtn = function(btn) {
            NativeApp.closeWindow(btn);
        };
        $scope.copy = function(val) {
            NativeApp.setClipboard(val);
            NativeApp.showMessage("复制成功");
        };
    } ]);
});