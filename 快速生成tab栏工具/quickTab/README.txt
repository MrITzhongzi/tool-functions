
插件使用文档：
    1、引入js文件，例如：  <script src="./quick.tab.js"></script>
    2、在页面中建立两个容器标签：
            <div id="app">
                <!--这里玄滩nav-->
            </div>
            <div id="container">
                <!--这里是渲染nav对应的内容-->
                <section index="0" style="flex-grow: 1; display: none;">0</section>
                <section index="1" style="flex-grow: 1; display: none;">1</section>
                <section index="2" style="flex-grow: 1; display: none;">2</section>
                <section index="3" style="flex-grow: 1; display: none;">3</section>
            </div>
    3、新建一个对象： new QuickTab(obj);
        其中  var obj = {
                    navEl: "#app",
                    navBgc:"#fff",
                    contentEl: "#container",
                    contentHeight: "70vh",
                    navColor: "#3878bb",
                    number: 4,
                    fontSize: "16px",
                    tabName: ['桌子1','桌子2','桌子3','桌子4'],
                    height: "100px",
                    lineHeight: "100px",
                    seletedBottomColor: "#0096ff"
              }



    参数配置说明：

    navEl  是tab栏的容器，传入id选择器
    navBgc 导航栏的背景色
    contentEl 是每个tab栏对应的内容的容器，传入id选择器
    contentHeight:  盛放内容容器的高度
    navColor 是tab栏的字体颜色
    number： 是有几个tab栏
    tabName： 是个数组，每一栏的名字
    fontSize: 控制的是 nav 的字体大小。
    height: 是控制tab栏的高度
    lineHeight: 控制tab栏的行高
    seletedBottomColor 被选中的 nav 标签 的地步下划线颜色

