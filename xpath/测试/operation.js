/**
 * 设置获取到的相似dom 的样式
 */
(function () {
    var selectedElements = []; //保存 所有类型的选中的标签集合
    var all = Array.prototype.slice.call(document.querySelectorAll("body *"));
    var stylenum = 0;

    document.body.oncontextmenu = function () { return false; } //取消鼠标右击

    var headEle = document.querySelector('head')
    var styleTag = document.createElement('style')
    styleTag.innerHTML = `
    *[highlight="true"],
    
            *[highlight-add0="true"] {
                outline: 3px solid #61DA67 !important;
            }
            *[highlight-add1="true"] {
                outline: 3px solid rgb(133, 97, 218) !important;
            }
            *[highlight-add2="true"] {
                outline: 3px solid rgb(218, 170, 97) !important;
            }
            *[highlight-add3="true"] {
                outline: 3px solid rgb(224, 122, 27) !important;
            }
            *[highlight-add4="true"] {
                outline: 3px solid rgb(11, 12, 11) !important;
            }
    
            *[highlight="true"]{
                outline-color: #fd7373 !important;
            }
            *[highlight-add-single="true"]{
                /*outline: 0 !important;*/
                background-color: #12C4FF !important;
                color: #fff !important;
                box-shadow: 0 0 10px #000 !important;
            }`

            headEle.appendChild(styleTag)
             

    all.forEach(function (o, i) {
        o.onmouseover = function (e) {
            e.stopPropagation();
            o.setAttribute('highlight', "true");
        }
        o.onmouseout = function () {
            o.removeAttribute('highlight');
        }
        o.onmousedown = function (e) {
            e.stopPropagation();
            var elements, text = [];
            if (e.button == 0) { // 选择相似元素   0鼠标左键点击  1 中键点击 2 右键点击
                var currentStyle = judgeAttr(this,'highlight-add');
                if (currentStyle) { // 已被标亮则删除
                    // this.classList.remove('highlight_add');
                    this.removeAttribute('highlight');
                    elements = _xpath.getSimilarElements(o);
                    elements.forEach(function (element) {
                        
                        element.removeAttribute(currentStyle);
                    });

                    selectedElements.forEach(function (e, i) {
                        if (e.xpath === _xpath.similarPath) {
                            selectedElements.splice(i, 1);
                        }
                    })
                } else { // 未标亮则添加
                    // this.classList.add('highlight_add');
                    elements = _xpath.getSimilarElements(o);
                    
                    // 只保留单个结果时，将原有的样式取消
                    // if(selectedElements.length > 0){
                    //     selectedElements.forEach(function(o, i){
                    //         o.elements.forEach(function(e){
                    //             e.removeAttribute('highlight-add');
                    //             e.removeAttribute('highlight-add-single');
                    //         });
                    //     });
                    // }

                    //点亮标签
                    elements.forEach(function (element) {
                        element.setAttribute('highlight-add' + stylenum, "true");

                        text.push(element.innerText);
                    });

                    stylenum++;  //每次点击颜色不同

                    //_xpath.similarPath 路径 elements  选中的元素（伪数组）  text 选中元素的文字（存在数组里）
                    selectedElements[0] = { xpath: _xpath.similarPath, elements: elements, text: text };
                    // selectedElements.push({xpath: _xpath.similarPath, elements: elements, text: text});
                }
            } else if (e.button == 2) { // 选择单个元素
                if (this.getAttribute('highlight-add-single')) { // 已被标亮则删除
                    // this.classList.remove('highlight_add');
                    this.removeAttribute('highlight');
                    this.removeAttribute('highlight-add-single');

                    selectedElements.forEach(function (e, i) {
                        if (e.xpath === _xpath.getPath(this)) {
                            selectedElements.splice(i, 1); //从标签集合 删除 点击的元素
                        }
                    })
                } else { // 未标亮则添加
                    // this.classList.add('highlight_add');
                    // 只保留单个结果时，将原有的样式取消

                    if (selectedElements.length > 0) {
                        selectedElements.forEach(function (o, i) {
                            o.elements.forEach(function (e) {

                                e.removeAttribute('highlight-add-single');
                                e.removeAttribute(e.judgeAttr(e,"highlight-add"));
                            });
                        });
                    }
                    this.setAttribute('highlight-add-single', "true");
                    text.push(this.innerText);
                    selectedElements[0] = { xpath: _xpath.getPath(this), elements: [this], text: text };
                    // selectedElements.push({xpath: _xpath.getPath(this), elements: elements, text: text});
                }
            }
            
            var selectedElementsText = selectedElements.map(function (o) {
                return { xpath: o.xpath, text: o.text };
            })

            window.postMessage(selectedElementsText, '*');

            // window.top.setSelectedElements(selectedElementsText);
        }
    });

    /**
     * 属性存在就返回 true 去除高亮
     * 属性不存在返回 false 使元素高亮               
     */
    function judgeAttr(dom,attrName) {
        var flag=false;    
        
        for (var i = 0; i <= stylenum; i++) {   
            if(dom.getAttribute(attrName + i)){
                flag = attrName + i
                break;
            }
        } 
        if(stylenum == 5){
            stylenum = 0
        }
        return flag;
    }

    // window.addEventListener('message', function(e){
    //     console.log(e);
    // }, false);


})();