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
function getStyle(obj,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(obj)[attr];
    }else{
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