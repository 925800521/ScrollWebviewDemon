define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("categoryCtrl", [ "$scope", "NativeApp", "Loader", "$routeParams", function($scope, NativeApp, Loader, $routeParams) {
        var cateType = $routeParams.cateType || 1;
        var hasExcellent = 0;
        var tabIndex = 0;
        var region = "category";
        var showTotalGame = false;
        switch (cateType) {
          case "1":
            hasExcellent = 1;
            NativeApp.setNavTitle("分类");
            break;

          case "2":
            tabIndex = 3;
            region = "ngcategory";
            showTotalGame = false;
            NativeApp.setNavTitle("新游分类");
            break;

          case "3":
            region = "ogcategory";
            showTotalGame = true;
            NativeApp.setNavTitle("网游分类");
            break;

          case "4":
            break;

          default:
            hasExcellent = 1;
        }
        Loader.initPager({
            callbackId: "categoryList",
            service: "game.category.getInfo",
            data: {
                hasExcellent: hasExcellent,
                type: cateType
            },
            page: {
                size: 20
            }
        }, function(response) {
            $scope.categoryList = ($scope.categoryList || []).concat(response.data.categoryList.list);
        });
        $scope.goCategoryDetailPage = function(category, index) {
            NativeApp.addRegionStat(region, index + 1, category.mark);
            var title = category.name;
            if (showTotalGame && category.total && category.total > 0) title = title + "(" + category.total + ")";
            if ("yzyx" == category.cateType) NativeApp.openWindow("/collection/excellent.html", {}, "common"); else NativeApp.openWindow("/category/detail.html", {
                id: category.absPosId,
                title: encodeURIComponent(title),
                act: category.mark,
                cateType: cateType,
                tabIndex: tabIndex
            }, "category_detail");
        };
    } ]);
});