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