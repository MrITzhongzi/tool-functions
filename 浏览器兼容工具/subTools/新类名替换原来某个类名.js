/**
 * 用新类名替换原来某个类名()
 * @param element
 * @param oldname
 * @param newname
 * @returns {*}
 */

function replaceClassName(element, oldname, newname) {
    var str = element.className;
    var arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if(arr[i] === oldname){
            arr[i] = newname;
        }
    }
    str = arr.join(" ");
    element.className = str;
}