/**
 * 封装获取页面滚动座标的兼容函数(scrollTop,scrollLeft)
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}