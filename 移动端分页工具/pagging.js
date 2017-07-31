var template = '<p>你好</p>';
(function($){
  var pageHeight;
  var scrollHeight;
  var scrollTop;
  var refresh = 50;
  var $ulEle = $('.container ul');


  $('.container').on('touchstart',function(){
      pageHeight = $(window).height();
      scrollHeight = $(document).height();
      scrollTop = $(window).scrollTop();

  });
  $('.container').on('touchmove',function(){
    if(scrollHeight > pageHeight){
      if(scrollHeight - scrollTop - pageHeight < refresh){
        //加载数据
        
      }
    }
  });
 $('.container').on('touchend',function(){
    console.log('end')
  });
})($)