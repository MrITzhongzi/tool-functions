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