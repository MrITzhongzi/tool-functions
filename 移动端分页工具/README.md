该工具使用方法：

    var obj = { 
      template: '<p>你好</p>',   //要渲染的页面结构
      el: '.container ul',    //页面荣区，盛放要被渲染的几条狗
      refreshLength: 50, //距离底部多高刷新页面
    }
   new Pagging(obj);
   
   注意： 该插件是基于jqyuery的，在引入jq和改js文件之后，新建一个对象，传入指定的参数即可
   
