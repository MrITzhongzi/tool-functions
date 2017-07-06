/**
 * Created by Mr. hong on 2016/12/22.
 */
/**
 * 获取当前窗口的宽度和高度
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client(){
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight||document.body.clientHeight||0
    };
}

/**
 * 封装获取页面滚动座标的兼容函数(scrollTop,scrollLeft)
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 *  获取指定格式的日期字符串
 * @param d
 * @returns {string}
 */
function myGetTimeString(d) {
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var date = d.getDate();
    date = date < 10 ? "0" + date : date;
    var hour = d.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    var minute = d.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var second = d.getSeconds();
    second = second < 10 ? "0" + second : second;
    var str = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return str;
}

/**
 *
 * @param arr
 * @param fn (传入的比较函数)
 * @returns {*}
 */
function mySort(arr, fn) {
    for (var i = 0; i < arr.length - 1; i++) {
        var flag = true;
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (fn(arr[j], arr[j + 1]) > 0) { //比较规则让用户来定
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}

/**
 * 封装通过类名获取元素集合的兼容函数
 * @param element
 * @param className
 * @returns {*}
 */
function myGetElementsByClassName(element, className) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        var filterArr = [];
        var elements = element.getElementsByTagName("*");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className.indexOf(className) !== -1) {
                filterArr.push(elements[i]);
            }
        }
        return filterArr;
    }
}

/**
 * 获取innerText函数封装（单纯的innerText有兼容问题）
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (element.innerText == undefined) {
        return element.textContent;
    } else {
        return element.innerText;
    }
}
/**
 * 设置获取innerText函数封装
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (element.innerText == undefined) {
        element.textContent = content;
    } else {
        element.innerText = content;
    }
}

/**
 * 追加类名函数封装
 * @param element
 * @param value
 */

function addClass(element, value) {
    var newClassName;
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += "";
        newClassName += value;
        element.className = newClassName;
    }
}

/**
 * 用新类名替换原来某个类名()
 * @param element
 * @param oldname
 * @param newname
 * @returns {*}
 */

function replaceClassName(element, oldname, newname) {
    var str = element.className;
    var arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if(arr[i] === oldname){
            arr[i] = newname;
        }
    }
    str = arr.join(" ");
    element.className = str;
}

/**
 * 深层克隆数组封装
 * @param arr
 * @returns {Array}
 */
function deepClone(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}

/**
 * window.onload封装，可以在页面加载完成后加载多个函数
 * @param func
 */

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * 封装在某节点之后插入元素代码块
 * @param newElement
 * @param targetElement
 */

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/**
 * 封装 获取上一个兄弟元素的兼容函数
 * previousElementSibling在ie9以下的版泵都有兼容问题，对其封装解决兼容问题
 * @param element
 * @returns {*}
 */
function getPrevElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var prev = element.previousSibling;
        while (prev && 1 !== prev.nodeType) {
            prev = prev.previousSibling;
        }
        return prev;
    }
}

/**
 * 封装 获取下一个兄弟元素的兼容函数
 * nextElementSibling在ie9以下的版泵都有兼容问题，对其封装解决兼容问题
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;//如果获取到了就返回
    } else {
        //如果没获取到 就用节点的方式来处理
        var next = element.nextSibling;//下一个兄弟节点
        //如果 有 并且 不是我想要的 才继续循环
        while (next && 1 !== next.nodeType) {
            next = next.nextSibling;
        }
        return next;
    }
}

/**
 * 封装获取第一个子元素的兼容函数
 * @param element
 * @returns {*}
 */
function getFirstChildElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && 1 !== node.nodeType) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * 封装获取最后一个子元素的兼容函数
 * @param element
 * @returns {*}
 */
function getLastChildElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && 1 !== node.nodeValue) {
            node = node.previousSibling;
        }
        return node;
    }
}