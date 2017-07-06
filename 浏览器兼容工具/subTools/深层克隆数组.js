/**
 * 深层克隆数组封装
 * @param arr
 * @returns {Array}
 */
function deepClone(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}