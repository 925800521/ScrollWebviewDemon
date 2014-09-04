define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("modalCtrl", [ "$scope", "NativeApp", "$routeParams", "$sce", function($scope, NativeApp, $routeParams, $sce) {
        angular.element(document.body).css("visibility", "visible");
        $scope.title = $routeParams.title;
        $scope.content = $sce.trustAsHtml($routeParams.content);
        $scope.btnList = $routeParams.btnList ? JSON.parse($routeParams.btnList) : [ {
            id: "close",
            text: "关闭"
        }, {
            id: "ok",
            text: "确定",
            primary: true
        } ];
        $scope.clickBtn = function(btn) {
            NativeApp.closeWindow(btn);
        };
    } ]);
});