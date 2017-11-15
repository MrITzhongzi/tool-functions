//  XPath提取工具
(function(global){
	function XPath(){
		this.xpath = [];
		this.thisPath = '';
		this.similarPath = '';
	}
	// 递归遍历该查询节点在DOM树中的路径，并记录相关的路径信息
	var generateXpath = function(selector){
	    if(!selector)
	    	return ;
		var element;
	    if(typeof selector == "string"){
		    element = document.querySelectorAll(selector)[0];
	    }else if(selector !== document && selector !== window){
	        element = selector;
	    }else{
	    	return this.xpath.join('');
		}
		
		var elementId = element.getAttribute("id");
		if(elementId){
			this.xpath.unshift("//*[@id=\'" + elementId + "\']");
		}else{
			var parent = element.parentNode;
			
			var index = 0, indexStr = "", findIndex = false, className = "";  // indexStr  是dom在兄弟元素中间的索引
			var tagName = element.tagName.toLowerCase();
			
			var elementClass = element.className;
			if(elementClass){
				className = "[@class=\'" + elementClass + "\']";
			}
			if(parent){
				if(tagName !== "html" && tagName !== "body"){
					var children = [].slice.call(parent.children);  //children 存储的是兄弟节点
					for(var i = 0; i < children.length; i++){
						if(children[i].tagName === element.tagName){
							index ++;
							if(children[i] === element){
								findIndex = true;   //findIndex 是记录该dom节点在
								break;
							}
						}
					}
					if(findIndex){
						indexStr = "[" + index + "]";
					}
				}
				this.xpath.unshift('/' + tagName + className + indexStr);
				generateXpath.call(this, parent);
			}else{
				this.xpath.unshift('/' + tagName + className);
			}
		}
		return this.xpath.join('');
	}
	// 通过xpath或者上次查询结果获取元素
	XPath.prototype.getElements = function(xpath){
		
		var nodes, elements = [];
		nodes = document.evaluate(xpath || this.thisPath, document, null, XPathResult.ANY_TYPE, null);
		
		var element = nodes.iterateNext();
		while(element){
			elements.push(element);
			element = nodes.iterateNext();
		}
		return elements;
	}
	// 通过选择器或者DOM元素，查询特定元素的XPath
	XPath.prototype.getPath = function(selector){
		
		this.xpath = [];
		this.thisPath = '';
		this.thisPath = generateXpath.call(this, selector);
		return this;
	}
	XPath.prototype.getSimilarElements = function(selector){
		this.getPath(selector);
		this.similarPath = '';
		
		this.xpath.forEach(function(o, i){
			var tmp;
			if(i < this.xpath.length-1){
				tmp = o.replace(/\[[0-9]+\]+/gi, '');
				tmp = tmp.replace(/\[\@class=\"active\"\]/gi, '');
				
			}else{
				tmp = o.replace(/\[\@class=\"[\s\S]+\"\]/gi, '');
				if(~tmp.indexOf('li')){
					tmp = tmp.replace(/\[[0-9]+\]+/gi, '');
				}
			}
			this.similarPath += tmp;

		}.bind(this));
		// console.log(this.similarPath)	
		return this.getElements(this.similarPath);
	}
	global._xpath = new XPath();
})(window);