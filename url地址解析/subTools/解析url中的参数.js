		/**
		 * 将url中的参数解析成一个对象，不传入的话报错
		 * @param  {[type]} url [要解析的url]
		 * @return {[type]}     [返回的对象]
		 */
		function url2Obj(url){
			if(!url) {
				throw "please don't submit a null url";
				console.log('hh')
				return;
			}
			var parseObj = {};
			var parseStr = url.split('?')[1];
			var parseArr = parseStr.split('&');
			for(var i =0;i < parseArr.length;i++){
				var subArr = parseArr[i].split('=');
				parseObj[subArr[0]] = subArr[1];
			}
			return parseObj;
		}