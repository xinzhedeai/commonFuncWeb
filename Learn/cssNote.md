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

	table-layout:fixed想要一个tale固定大小，里面的文字强制换行 
	word-wrap : break-word;
	firefox下，长串英文会出现问题。使用word-wrap:break-word和overflow:hidden结合。

####当子元素宽度大于父元素宽度时，容易撑破父元素。此时，好的方法是使用box-sizing ：border-box；-IE传统模式（只看元素的内容的宽度，儿与padding和border和margin无关）。  
####overflow的属性：no-display（当内容溢出容器室，不显示元素，类似于display：none，不占空间位置）  
				  no-content:当内容溢出容器时不显示内容，类似于display:visibility:hidden 占空间位置
	
	resize:none;禁止调整textarea大小拖拽内容
	outline-offset:定义元素框的偏移位置的数值。不会影响布局，不会影响文档流，以为它不是文档中的一部分。
	border：可以部分设置，不可以向内拓展。outline是始终闭合的。可以向内拓展。
	outline：10px solid #ccc;模拟border实现边框，防止以为boderd宽度改变，影响布局。  
	
	css定义的时后如果类的属性值名称过长而且带有空格，则需要将属性值用引号包含。'scans serif'.
	p{color:windowtext;}用户系统色盘值将会根据用户系统所设定的颜色值而改变。  
	font-variant：small-caps 定义字体为小型的大写字母，针对英文。
	list-style-imge：(image.gig)覆盖预设标记用image.git图片代替
	list-style-position：inside;列表项目标记防止在文本以内，且环绕文本根据标记对齐。  
	****  
	display：box或者是box-{*}属性 -2009版本的
	display：flexbox或者flex（）函数-2011版本的
	display:flex或者是flex-{*}属性，当前规范
	
	box-lines 与horizon 是水平排列
	box-block 与verticle是垂直排列
	box-pack取值为justify的时候，fixfox浏览器下以start方式展示		
	
####当我们给wai这个div加上overflow:hidden这个属性的时候，其中的nei等等带浮动属性的div的在这个立体的浮动已经被清除了。
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
					