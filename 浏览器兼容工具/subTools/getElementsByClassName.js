
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