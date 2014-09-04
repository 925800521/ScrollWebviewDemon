!function(global, undefined) {
    var _path = location.href, _store = {
        ready: function() {
            if (!this._tmp) {
                var s = localStorage.getItem(_path);
                this._tmp = s ? JSON.parse(s) : {
                    idx: 0,
                    seq: []
                };
            }
            return this;
        },
        getItem: function(_asKey) {
            return this._tmp[_asKey];
        },
        setItem: function(_asKey, _asVal) {
            this._tmp[_asKey] = _asVal;
            if (0 == this._tmp.idx && _asVal == -1) this._tmp.seq.push(_asKey);
            localStorage.setItem(_path, JSON.stringify(this._tmp));
        },
        clear: function() {
            this._tmp = null;
            localStorage.removeItem(_path);
        }
    };
    function _handleCount(_aoData, _aoMap) {
        var s = [ "<br>" ], t = [], cnt = 0, time = 0, val = "", total_cnt = 0, total_time = 0, callback_cnt = 0, single_cnt = 0, batch_cnt = 0, read = 0, write = 0;
        for (var i in _aoMap[_export.COUNT]) {
            time = eval(_aoMap[_export.COUNT][i].join("+"));
            cnt = _aoMap[_export.COUNT][i].length;
            val = "<b>count:</b> " + cnt + ", <b>duration:</b>" + time;
            t = i.split(":").pop().split(", ");
            s.push('<div style="padding:10px 0 0 20px;">' + i + "<br>" + val + "</div>");
            if (0 == i.indexOf("Native") || 0 == i.indexOf("callback")) callback_cnt += cnt; else {
                if (0 == i.indexOf("batch")) batch_cnt += cnt; else single_cnt += cnt;
                for (var j = 0; j < t.length; j++) if (0 == t[j].indexOf("get") || 0 == t[j].indexOf("is") || 0 == t[j].indexOf("read")) read += 1 == t.length ? cnt : 1; else write += 1 == t.length ? cnt : 1;
            }
            total_cnt += _aoMap[_export.COUNT][i].length;
            total_time += time;
        }
        s.push('<div style="padding:10px 0 0 20px;font-weight:bold">' + "single:" + single_cnt + ", batch:" + batch_cnt + ", callback:" + callback_cnt + ", total count:" + total_cnt + ", total times:" + total_time + ", read/write:" + read + "/" + write + "</div>");
        _aoMap[_export.COUNT] = s.join("");
    }
    function _handleTime(_aoData, _aoMap) {
        var _oArr, _sName;
        for (var i = 0, l = _aoData.seq.length, t = _export.USE_CACHE || _export.USE_SCROLL ? 0 : 1; i < l; i++) {
            _sName = _aoData.seq[i].replace(_export.PREFIX_SPEED, "").replace(/\d+$/, "");
            _oArr = _aoMap[_sName];
            _aoMap[_sName] = "[object Array]" == {}.toString.call(_oArr) && _oArr.length > 1 ? Number(eval(_oArr.slice(t).join("+")) / _oArr.length - t).toFixed(2) : Number(_oArr);
        }
    }
    var _export = {
        cache: {
            length: 0,
            keys: {}
        },
        canLoop: function() {
            return 0 == this.cache.length;
        },
        count: function(_asKey, _anDuration) {
            if (!this._tmp) this._tmp = {};
            var _sKey = this.PREFIX_SPEED + this.COUNT + _asKey;
            if (!this._tmp[_sKey]) this._tmp[_sKey] = [];
            this._tmp[_sKey].push(_anDuration);
            _store.ready().setItem(_sKey, this._tmp[_sKey]);
        },
        time: function(_asKey) {
            if (!this._tmp) this._tmp = {};
            var _sKey = this.PREFIX_SPEED + _asKey + _store.ready().getItem(this.IDX);
            if (this._tmp[_sKey]) {
                _store.ready().setItem(_sKey, +new Date() - this._tmp[_sKey]);
                delete this._tmp[_sKey];
            } else {
                this._tmp[_sKey] = +new Date();
                _store.ready().setItem(_sKey, -1);
            }
            if (!this.cache.keys[_asKey]) {
                this.cache.keys[_asKey] = 1;
                this.cache.length++;
            } else {
                delete this.cache.keys[_asKey];
                this.cache.length--;
            }
        },
        clear: function() {
            _store.clear();
        },
        report: function() {
            var _oMap = {}, _oData = JSON.parse(localStorage.getItem(_path)), _nCnt = 0, _sName = "", _bUseIOTracker = this.USE_IO_TRACK;
            for (var i in _oData) if (i == this.IDX) {
                _nCnt = _oData[i];
                _oMap[i] = _nCnt;
            } else if (_bUseIOTracker && 0 == i.indexOf(this.PREFIX_SPEED + this.COUNT)) {
                if (!_oMap[this.COUNT]) _oMap[this.COUNT] = {};
                _sName = i.replace(this.PREFIX_SPEED + this.COUNT, "");
                _oMap[this.COUNT][_sName] = _oData[i];
            } else {
                _sName = i.replace(this.PREFIX_SPEED, "");
                _sName.replace(/^(.*?)(\d+)$/gi, function(_asAll, $1, $2) {
                    if (!_oMap[$1]) _oMap[$1] = new Array(_nCnt);
                    _oMap[$1][JSON.parse($2)] = _oData[i];
                });
            }
            console.info(_oData);
            _bUseIOTracker && _handleCount(_oData, _oMap);
            _handleTime(_oData, _oMap);
            return _oMap;
        },
        cycle: function() {
            var _nCnt = _store.ready().getItem(this.IDX);
            _store.setItem(_export.IDX, "number" == typeof _nCnt ? Number(_nCnt) + 1 : 0);
            console.info("speed trace:" + _nCnt);
            if (_nCnt < this.MAX - 1) location.reload(); else {
                try {
                    var _oReport = this.report(), s = [];
                    for (var i in _oReport) s.push(i + "::" + _oReport[i]);
                    document.write(s.join("<br><br>"));
                } catch (e) {
                    document.write(localStorage.getItem(_path));
                }
                this.clear();
            }
        }
    };
    _export.USE_CACHE = false;
    _export.USE_SCROLL = false;
    _export.USE_IO_TRACK = true;
    _export.PREFIX_SPEED = "PrEFiX_";
    _export.IDX = "idx";
    _export.COUNT = "count";
    _export.MAX = _export.USE_CACHE || _export.USE_SCROLL ? 1 : 50;
    _export.TIME = 500;
    global["SpeedTrace"] = _export;
    global.addEventListener("load", function() {
        window.scrollTo(0, 0);
        setTimeout(function() {
            var total = _export.USE_SCROLL ? 2e3 : 0;
            var itv = setInterval(function() {
                if (total > 0 && document.documentElement.scrollHeight - (window.scrollY + document.documentElement.clientHeight) > 100) {
                    window.scrollTo(0, window.scrollY + 150);
                    total--;
                } else {
                    clearInterval(itv);
                    if (_export.canLoop()) global["SpeedTrace"].cycle(); else var t = setInterval(function() {
                        if (_export.canLoop()) {
                            clearInterval(t);
                            global["SpeedTrace"].cycle();
                        }
                    }, _export.TIME);
                }
            }, 100);
        }, 2e3);
    });
}(window);