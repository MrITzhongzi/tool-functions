(function () {

    var Device = {
        /**
         * 获取浏览器的类型和版本
         */
        getExplore: function () {
            var sys = {},
                ua = navigator.userAgent.toLowerCase(),
                s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
                (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
                    (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
                        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
                            (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
                                (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                                    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
            // 根据关系进行判断
            if (sys.ie) return ('IE: ' + sys.ie)
            if (sys.edge) return ('EDGE: ' + sys.edge)
            if (sys.firefox) return ('Firefox: ' + sys.firefox)
            if (sys.chrome) return ('Chrome: ' + sys.chrome)
            if (sys.opera) return ('Opera: ' + sys.opera)
            if (sys.safari) return ('Safari: ' + sys.safari)
            return 'Unkonwn'
        },
        /**
         * 获取操作系统的类型
         */
        getOS: function () {
            var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
            var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
            var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

            if (/mac/i.test(appVersion)) return 'MacOSX'
            if (/win/i.test(appVersion)) return 'windows'
            if (/linux/i.test(appVersion)) return 'linux'
            if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
            if (/android/i.test(userAgent)) return 'android'
            if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
        }
    }
    var Cookie = {
        //传入name读取cookie
        getCookie: function (name) {
            var arr = document.cookie.replace(/\s/g, "").split(';');
            for (var i = 0; i < arr.length; i++) {
                var tempArr = arr[i].split('=');
                if (tempArr[0] == name) {
                    return decodeURIComponent(tempArr[1]);
                }
            }
            return '';
        },
        setCookie: function (name, value, days) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            document.cookie = name + '=' + value + ';expires=' + date;
        },
        removeCookie: function (name) {
            // 设置已过期，系统会立刻删除cookie
            this.setCookie(name, '1', -1);
        },

    }
    var Class = {
        hasClass: function (ele, cls) {
            return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
        },
        removeClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        },
        addClass: function (ele, cls) {
            if (!this.hasClass(ele, cls)) {
                ele.className += ' ' + cls;
            }
        }
    }
    var Other = {
        arrayEqual: function (arr1, arr2) {
            if (arr1 === arr2) return true;
            if (arr1.length != arr2.length) return false;
            for (var i = 0; i < arr1.length; ++i) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
        },
    }

    var Dom = {
        /**
         * 获取滚动条距顶部的距离
         */
        getScrollTop: function () {
            return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        },
        /**
         * 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
         * @param {HTMLElement} ele 
         * return { {left: number, top: number} }
         */
        offset: function (ele) {
            var pos = {
                left: 0,
                top: 0
            };
            while (ele) {
                pos.left += ele.offsetLeft;
                pos.top += ele.offsetTop;
                ele = ele.offsetParent;
            };
            return pos;
        },
        setScrollTop: function (value) {
            window.scrollTo(0, value);
            return value;
        },
        requestAnimFrame: (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })(),
        /**
         * 在${duration}时间内，滚动条平滑滚动到${to}指定位置
         * param {Number} to  
         * param {Number} duration 
         */
        scrollTo: function (to, duration) {
            var that = this;
            if (duration < 0) {
                this.setScrollTop(to);
                return
            }
            var diff = to - this.getScrollTop();
            if (diff === 0) return
            var step = diff / duration * 10;
            requestAnimationFrame(
                function () {
                    if (Math.abs(step) > Math.abs(diff)) {
                        that.setScrollTop(that.getScrollTop() + diff);
                        return;
                    }
                    that.setScrollTop(that.getScrollTop() + step);
                    if (diff > 0 && that.getScrollTop() >= to || diff < 0 && that.getScrollTop() <= to) {
                        return;
                    }
                    that.scrollTo(to, duration - 16);
                });
        }

    }
    /**
     * 键盘 对应的keyCode码
     */
    var keyCodeMap = {

        getKeyName: function (keycode) {
            if (keyCodeMap[keycode]) {
                return keyCodeMap[keycode];
            } else {
                console.log('Unknow Key(Key Code:' + keycode + ')');
                return '';
            }
        },

        8: 'Backspace',
        9: 'Tab',
        13: 'Enter',
        16: 'Shift',
        17: 'Ctrl',
        18: 'Alt',
        19: 'Pause',
        20: 'Caps Lock',
        27: 'Escape',
        32: 'Space',
        33: 'Page Up',
        34: 'Page Down',
        35: 'End',
        36: 'Home',
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down',
        42: 'Print Screen',
        45: 'Insert',
        46: 'Delete',

        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',

        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',

        91: 'Windows',
        93: 'Right Click',

        96: 'Numpad 0',
        97: 'Numpad 1',
        98: 'Numpad 2',
        99: 'Numpad 3',
        100: 'Numpad 4',
        101: 'Numpad 5',
        102: 'Numpad 6',
        103: 'Numpad 7',
        104: 'Numpad 8',
        105: 'Numpad 9',
        106: 'Numpad *',
        107: 'Numpad +',
        109: 'Numpad -',
        110: 'Numpad .',
        111: 'Numpad /',

        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',

        144: 'Num Lock',
        145: 'Scroll Lock',
        182: 'My Computer',
        183: 'My Calculator',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\'',

    };

    var Obj = {
        /**
         * 深层克隆
         */
        deepClone: function deepClone(values) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == values || "object" != typeof values) return values;

            // Handle Date
            if (values instanceof Date) {
                copy = new Date();
                copy.setTime(values.getTime());
                return copy;
            }

            // Handle Array
            if (values instanceof Array) {
                copy = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    copy[i] = deepClone(values[i]);
                }
                return copy;
            }

            // Handle Object
            if (values instanceof Object) {
                copy = {};
                for (var attr in values) {
                    if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy values! Its type isn't supported.");
        },
        /**
         * 判断空对象
         */
        isEmptyObject: function (obj) {
            if (!obj || typeof obj !== 'object' || Array.isArray(obj))
                return false
            return !Object.keys(obj).length
        }

    }

    var Random = {
        ranColor: function () {
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
        },
        ranNum : function (min, max) {
            return Math.floor(min + Math.random() * (max - min));
        }
    }

    var Regexp = {
        /**
         * 判断是否是邮箱
         */
        isEmail: function (str) {
            return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
        },
        /**
         * 判断是否是身份证号
         */
        isIdCard: function (str) {
            return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
        },
        /**
         * 判断是否是手机号
         */
        isPhoneNum: function (str) {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
        },
        /**
         * 判断是否是url
         */
        isUrl: function (str) {
            return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
        }


    }

    var Str = {
        /**
         * @desc 现金额转大写
         * @param  {Number} n 
         * @return {String}
         */
        digitUppercase: function (n) {
            var fraction = ['角', '分'];
            var digit = [
                '零', '壹', '贰', '叁', '肆',
                '伍', '陆', '柒', '捌', '玖'
            ];
            var unit = [
                ['元', '万', '亿'],
                ['', '拾', '佰', '仟']
            ];
            var head = n < 0 ? '欠' : '';
            n = Math.abs(n);
            var s = '';
            for (var i = 0; i < fraction.length; i++) {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);
            for (var i = 0; i < unit[0].length && n > 0; i++) {
                var p = '';
                for (var j = 0; j < unit[1].length && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元')
                .replace(/(零.)+/g, '零')
                .replace(/^整$/, '零元整');
        }

    }

    var Support = {
        /**
        * 
        * @desc 判断浏览器是否支持webP格式图片
        * @return {Boolean} 
        */
        isSupportWebP: function () {
            return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }

    }

    var Time = {
        /**
        * @desc   格式化${startTime}距现在的已过时间(距离传入的时间经多了多久)
        * @param  {Date} startTime 
        * @return {String}
        */
        formatPassTime: function (startTime) {
            var currentTime = Date.parse(new Date()),
                time = currentTime - startTime,
                day = parseInt(time / (1000 * 60 * 60 * 24)),
                hour = parseInt(time / (1000 * 60 * 60)),
                min = parseInt(time / (1000 * 60)),
                month = parseInt(day / 30),
                year = parseInt(month / 12);
            if (year) return year + "年前"
            if (month) return month + "个月前"
            if (day) return day + "天前"
            if (hour) return hour + "小时前"
            if (min) return min + "分钟前"
            else return '刚刚'
        },
        /**
        * 
        * @desc   格式化现在距${endTime}的剩余时间
        * @param  {Date} endTime  
        * @return {String}
        */
        formatRemainTime: function (endTime) {
            var startDate = new Date(); //开始时间
            var endDate = new Date(endTime); //结束时间
            var t = endDate.getTime() - startDate.getTime(); //时间差
            var d = 0,
                h = 0,
                m = 0,
                s = 0;
            if (t >= 0) {
                d = Math.floor(t / 1000 / 3600 / 24);
                h = Math.floor(t / 1000 / 60 / 60 % 24);
                m = Math.floor(t / 1000 / 60 % 60);
                s = Math.floor(t / 1000 % 60);
            }
            return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
        }

    }

    var Url = {
        /**
         * 
         * @desc   url参数转对象
         * @param  {String} url  default: window.location.href
         * @return {Object} 
         */
        parseQueryString: function (url) {
            url = url == null ? window.location.href : url
            var search = url.substring(url.lastIndexOf('?') + 1)
            if (!search) {
                return {}
            }
            return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        },
        /**
        * 
        * @desc   对象序列化
        * @param  {Object} obj 
        * @return {String}
        */
        stringfyQueryString: function (obj) {
            if (!obj) return '';
            var pairs = [];

            for (var key in obj) {
                var value = obj[key];

                if (value instanceof Array) {
                    for (var i = 0; i < value.length; ++i) {
                        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                    }
                    continue;
                }

                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }

            return pairs.join('&');
        }

    }

    var Func = {
        /**
         * @desc   函数节流。
         * 适用于限制`resize`和`scroll`等函数的调用频率
         *
         * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
         * @param  {Boolean}   noTrailing     可选，默认为false。
         *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
         *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
         *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
         * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
         *                                    执行去节流功能时，调用`callback`。
         * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
         *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
         *
         * @return {Function}  新的节流函数
         */
        throttle: function (delay, noTrailing, callback, debounceMode) {

            // After wrapper has stopped being called, this timeout ensures that
            // `callback` is executed at the proper times in `throttle` and `end`
            // debounce modes.
            var timeoutID;

            // Keep track of the last time `callback` was executed.
            var lastExec = 0;

            // `noTrailing` defaults to falsy.
            if (typeof noTrailing !== 'boolean') {
                debounceMode = callback;
                callback = noTrailing;
                noTrailing = undefined;
            }

            // The `wrapper` function encapsulates all of the throttling / debouncing
            // functionality and when executed will limit the rate at which `callback`
            // is executed.
            function wrapper() {

                var self = this;
                var elapsed = Number(new Date()) - lastExec;
                var args = arguments;

                // Execute `callback` and update the `lastExec` timestamp.
                function exec() {
                    lastExec = Number(new Date());
                    callback.apply(self, args);
                }

                // If `debounceMode` is true (at begin) this is used to clear the flag
                // to allow future `callback` executions.
                function clear() {
                    timeoutID = undefined;
                }

                if (debounceMode && !timeoutID) {
                    // Since `wrapper` is being called for the first time and
                    // `debounceMode` is true (at begin), execute `callback`.
                    exec();
                }

                // Clear any existing timeout.
                if (timeoutID) {
                    clearTimeout(timeoutID);
                }

                if (debounceMode === undefined && elapsed > delay) {
                    // In throttle mode, if `delay` time has been exceeded, execute
                    // `callback`.
                    exec();

                } else if (noTrailing !== true) {
                    // In trailing throttle mode, since `delay` time has not been
                    // exceeded, schedule `callback` to execute `delay` ms after most
                    // recent execution.
                    //
                    // If `debounceMode` is true (at begin), schedule `clear` to execute
                    // after `delay` ms.
                    //
                    // If `debounceMode` is false (at end), schedule `callback` to
                    // execute after `delay` ms.
                    timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
                }

            }

            // Return the wrapper function.
            return wrapper;

        },
        debounce: function (delay, atBegin, callback) {
            return callback === undefined ? this.throttle(delay, atBegin, false) : this.throttle(delay, callback, atBegin !== false);
        }
    }

    var lihw = {
        Device: Device,
        Cookie: Cookie,
        Class: Class,
        Dom: Dom,
        Other: Other,
        keyCodeMap: keyCodeMap,
        Obj: Obj,
        Random: Random,
        Regexp: Regexp,
        Str: Str,
        Support: Support,
        Time: Time,
        Url: Url,
        Func: Func
    }

    window.lihw = lihw
})()