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