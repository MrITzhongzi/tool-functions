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