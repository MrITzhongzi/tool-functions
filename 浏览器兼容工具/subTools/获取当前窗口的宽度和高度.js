/**
 * 获取当前窗口的宽度和高度
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client(){
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight||document.body.clientHeight||0
    };
}