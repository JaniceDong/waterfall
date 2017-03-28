$(window).on("load",function(){
	waterfall();
	var dataInt = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"}]};//模拟要加载的数据
	$(window).on("scroll",function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(key,value){
				var oBox = $("<div>").addClass("box").appendTo($("#main"));//创建一个div
				var oPic = $("<div>").addClass("pic").appendTo($(oBox));
				$("<img>").attr("src","images/" + $(value).attr("src")).appendTo($(oPic));
				//console.log($(value).attr("src"));
			})
			waterfall();
		}
	})
});
function waterfall(){
	var $boxs = $("#main>div");//main下面的第一级子元素
	var w = $boxs.eq(0).outerWidth();//获取box的宽度
	var cols = Math.floor($(window).width()/w);//列数
	$("#main").width(w * cols).css("margin","0 auto");
	var hArr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();//每次给h赋值
		if(index < cols){
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);//获取最小高度
			var minHIndex = $.inArray(minH,hArr);//$.inArray(要求的值，在哪里的位置)获取最小高度在数组里的位置
			$(value).css({//value为dom元素，$(value)转化为jQuery对象
				"position":"absolute",
				"left": minHIndex * w + "px",
				"top":minH + "px"
			})
		}
		hArr[minHIndex] += $boxs.eq(index).outerHeight();
	})
}
function checkScrollSlide(){
	var $lastBox = $("#main>div").last();
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	/*if(lastBoxDis < scrollTop + documentH){
		return true;
	}else{
		return false;
	}*/
	return (lastBoxDis < scrollTop + documentH)?true : false;
}
