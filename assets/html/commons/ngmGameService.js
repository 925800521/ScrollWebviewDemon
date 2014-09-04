!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmApp");
    app.factory("GameService", function() {
        function GameInfo(origin) {
            if (origin && origin.game) {
                var game = origin.game;
                var gpkg = origin.gpkg;
                var gameInfo = this;
                angular.extend(gameInfo, {
                    key: {
                        gameId: game.id,
                        pkgName: "",
                        pkgId: "",
                        versionCode: ""
                    },
                    base: {
                        gameId: game.id,
                        oldGameId: game.oldId,
                        gameName: game.name || game.shortName,
                        shortName: game.shortName,
                        gameIcon: game.logourl,
                        isSimple: !!game.issimple,
                        opStatus: game.operationStatus,
                        category: game.category,
                        playType: game.downtype,
                        serverUrl: game.svrUrl,
                        uploadTime: game.uploadTime,
                        modifyTime: game.modifyTime,
                        createTime: game.createTime,
                        recommendTime: game.colGameCreateTime,
                        operationType: game.operationType,
                        groupName: game.groupName,
                        groupFlag: game.groupFlag
                    },
                    status: {
                        scoreTotal: game.scoreTotal,
                        commentTotal: game.commentTotal,
                        avgScore: game.avrgScore,
                        downloadTotal: game.downstatTotal,
                        downloadMonth: game.downstatMonth,
                        downloadWeek: game.downstatWeek,
                        gift: !!game.gifting,
                        newest: !!game.newestState,
                        excellent: game.excellent,
                        uninstall: game.uninstall,
                        hasActiCode: game.hasActiCode || false,
                        hotValue: game.hotValue,
                        trend: game.trend,
                        stage: game.stage
                    },
                    detail: {
                        versionName: game.version,
                        customerInfo: game.customerInfo,
                        lang: game.langDesc,
                        description: game.description,
                        instruction: game.instruction,
                        versionUpdateDesc: game.versionUpdateDesc
                    }
                });
                var group = origin.colinfo;
                if (group) gameInfo.group = {
                    groupName: group.group,
                    createDate: group.createDate,
                    total: group.total
                };
                var event = origin.eventinfo;
                if (event) gameInfo.event = {
                    title: event.title,
                    beginTime: event.beginTime,
                    dimBeginTime: event.dimBeginTime,
                    type: event.type
                };
                var adm = origin.adm;
                if (adm) gameInfo.adm = {
                    adpId: adm.adpId,
                    adWord: adm.adWord,
                    admId: adm.admId,
                    admType: adm.admType,
                    imageUrl: adm.imageUrl
                };
                if (gpkg) {
                    gameInfo.key = angular.extend(gameInfo.key, {
                        pkgId: gpkg.id,
                        pkgName: gpkg.packageName,
                        versionCode: gpkg.orgVersionCode
                    });
                    gameInfo.detail.versionName = gpkg.versionName;
                    gameInfo.base.fileSize = gpkg.fileSize || 0;
                    gameInfo.pkg = {
                        apk: {
                            pkgId: gpkg.id,
                            pkgName: gpkg.packageName,
                            downloadUrl: gpkg.downUrl,
                            fileSize: gpkg.fileSize,
                            chId: gpkg.chId,
                            overrideChId: gpkg.overrideChId,
                            isDefaultCh: gpkg.isDefaultCh,
                            versionCode: gpkg.orgVersionCode,
                            versionName: gpkg.versionName,
                            highVer: gpkg.highVer,
                            lowVer: gpkg.lowVer,
                            targetVer: gpkg.targetVer
                        },
                        data: []
                    };
                    angular.forEach(gpkg.dataPkgsField, function(item) {
                        gameInfo.pkg.data.push({
                            pkgId: item.id,
                            downloadUrl: item.downUrl,
                            fileSize: item.fileSize,
                            extractPath: item.datapkgInstallPath
                        });
                        gameInfo.base.fileSize += item.fileSize || 0;
                    });
                }
            } else {
                console.warn("[GameService] incorrect old gameinfo format", origin);
                return null;
            }
        }
        GameInfo.format = function(arg) {
            if (!arg) console.warn("[GameService] incorrect old gameinfo format, input is undefined"); else if (angular.isArray(arg)) return arg.map(function(item) {
                return new GameInfo(item);
            }).filter(function(item) {
                return null != item;
            }); else if (angular.isArray(arg.list)) {
                var attrCount = 0;
                for (var key in arg) if (arg.hasOwnProperty(key)) attrCount++;
                var gameList = arg.list.map(function(item) {
                    return new GameInfo(item);
                }).filter(function(item) {
                    return null != item;
                });
                if (attrCount > 1) {
                    arg.list = gameList;
                    return arg;
                } else return gameList;
            } else {
                var gameInfo = new GameInfo(arg);
                return gameInfo && gameInfo.base ? gameInfo : null;
            }
        };
        GameInfo.isSameGameInfo = function(data, gameInfo) {
            return data && gameInfo && gameInfo.key && gameInfo.key.gameId == data.gameId && gameInfo.key.pkgName == data.pkgName;
        };
        GameInfo.findSameGameInfo = function(data, gameInfo) {
            if (!data || !gameInfo || !gameInfo.key) return false;
            var matchData = null;
            var changeValues = angular.isArray(data) ? data : [ data ];
            for (var i = 0, len = changeValues.length; i < len; i++) if (changeValues[i].gameId == gameInfo.key.gameId) {
                matchData = changeValues[i];
                break;
            }
            return matchData;
        };
        return GameInfo;
    });
    app.factory("GameState", [ "NativeApp", "$timeout", "Utils", function(NativeApp, $timeout, Utils) {
        function GameState() {
            this.state = "-1";
            this.btnText = "下载";
            this.btnStyle = "";
            this.clickAction = angular.noop;
            this.region = "info";
            this.stateText = "";
            this.statAction = "";
            this.data = {
                network: "",
                isFollow: false,
                gameIcon: "",
                retryCount: "",
                retryInterval: "",
                fileSize: "",
                downloadedBytes: "",
                progress: "",
                downloadSpeed: "",
                remainTime: ""
            };
            this.noClick = false;
        }
        GameState.prototype.hasInit = function() {
            return "-1" != this.state;
        };
        GameState.prototype.isInstalled = function() {
            return "300" == this.state || "301" == this.state || "302" == this.state;
        };
        GameState.prototype.clickBtn = function(gameInfo, statInfo, $event) {
            if ($event) $event.stopPropagation();
            var gameState = this;
            if (!gameState.noClick) {
                gameState.noClick = true;
                var statList = [];
                var gameId = gameInfo.base.gameId;
                var tempStatInfo = angular.extend({
                    action: gameState.statAction,
                    a2: gameId
                }, statInfo);
                statList.push(tempStatInfo);
                if ("btn_open" == gameState.statAction) tempStatInfo.a3 = Utils.formatDate(new Date(), "yyyyMMddhhmmss");
                if ("btn_down" == gameState.statAction && statInfo && statInfo.ada1 && statInfo.adpId && gameInfo.adm && gameInfo.adm.admId) {
                    NativeApp.addActionStat("ad_click", statInfo.ada1, gameId, "", statInfo.adpId, gameInfo.adm.admId);
                    statList.push({
                        action: "ad_down",
                        a1: statInfo.ada1,
                        a2: gameId,
                        a3: "",
                        ad_position: statInfo.adpId,
                        ad: gameInfo.adm.admId
                    });
                }
                gameState.clickAction(gameInfo, statList);
            }
            setTimeout(function() {
                gameState.noClick = false;
            }, 500);
        };
        GameState.prototype.updatePackageState = function(json, gameInfo) {
            if (gameInfo) {
                var gameState = this;
                var state = gameState.state = String(json.state) || "-1";
                var data = gameState.data = ("string" == typeof json.data && "" != json.data ? JSON.parse(json.data) : json.data) || {};
                if (data.downloadedBytes) data.progress = (100 * data.downloadedBytes / data.fileSize).toFixed(0);
                data.gameIcon = data.gameIcon || gameInfo.base.gameIcon;
                switch (state) {
                  case "-1":
                    gameState.btnText = "下载";
                    gameState.clickAction = angular.noop;
                    gameState.region = "info";
                    gameState.btnStyle = "";
                    break;

                  case "0":
                    gameState.btnText = "下载";
                    gameState.clickAction = NativeApp.startDownloadApp;
                    gameState.statAction = "btn_down";
                    gameState.region = "info";
                    gameState.btnStyle = "";
                    break;

                  case "1":
                    gameState.region = "info";
                    if (!gameInfo.base.isSimple) if (gameState.data.isFollow) {
                        gameState.btnText = "已关注";
                        gameState.btnStyle = "-dis";
                        gameState.clickAction = angular.noop;
                        gameState.statAction = "";
                    } else {
                        gameState.btnText = "关注";
                        gameState.btnStyle = "";
                        gameState.clickAction = NativeApp.followApp;
                        gameState.statAction = "btn_bookonlinegame";
                    } else {
                        gameState.btnText = "即将开放";
                        gameState.clickAction = angular.noop;
                        gameState.btnStyle = "-dis";
                    }
                    break;

                  case "100":
                    gameState.btnText = "暂停";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "启动下载中...";
                    gameState.shortStateText = "启动下载";
                    break;

                  case "101":
                    gameState.btnText = "暂停";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "state";
                    gameState.stateText = "等待下载(最多同时下载2个)";
                    gameState.shortStateText = "等待下载";
                    break;

                  case "102":
                    gameState.btnText = "继续";
                    gameState.btnStyle = "";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.region = "state";
                    gameState.stateText = "队列中,WIFI下自动下载";
                    gameState.shortStateText = "下载队列";
                    break;

                  case "103":
                    gameState.btnText = "继续";
                    gameState.btnStyle = "";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "已暂停";
                    break;

                  case "104":
                    gameState.btnText = "暂停";
                    gameState.btnStyle = "";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.region = "progress";
                    if (data.downloadSpeed > 0) {
                        var speed = Utils.formatSize(data.downloadSpeed);
                        var remainTime = Utils.formatRemainTime((data.fileSize - data.downloadedBytes) / data.downloadSpeed);
                        gameState.stateText = speed + "B/s(" + remainTime + ")";
                    } else gameState.stateText = "0.0KB/s";
                    break;

                  case "105":
                    gameState.btnText = "暂停";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "重连第" + (data.retryCount || 1) + "次...";
                    break;

                  case "106":
                    gameState.btnText = "重试";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.stateText = "重试" + (data.retryCount || 5) + "次失败(" + ("unavailable" == data.network ? "网络中断)" : "请稍后再试)");
                    break;

                  case "107":
                    gameState.btnText = "安装";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "-em";
                    gameState.region = "state";
                    gameState.stateText = "下载完成";
                    gameState.shortStateText = "下载完成";
                    break;

                  case "108":
                    gameState.btnText = "继续";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "已暂停(WIFI中断)";
                    break;

                  case "200":
                    gameState.btnText = "安装中";
                    gameState.clickAction = angular.noop;
                    gameState.btnStyle = "-dis";
                    gameState.region = "state";
                    gameState.stateText = "安装中...";
                    gameState.shortStateText = "安装中";
                    break;

                  case "205":
                    gameState.btnText = "解包中";
                    gameState.clickAction = angular.noop;
                    gameState.btnStyle = "-dis";
                    gameState.region = "state";
                    gameState.stateText = "数据包解压中...";
                    gameState.shortStateText = "解包中";
                    break;

                  case "206":
                    gameState.btnText = "重试";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "";
                    gameState.region = "state";
                    gameState.stateText = "数据包解压失败";
                    gameState.shortStateText = "解压失败";
                    break;

                  case "207":
                    gameState.btnText = "安装";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "-em";
                    gameState.region = "state";
                    gameState.stateText = "安装失败";
                    gameState.shortStateText = "安装失败";
                    break;

                  case "300":
                    gameState.btnText = "打开";
                    gameState.clickAction = NativeApp.startupApp;
                    gameState.statAction = "btn_open";
                    gameState.btnStyle = "-em";
                    gameState.region = "info";
                    break;

                  case "301":
                    gameState.btnText = "升级";
                    gameState.clickAction = NativeApp.startDownloadApp;
                    gameState.statAction = "btn_down";
                    gameState.btnStyle = "-em";
                    gameState.region = "info";
                    break;

                  case "302":
                    gameState.btnText = "安装";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "-em";
                    gameState.region = "info";
                    break;

                  case "400":
                    gameState.btnText = "进入游戏";
                    gameState.clickAction = NativeApp.startupWebApp;
                    gameState.statAction = "btn_entergame";
                    gameState.btnStyle = "";
                    gameState.region = "info";
                    break;

                  default:
                    gameState.btnText = "下载";
                    gameState.clickAction = angular.noop;
                    gameState.region = "info";
                    gameState.btnStyle = "";
                    console.warn("[GameState] changePackageState got unknown btn state: " + state, gameInfo, json);
                }
            } else console.warn("[GameState] updatePackageState got undefined gameInfo.");
        };
        GameState.prototype.updateFollowState = function(json, gameInfo) {
            if (gameInfo) {
                var gameState = this;
                if (!gameInfo.base.isSimple) if (json.isFollow) {
                    gameState.btnText = "已关注";
                    gameState.clickAction = angular.noop();
                    gameState.statAction = "";
                    gameState.btnStyle = "-dis";
                } else {
                    gameState.btnText = "关注";
                    gameState.clickAction = NativeApp.followApp;
                    gameState.statAction = "btn_bookonlinegame";
                    gameState.btnStyle = "";
                }
            } else console.warn("[GameState] updateFollowState got undefined gameInfo.");
        };
        return GameState;
    } ]);
    app.factory("GameStateWatcher", [ "$rootScope", "NativeApp", "GameState", "GameService", function($rootScope, NativeApp, GameState, GameService) {
        function GameStateWatcher() {}
        GameStateWatcher.mapping = {};
        GameStateWatcher.monitor = function(key, gameInfoList) {
            if (gameInfoList && gameInfoList.length > 0) {
                GameStateWatcher.mapping[key] = gameInfoList;
                var newGameList = [];
                var gameMapping = {};
                for (var i = 0, len = gameInfoList.length; i < len; i++) {
                    var gameInfo = gameInfoList[i];
                    gameInfo.ui = gameInfo.ui || new GameState();
                    if (!gameInfo.ui.hasInit()) {
                        newGameList.push(gameInfo);
                        gameMapping[gameInfo.key.gameId + "_" + gameInfo.key.pkgName] = gameInfo;
                        if (!true) gameInfo.ui.data.gameIcon = gameInfo.base.gameIcon;
                    }
                }
                if (newGameList.length > 0) {
                    console.debug("[GameStateWatcher] watching %s with %d new gameInfo", key, newGameList.length);
                    NativeApp.getPackageState(newGameList, function(json) {
                        var resultList = json.data;
                        if (newGameList.length != resultList.length) console.warn("[GameStateWatcher] getPackageState count problem", newGameList, resultList);
                        for (var i = 0, len = resultList.length; i < len; i++) {
                            var data = resultList[i];
                            var gameInfo = gameMapping[data.gameId + "_" + (data.pkgName || "")];
                            if (gameInfo && gameInfo.ui) gameInfo.ui.updatePackageState(data, gameInfo); else console.warn("[GameStateWatcher] getPackageState missing item: " + data.gameId + "_" + (data.pkgName || ""));
                        }
                        gameMapping = null;
                        newGameList = null;
                    });
                }
            } else delete GameStateWatcher.mapping[key];
        };
        var isWatchingStateEvent = false;
        var isWatchingFollowEvent = false;
        GameStateWatcher.initEvent = function(watchState, watchFollow) {
            if (!isWatchingStateEvent && watchState) {
                isWatchingStateEvent = true;
                NativeApp.registerEvent(NativeApp.EVENT_PACKAGE_STATE_CHANGED, function(event, json) {
                    updateGameInfo(json, function(gameInfo) {
                        gameInfo.ui.updatePackageState(json, gameInfo);
                    });
                });
                NativeApp.registerEvent(NativeApp.EVENT_EXTRACT_PROGRESS_CHANGED, function(event, json) {
                    updateGameInfo(json, function(gameInfo) {
                        gameInfo.ui.updatePackageState(json, gameInfo);
                    });
                });
            }
            if (!isWatchingFollowEvent && watchFollow) {
                isWatchingFollowEvent = true;
                NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
                $rootScope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
                    angular.forEach(json, function(data, key) {
                        updateGameInfo(data, function(gameInfo) {
                            gameInfo.ui.updateFollowState(data, gameInfo);
                        });
                    });
                });
            }
        };
        function updateGameInfo(json, callback) {
            angular.forEach(GameStateWatcher.mapping, function(gameInfoList) {
                angular.forEach(gameInfoList, function(gameInfo) {
                    if (gameInfo && gameInfo.key && gameInfo.key.gameId == json.gameId && gameInfo.key.pkgName == json.pkgName) callback(gameInfo);
                });
            });
        }
        return GameStateWatcher;
    } ]);
    app.directive("ngmGameItem", [ "$rootScope", "NativeApp", "Utils", "$timeout", "GameService", "GameState", function($rootScope, NativeApp, Utils, $timeout, GameService, GameState) {
        return {
            scope: {
                ngmGameItem: "="
            },
            link: function(scope, element, attrs) {
                var unbindWatch = scope.$watch("ngmGameItem", function(gameInfo) {
                    if (gameInfo) {
                        if (!gameInfo.base.isSimple) {
                            gameInfo.ui = new GameState();
                            initEvent();
                            updateFollowState(NativeApp.isFollowApp(gameInfo), gameInfo);
                        }
                        unbindWatch();
                        unbindWatch = null;
                    }
                });
                function initEvent() {
                    NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
                    scope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
                        console.log(">>>H5 json EVENT_FOLLOW_STATE_CHANGED:" + JSON.stringify(json));
                        var gameInfo = scope.ngmGameItem;
                        angular.forEach(json, function(data, key) {
                            if (gameInfo && gameInfo.key && gameInfo.key.gameId == data.gameId && gameInfo.key.pkgName == data.pkgName) updateFollowState(data.isFollow, gameInfo);
                        });
                    });
                }
                function updateFollowState(isFollow, gameInfo) {
                    if (gameInfo && gameInfo.ui) {
                        var gameState = gameInfo.ui;
                        if (isFollow) {
                            gameState.btnText = "取消关注";
                            gameState.clickAction = NativeApp.unfollowApp;
                            gameState.statAction = "btn_unbookonlinegame";
                            gameState.btnStyle = "-long";
                        } else {
                            gameState.btnText = "关注";
                            gameState.clickAction = NativeApp.followApp;
                            gameState.statAction = "btn_bookonlinegame";
                            gameState.btnStyle = "";
                        }
                    }
                }
            }
        };
    } ]);
    app.directive("ngmGameList", [ "GameStateWatcher", function(GameStateWatcher) {
        var directiveConfig = {
            scope: {
                ngmGameList: "="
            },
            link: function(scope, element, attrs) {
                GameStateWatcher.initEvent(true, true);
                scope.$watchCollection("ngmGameList", function() {
                    GameStateWatcher.monitor(attrs["ngmGameListKey"] || attrs["ngmGameList"], scope.ngmGameList);
                });
            }
        };
        return directiveConfig;
    } ]);
}(window);