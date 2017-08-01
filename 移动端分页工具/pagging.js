
(function($){
  var pageHeight;
  var scrollHeight;
  var scrollTop;
  var refresh; //距离底部多高刷新
  var $ulEle; //ul 增加 dom 的容器


  var Pagging = function(obj){
    
    //判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了
    if(!(this instanceof Pagging)){
      //  var defaultObj = {
      //       template: '<p>你好</p>',
      //       el: '.container ul',
      //       refreshLength: 50, //距离底部多高刷新页面
      //     }
        return new Pagging(obj);
    }

      //初始化
      this._init(obj);
  }
  
  Pagging.prototype = {
    _init: function(obj){
     
      this.extend(obj)
      //初始化数据
      this.initData(obj);
      //绑定事件
      this.bindEvent(this.dataObj);
    },
    initData: function(obj){
      
      refresh = obj.refreshLength;
    },
    extend: function(obj){
      var dataObj = {};
      for(key in obj){
        dataObj[key] = obj[key]
      }
      this.dataObj = dataObj;
    },
    bindEvent: function(obj){
      var that = this;
      $('.container').on('touchstart',function(){
        pageHeight = $(window).height();
        scrollHeight = $(document).height();
        scrollTop = $(window).scrollTop();
        console.log('start')
      });
      $('.container').on('touchmove',function(){
        if(scrollHeight > pageHeight){
          if(scrollHeight - scrollTop - pageHeight < refresh){
            //加载数据
            that.drawPage(obj)
          }
        }
      });
      $('.container').on('touchend',function(){
          console.log('end')
      });
    },
    drawPage: function(obj){
      console.log(JSON.stringify(obj))
      var $dom = $(obj.el);
      $dom.append(obj.template);
    }
  }
  //暴露全局变量
  window.Pagging = Pagging

})($)