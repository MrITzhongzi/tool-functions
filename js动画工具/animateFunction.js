/**
 * Created by Administrator on 2016/12/30.
 */

/**
 *  缓动框架
 * @param obj
 * @param json
 * @param fn
 */
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {
                //opacity ??С??
                var leader = getStyle(obj, k) * 100;//opacity???????????????
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacity??е?λ
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//????????????????????
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}


/**
 * 渐渐地改变某个属性
 * @param obj
 * @param attr
 * @param target
 */
function changeAttr(obj, attr, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //var leader = obj.offsetLeft;//???obj??attr????????
        var leader = parseInt(getStyle(obj, attr)) || 0;//auto
        var step = (target - leader) / 5;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style[attr] = leader + "px";
        if (leader === target) {
            clearInterval(obj.timer);
        }
    }, 15);
}

/**
 * 获取计算后的样式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}


/**
 * 缓动动画
 * @param obj
 * @param target
 */
function bufferAnimate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + "px";
        if (leader === target) {
            clearInterval(obj.timer);
        }
    }, 15);
}

/**
 * 平均速度的动画函数
 * @param obj
 * @param target
 */
function averageAnimate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = target > leader ? step : -step;
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    }, 15);
}

/**
 * 数字滚动封装，滚动到指定的数字
 * @param {*} ele 目标dom元素
 * @param {*} targetNumber 要滚动到的数字
 * @param {*} duration 动画时间
 */
function numberRoll(ele, targetNumber, duration) {
    var type = ele.tagName
    var firstValue
    var step
    var frequency = duration / 1000
    if (type === "INPUT") {
        if (isNaN(Number(targetNumber))) {
            throw new Error('目标数字传递错误')
        }
        if (!isNaN(Number(ele.value))) {
            firstValue = !!ele.value ? Number(ele.value) : 0
        }
    } else {
        if (isNaN(Number(targetNumber))) {
            throw new Error('目标数字传递错误')
        }
        if (!isNaN(Number(ele.innerHTML))) {
            firstValue = Number(ele.innerHTML)
        }
    }
    step = (Number(targetNumber) - firstValue) / 1000
    if (type === "INPUT") {
        var numberTimer = setInterval(function () {
            firstValue += step
            ele.value = firstValue
            if (Math.abs(Number(targetNumber) - firstValue) <= step) {
                ele.value = targetNumber
                clearInterval(numberTimer)
            }
            console.log(1)
        }, frequency)
    } else {
        var numberTimer = setInterval(function () {
            firstValue += step
            ele.innerHTML = firstValue
            if (Math.abs(Number(targetNumber) - firstValue) <= step) {
                ele.innerHTML = targetNumber
                clearInterval(numberTimer)
            }
            console.log(2)
        }, frequency)
    }

}