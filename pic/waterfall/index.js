window.onload = function(){
	waterfall("main","box");
	var dataInt = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"}]};//模拟要加载的数据
	window.onscroll = function(){
		if(checkScrollSlide){
			//将数据块渲染到当前页面的底部
			var oParent = document.getElementById("main");
			for(var i =0; i<dataInt.data.length;i++){
				var oBox = document.createElement("div");
				oBox.className = "box";
				oParent.appendChild(oBox);
				var oPic = document.createElement("div");
					oPic.className = "pic";
					oBox.appendChild(oPic);
				var oImg = document.createElement("img");
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall("main","box");
		}
	}
}
function waterfall(parent,box){
	//将main下所有的class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽度/box宽度）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = parseInt(document.documentElement.clientWidth/oBoxW);
	console.log(cols);
	//设置main的宽度
	oParent.style.cssText = "width:" + oBoxW * cols + "px;margin:0 auto";
	console.log(oParent.offsetWidth);
	var hArr = new Array();//存放每一列高度的数组
	for(var i = 0;i<oBoxs.length;i++){
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getminHIndex(hArr,minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH + "px";
			oBoxs[i].style.left = oBoxW * index + "px";
			oBoxs[i].style.left = oBoxs[index].offsetLeft + "px";
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}
function getByClass(parent,className){
	var boxArr = new Array();
	var oElements = parent.getElementsByTagName("*");
	for(var i = 0;i<oElements.length;i++){
		if(oElements[i].className === className){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getminHIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}
//检测是否可以加载数据块
function checkScrollSlide(){
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,"box");
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动高度
	var height = document.body.clientHeight || document.documentElement.clientHeight;//窗口高度
	return (lastBoxH < scrollTop + height) ? true : false;
}
