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