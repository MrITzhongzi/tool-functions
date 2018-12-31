/*
* 添加到购物车动画 脚本
* */

/***
 * 动画轨迹控制
 * @param addBtnDom 增加按钮的dom元素或者选择器
 * @param shopCarDom 购物车的dom元素或选择器
 */
function controllPath(addBtn, shopCar) {
    var addBtnDom = null,
        shopCarDom = null;
    if(typeof addBtn === "string"){
       addBtnDom = document.querySelector(addBtn);
    } else if(addBtn instanceof HTMLElement){
        addBtnDom = addBtn
    } else {
        alert("传入的参数错误： 第一个参数应为增加按钮的dom元素或该元素的选择器。");
        return;
    }

    if(typeof shopCar === "string"){
        shopCarDom = document.querySelector(shopCar);
    } else if(shopCar instanceof HTMLElement){
        shopCarDom = shopCar;
    }else {
        alert("传入的参数错误： 第二个参数应为购物车的dom元素或该元素的选择器。");
        return;
    }

    // 获取两个dom的位置
    var addBtnposition = addBtnDom.getBoundingClientRect();
    var shopCarPosition = shopCarDom.getBoundingClientRect();
    var addBtnCenterX = (addBtnposition.left + addBtnposition.right) / 2;
    var addBtnCenterY = (addBtnposition.top + addBtnposition.bottom) / 2;
    var shopCarCenterX = (shopCarPosition.left + shopCarPosition.right) / 2;
    var shopCarCenterY = (shopCarPosition.top + shopCarPosition.bottom) / 2;
    //计算增加按钮 是在 相对于购物车的 左边还是右边（用于控制后面的移动方向）
    var relativePosition = addBtnCenterX > shopCarCenterX ? -1 : 1;

    // 获取连个dom之间的距离
    var xDistance = Math.abs(addBtnCenterX - shopCarCenterX);
    var yDistance = Math.abs(addBtnCenterY - shopCarCenterY);

    // 绘制小球并设置其位置
    var ballDom = drawBall();
    ballDom.style.top = addBtnCenterY + "px";
    ballDom.style.left = addBtnCenterX + "px";
    document.body.appendChild(ballDom);
    /*
     * 根据一元二次方程的轨迹求出对象的系数 y = ax^2 + bx + c
     *  var coefficientC = 0;
     *  var coefficientB = 0;
     *  var coefficientA = yDistance / Math.pow(xDistance, 2);
     */
    //小球的横竖坐标
    var xAbscissa = 0, yAbscissa = 0;

    //设置移动路径
    var ballTimer = setInterval(function () {
        //每次重新坐标
        xAbscissa += 5 * relativePosition;
        yAbscissa = (yDistance / Math.pow(xDistance, 2)) * Math.pow(xAbscissa, 2);
        ballDom.style.top = addBtnCenterY + yAbscissa + "px";
        ballDom.style.left = addBtnCenterX + xAbscissa + "px";
        //检查是否到达终点
        var surplusDistance = parseInt(ballDom.style.left) - shopCarCenterX;
        if (Math.abs(surplusDistance) <= 10) {
            clearInterval(ballTimer);
        }
    }, 25);
}

/*
* 绘制小球
* */
function drawBall() {
    var ballDom = document.createElement("div");
    ballDom.style.width = "20px";
    ballDom.style.height = "20px";
    ballDom.style.border = "1px solid #ccc";
    ballDom.style.background = "#73dd51";
    ballDom.style.borderRadius = "50%";
    ballDom.style.position = "absolute";
    return ballDom;
}
