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
