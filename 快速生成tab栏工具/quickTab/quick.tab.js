
(function (win) {
    //全局对象
    var globalObj = {}
    //默认参数
    var defaultParame = {
        navColor: "#000",
        number: 4,
        tabName: ['标签1','标签2','标签3','标签4'],
        height: "40px",
        lineHeight: "40px",
        fontSize: "14px"
    }
    function QuickTab(requireObj) {
        requireObj = Object.assign(defaultParame,requireObj)

        this.init(requireObj)
    }
    var quickTabProtoType = {
        init: function (requireObj) {
            this.initData(requireObj)
            this.initDom()
            this.setStyle()
            this.bindEvent()
        },

        initData: function (requireObj) {
            globalObj = Object.assign({},requireObj)
            globalObj.navEl  = document.querySelector(requireObj.navEl)
            globalObj.contentEl = document.querySelector(requireObj.contentEl)
            globalObj.conSections = globalObj.contentEl.querySelectorAll("section")
        },

        initDom: function () {
            var tabNumber = globalObj.number
            var tabName = globalObj.tabName
            var container = globalObj.navEl
            var ulEle = document.createElement('ul')
            for(var i = 0;i < tabNumber;i++){
                var li = document.createElement('li')
                li.innerHTML = tabName[i]
                li.setAttribute('index',i)
                ulEle.appendChild(li)
            }

            container.appendChild(ulEle)
        },
        setStyle: function () {
            var that = this
            var container = globalObj.navEl
            var contentBox = globalObj.contentEl
            var ulEle = container.querySelector('ul')
            var lis = container.querySelectorAll('li')
            var sectionEle = contentBox.querySelectorAll('section');
            var ulHeight = globalObj.height

            var containerCss = {
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                color: globalObj.navColor,
                fontSize: globalObj.fontSize

            }
            var contentBoxCss = {
                flexGrow: 1
            }
            var ulEleCss = {
                padding: 0,
                margin: 0,
                overflow: "hidden",
                listStyle: "none",
                display: "flex",
                textAlign: 'center',
                height: ulHeight,
                lineHeight: ulHeight
            }
            var liEleCss = {
                padding: 0,
                margin: 0,
                flexGrow: 1,
                borderBottom: "2px solid transparent",
                cursor: "pointer"
            }
            var firstLi = {
                "borderBottom": "2px solid red"
            }

            var sectionEleCss = {
                display: "none"
            }

            this.setCss(container,containerCss)
            this.setCss(contentBox,contentBoxCss)
            this.setCss(ulEle,ulEleCss)
            lis.forEach(function (liElement) {
                that.setCss(liElement,liEleCss)
            })
            this.setCss(lis[0],firstLi) //设置第一个li标签特殊样式
            sectionEle.forEach(function (section) {
                that.setCss(section,sectionEleCss)
            })
            this.setCss(sectionEle[0],{display: "block"})

        },
        setCss: function (el, styleObj) {
            for(var key in styleObj){
                el.style[key] = styleObj[key]
            }
        },
        bindEvent: function () {
            var that = this
            var lis = globalObj.navEl.querySelectorAll("li")
            var sections = globalObj.conSections

            lis.forEach(function (li) {
                li.onclick = function () {
                    lis.forEach(function (li) {
                        that.setCss(li,{borderBottom:"2px solid transparent"})
                    })
                    that.setCss(this,{borderBottom: "2px solid red"})
                    var liIndex = this.getAttribute("index")

                    sections.forEach(function (section) {
                        var currentIndex = section.getAttribute('index')
                        that.setCss(section,{display: "none"})
                        if(currentIndex == liIndex){
                            that.setCss(section,{display: "block"})
                        }
                    })
                }
            })
        }
    }

    //设置构造函数的原型
    QuickTab.prototype = quickTabProtoType

    //暴露构造函数
    window.QuickTab = QuickTab
}(window))