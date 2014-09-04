define(function(require, exports, module) {
    "use strict";
    var app = angular.module("ngmApp");
    app.controller("thirdPartyCtrl", [ "$scope", "NativeApp", "$routeParams", "Loader", function($scope, NativeApp, $routeParams, Loader) {
        NativeApp.setNavTitle("提交游戏资料");
        app.page = $routeParams.page;
        var config = {
            giftDetail: {
                service: "op.ka.basic.getDetail",
                data: {
                    sceneId: $routeParams.sceneId
                }
            }
        };
        Loader.initOnce(config, function(response) {
            var data = response.data;
            var detail = data.giftDetail, data = detail.property.split(","), list = [];
            angular.forEach(data, function(v, k) {
                list.push({
                    property: v,
                    code: ""
                });
            });
            $scope.list = list;
            $scope.item = detail;
            $scope.btnStyle = {
                opacity: .5
            };
            setInterval($scope.checkButton, 300);
        });
        $scope.checkButton = function() {
            setTimeout(function() {
                var a = checkForm();
                if (!a) $scope.btnStyle = {
                    opacity: .5
                }; else $scope.btnStyle = {
                    opacity: 1
                };
                $scope.$apply();
            }, 10);
        };
        function checkForm() {
            var fields = getUserInput(), result = [], val;
            for (var i = 0; i < fields.length; i++) {
                val = fields[i];
                if (/^\s*$/.test(val)) return false;
                result.push(val);
            }
            return result;
        }
        function getUserInput() {
            var userInput = [];
            angular.forEach($scope.list, function(v, k) {
                userInput.push(v.code);
            });
            return userInput;
        }
        function getUserInputHTML() {
            var html = "";
            angular.forEach($scope.list, function(v, k) {
                html += "<div>" + v.property + " : " + v.code + "</div>";
            });
            return html;
        }
        function checkLength() {
            var fields = $scope.list, val;
            for (var i = 0; i < fields.length; i++) {
                val = fields[i].code;
                if (val.length > 50) {
                    NativeApp.showMessage('"' + fields[i].property + '"字数太多了哦，请控制到50字符内');
                    return false;
                }
            }
            return true;
        }
        $scope.hidKeyBord = function() {};
        $scope.comfirm = function() {
            $scope.hidKeyBord();
            if (!checkLength() || !checkForm()) return false;
            var html = '<p class="tips">请仔细核对，信息错误可能无法收到礼包。</p>', userInput = getUserInput();
            html += getUserInputHTML();
            NativeApp.openWindow("/modal.html", {
                title: "资料确认",
                content: encodeURIComponent(html)
            }, "blank", {
                width: 280,
                height: 300
            }, function(btn) {
                if ("ok" == btn.id) {
                    $scope.item.userInput = userInput;
                    var statInfo = $scope.getStatInfo({
                        action: "btn_getgift"
                    });
                    NativeApp.registerGift($scope.item, statInfo, userInput, function(res) {
                        NativeApp.closeWindow({
                            type: "submit"
                        });
                        if (res.data && 5000014 == res.data.code) {
                            NativeApp.addActionStat("btn_signindialog", "lbfh");
                            NativeApp.login({}, {
                                a1: "lbdltc"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) ;
                            });
                        } else if (res.result) {
                            NativeApp.showMessage("提交成功");
                            history.go(-1);
                        } else NativeApp.showMessage(res.msg);
                    });
                }
            });
        };
        $scope.getStatInfo = function(stat) {
            var pageMapping = {
                "gift.list": "lbfhyx",
                "gift.activation": "jhm",
                "gift.detail": "lbfhxq",
                "gift.search": "lbfhss"
            };
            var a1 = pageMapping[app.page];
            if (!a1) return;
            var statInfo = {
                action: stat.action,
                a1: a1,
                a2: $scope.item.sceneId,
                a3: $scope.item.gameId
            };
            return statInfo;
        };
    } ]);
});