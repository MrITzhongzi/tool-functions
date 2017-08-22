/**
 * 数字滚动封装，滚动到指定的数字
 * @param {*} ele 目标dom元素
 * @param {*} targetNumber 要滚动到的数字
 * @param {*} duration 动画时间
 */
function numberRoll(ele,targetNumber,duration){
      var type = ele.tagName
      var firstValue
      var step
      var frequency = duration / 1000
      if(type === "INPUT"){
          if(isNaN(Number(targetNumber))){
            throw new Error('目标数字传递错误')
          }
          if(!isNaN(Number(ele.value))){
            firstValue = !!ele.value ? Number(ele.value) : 0
          }
      }else{
        if(isNaN(Number(targetNumber))){
          throw new Error('目标数字传递错误')
        }
        if(!isNaN(Number(ele.innerHTML))){ 
            firstValue = Number(ele.innerHTML)
        }
      }
      step = (Number(targetNumber) - firstValue) / 1000
      if(type === "INPUT"){
        var numberTimer = setInterval(function(){
          firstValue += step
          ele.value = firstValue
          if(Math.abs(Number(targetNumber) - firstValue) <= step){
            ele.value = targetNumber
            clearInterval(numberTimer)
          }
          console.log(1)
        },frequency)
      }else{
        var numberTimer = setInterval(function(){
          firstValue += step
          ele.innerHTML = firstValue
          if(Math.abs(Number(targetNumber) - firstValue) <= step){
            ele.innerHTML = targetNumber
            clearInterval(numberTimer)
          }
          console.log(2)
        },frequency)
      }
      
  }