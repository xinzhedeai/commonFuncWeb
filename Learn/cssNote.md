*page-break-before若设定成always，则是在遇到特定的组件时，打印机会重新开始一个新的打印页。 * **关于页面打印的**(sx-->waybill-->print)  
    `page-break-after: always;`  
    `*{-webkit-text-size-adjust:auto !important;}`*谷歌浏览器，在页面缩放时，当字体< 12px时，就设定为最近12px*  
	`$('#invoiceTable').width('');` *将元素的宽度设为空，类似于将元素隐藏了，但是不知道与原来的jquery hide()方法哪个效率高？*  
	
	window.onresize = function() {  *当窗口进行变化的时候，强行将窗口定义一个固定的值，主要是防止影响打印*
		window.resizeTo(1400, 1000);
	}

##CSS3 Media Queries 一个web响应式前端css插件    
[CSS3 Media Queries详解]（http://www.cnblogs.com/mofish/archive/2012/05/23/2515218.html）  
*不支持css3 media queries浏览器按background-size:cover模式显示背景图片*