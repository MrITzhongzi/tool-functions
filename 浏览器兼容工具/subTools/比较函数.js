
/**
 *
 * @param arr
 * @param fn (传入的比较函数)
 * @returns {*}
 */
function mySort(arr, fn) {
    for (var i = 0; i < arr.length - 1; i++) {
        var flag = true;
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (fn(arr[j], arr[j + 1]) > 0) { //比较规则让用户来定
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}