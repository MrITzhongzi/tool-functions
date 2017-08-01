var template = '<p>你好</p>';
(function($){
  var pageHeight;
  var scrollHeight;
  var scrollTop;
  var refresh; //距离底部多高刷新
  var $ulEle; //ul 增加 dom 的容器


  var Pagging = function(){
    
    //判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了
    if(!(this instanceof Pagging)){
        return new Pagging();
    }

      //初始化
      this._init();
  }
  
  Pagging.prototype = {
    _init: function(){
     
      //初始化数据
      this.initData();
      //绑定事件
      this.bindEvent();
    },
    initData: function(){
       refresh = 50;
      $ulEle = $('.container ul');
    },
    bindEvent: function(){
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
            console.log('move')
            $ulEle.append(template);
          }
        }
      });
      $('.container').on('touchend',function(){
          console.log('end')
      });
    }
  }
  //暴露全局变量
  window.Pagging = Pagging

})($)