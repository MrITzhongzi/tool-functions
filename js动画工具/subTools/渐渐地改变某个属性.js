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
