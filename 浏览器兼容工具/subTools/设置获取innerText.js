/**
 * 设置获取innerText函数封装
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (element.innerText == undefined) {
        element.textContent = content;
    } else {
        element.innerText = content;
    }
}