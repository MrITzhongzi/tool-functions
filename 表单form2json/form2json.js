/**
 * lihongwei
 * 2017/8/30
 */
(function () {
  var reObj = {}
  function form2JSon (id) {
    return new FormToJson(id)
  }
  function FormToJson (id) {
    this.init(id)
    return returnData()
  }
  var prototype = {
    init: function (id) {
      var box = document.querySelector('#form')
      traversal(box)
    }
  }
  function traversal (boxDom) {
    var doms = boxDom.children
    Array.prototype.forEach.call(doms, function (element) {
      if (element.tagName === 'INPUT') {
        if (element.type === 'radio') {
          dealRadio(element)
        } else if (element.type === 'checkbox') {
          dealCheckbox(element)
        } else {
          isEmpty(element)
        }
      } else if (element.tagName === 'SELECT') {
        var selectName = element.getAttribute('name')
        var selectVal = element.value
        reObj[selectName] = selectVal
      } else if (element.tagName === 'TEXTAREA') {
        var textareaName = element.getAttribute('name')
        var textareaVal = element.value
        reObj[textareaName] = textareaVal
      } else {
        if (element.children.length !== 0) {
          traversal(element)
        }
      }
    })
  }
  function dealRadio (element) {
    var radioName = element.getAttribute('name')
    var radioEles = document.querySelectorAll('input[name="' + radioName + '"]')
    for (var j = 0; j < radioEles.length; j++) {
      if (radioEles[j].checked) {
        reObj[radioName] = radioEles[j].value
      }
    }
  }
  function dealCheckbox (element) {
    var checkArr = []
    var checkName = element.name
    var checkEles = document.querySelectorAll('input[name="' + checkName + '"]')
    for (var i = 0; i < checkEles.length; i++) {
      if (checkEles[i].checked) {
        checkArr.push(checkEles[i].value)
      }
    }
    reObj[checkName] = checkArr
  }
  /**
   * 如果 input = text 是空值的话就过滤掉
   * @param {*} element 
   */
  function isEmpty (element) {
    var name = element.getAttribute('name')
    var value = element.value
    if (value) {
      reObj[name] = value
    }
  }
  function returnData () {
    return reObj
  }
  /**
   * 暴露的借口
   * form2JSon： 传入盒子的id 返回 由input的name和value组成的 对象
   * 
   */
  function formInterface () {
    return {
      form2JSon: form2JSon
    }
  }
  FormToJson.prototype = prototype
  window.formInterface = formInterface
})()
