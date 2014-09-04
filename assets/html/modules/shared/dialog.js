define(function(require, exports, module) {
    var app = angular.module("ngmApp");
    app.factory("Dialog", [ "$rootScope", "NativeApp", "$timeout", function($rootScope, NativeApp, $timeout) {
        var obj = {};
        obj.openCommonDialog = function(title, content, btnList, width, height, callback) {
            NativeApp.openWindow("/modal.html", {
                title: title,
                content: encodeURIComponent(content),
                btnList: encodeURIComponent(JSON.stringify(btnList))
            }, "blank", {
                width: width ? width : 280,
                height: height ? height : 300
            }, function(btn) {
                callback(btn);
            });
        };
        obj.openDivDialog = function(title, content, btnList) {
            $rootScope.popTitle = title;
            $rootScope.popContent = content;
            $rootScope.btnList = btnList;
            $rootScope.popShow = true;
        };
        obj.closeDivDialog = function() {
            $rootScope.popShow = false;
        };
        window.loginClearToast = function() {
            NativeApp.login({}, {
                a1: "lbdltc"
            }, function() {});
            var div = document.getElementById("toast");
            if (div) document.body.removeChild(div);
            NativeApp.addActionStat("btn_signindialog", "lbdlts");
        };
        obj.toastLogin = function() {
            if (!NativeApp.isLogin()) {
                var isToasted = NativeApp.getCache("UCGC.giftlogin.toast");
                if ("" === isToasted) {
                    var div = document.createElement("div");
                    div.id = "toast";
                    div.innerHTML = '<div onclick="loginClearToast()" class="pop-tips"><div class="pop-gift">领取礼包，快人一步！点击 <a class="em">快速登录</a></div> </div>';
                    document.body.appendChild(div);
                    $timeout(function() {
                        if (div) {
                            document.body.removeChild(div);
                            window.loginClearToast = void 0;
                        }
                    }, 5e3);
                    NativeApp.addActionStat("btn_giftsignintipdialog", "a");
                    NativeApp.setCache("UCGC.giftlogin.toast", "toastLogin", 180 * 24 * 3600 * 1e3);
                }
            }
        };
        return obj;
    } ]);
});