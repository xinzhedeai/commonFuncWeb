###Welcome to use MarkDown

## 只有在函数内部使用 var 关键字声明的变量才是局部变量，在其它“语句块”内使用 var 关键字声明变量一般是全局变量，if...else...选择结构和for循环结构都是如此。
#### 除了函数，JavaScript是没有块级作用域的。 一般情况下，for循环都是包含在函数的当中，就不会出现全局变量的情况了。
`<html>
<head>
    <title>在for循环内部声明变量</title>
</head>
<body>
<script type="text/javascript">
for(var i=0;i<=5;i++){
    var x=100;
}
</script>`

<p onclick="alert(i);">显示 i 变量的值</p>
<p onclick="alert(x);">显示 x 变量的值</p>
`</body>
</html>`

##函数参数分为数值传递和引用传递
##匿名函数 在被创建的时候立即被调用。
`
(function(x,y){
    alert("匿名函数");
})(19,109);//加上；，因为这是一个函数调用，而不是一个代码块儿。
`

####getElementById( ) 是 document （根节点）的一个方法，其他元素节点不能使用该方法。因为 id 属性在整个HTML文档中是唯一的，因此必须从根节点开始寻找。
####getElementsByTagName() 是所有元素节点的方法，不仅 document（根节点）可以使用，其他节点也可以使用。所以，根据HTML标签名称来获取DOM节点不仅可以从 document（根节点）开始寻找，还可以从任何其他元素节点开始寻找。
******

####createDocumentFragment() 方法用来创建一个文档碎片节点。减轻浏览器压力，可以将元素节点一次性的追加到html页面中。

##只有在浏览器脚本被禁止的时候，才会出现的内容。
`  <noscript>
        <p>本页面需要浏览器支持（启用）JavaScript。
    </noscript>`
    
####除了函数，JavaScript是没有块级作用域的。

#### 在不关注遍历顺序的时候,可以使用while替换for写法。
`	var arr = [1,2,3,4,5,6,7];  
	var sum = 0, l = arr.length;
	while (l--)
	{
	    sum += arr[l];
	} `
	
	`var arr = [1,2,3,4,5,6,7];
	 var sum = 0;
	 for (var i = 0, l = arr.length; i < l; i++)
	 {
	    sum += arr[i];
	 }
`

####css sprite 被称为css精灵，可以将网站上零星的图片集中为一张。减少页面图片的请求。运用css sprite技术集中小的背景图或图标, 减小页面http请求, 但注意, 请务必在对应的sprite psd源图中划参考线, 并保存至img目录下。 
####后期优化中, JavaScript非注释类中文字符须转换成unicode编码使用, 以避免编码错误时乱码显示。
####减少reflow，大量使用visibility而不是display
####<body>标签不属于head区，这里强调一下，为了保证浏览器的兼容性，必须设置页面背景<body bgcolor="#FFFFFF">
```
网站中的链接路径全部采用相对路径，一般链接到某一目录下的缺省文件的链接路径不必写全名，如我们不必这样：<a href=”aboutus/index.htm”> 而应该这样：<a href=”aboutus/”>，所有内页指向首页的链接写成<a href=”/”>
在浏览器里，当我们点击空链接时，它会自动将当前页面重置到首端，从而影响用户正常的阅读内容，我们用代码“javascript:void(null)”代替原来的“#”
```

#### window.open()打开一个新窗口。
` var userInfo = window.userInfo, company_type, user_level;` *多个变量声明方式。*
`parseInt(result.total)` *当获取的数字类型是字符串时，转化可以是用''乘以1的方法解决；如果是数字转化为字符串，可以用1+''的方法*

`'innerbill' in $.parseJSON(getCookie("map"))` *查看对象中是否有某个某个属性，可以使用in来判断*
  
`	var operatFee = parseFloat($('input[name="master_weight"]').val())*0.2;`*浮点数转化，然后进行四舍五入保留三位小数*
`	operatFee = (Math.round(operatFee*1000)/1000).toFixed(3);`  
`$('#sagawaTxt').is(':checked')`*判断某节复选框是否被选中状态*  

`var setInteval = setInterval(function(){},1000)` *设置定时器,每一秒执行一次*    
`clearInterval(setInterval);`*清楚定时器*  
``stringObject.search()` *方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。返回stringObject 中第一个与 regexp 相匹配的子串的起始位置*  
`<style type="text/css">  `*js获取样式表style里面样式的设置属性*  
`#div1{width:100%;height:400px; background:red;} ` 
`</style>  `
`window.onload=init; ` 
    `function $(id){  `
             ` return "string" == typeof id ? document.getElementById(id) : id; ` 
   ` } ` 
   ` function init(){  `   
   		*Mozilla和Safasi中是cssRules，在个别版本的Chrome下需要用window.CSSRule.STYLE_RULE*
      `  var ocssRules=document.styleSheets[0].cssRules || document.styleSheets[0].rules || window.CSSRule.STYLE_RULE;`  
      `  var theEl=$("div1");  `
       ` ocssRules[0].style.background="yellow";  `
      `  alert(ocssRules[0].style.background);  `
    `}`  
    
##块级代码块 有两种方式 每行代码开始空四个空格或者是整体代码外边用```包裹，但是eclipse下的md编辑，不支持后者
    var HKEY_Root, HKEY_Path, HKEY_Key; **测试**  
	HKEY_Root = "HKEY_CURRENT_USER";

**原来js还是可以控制浏览器打印机的参数的，哈哈，好强大！！**  
	`window.resizeTo(1400, 1000); ` *方法用于把窗口大小调整为指定的宽度和高度。*


**取两个条码进行打印，左边一个，右边一个  

        for (var i = 0; i < result.length; i += 2) //取两个条码进行打印
        {
            var rightNum = "";
            var leftNum = result[i];
            if(i + 2 <= result.length) {
                rightNum = result[i + 1];
            }
            try {
            	$waybillLablePrintNumber.printerInitialize(); 	//初始化
            	$waybillLablePrintNumber.BarcodePrint(leftNum,rightNum);
            } catch(e) {
            	$alert("打印出错,请检查打印机等设备");
            }
        }
        $("#allNumber").val("").focus();
   
	   $('#onlyCustomsCK').prop("checked",false);//设置属性值，类似attr	
	   
	   splice（1）,从数组中从第二个开始往后删，返回的是包含被删的数据集合。
	   splice(1,2),从第二个数开始删两个数
	   splice(1,0,33),在第二个位置上添加一个33，原有的数据向后移动
	   splice(1,1,22,33)在第二个位置添加22，33，两个数，并且之前在第二个未知的 数据被删掉。
	   $('#onlyCustomsCK').prop("checked",false);//设置属性值，类似attr

	Bar.prototype = new Foo();
	Bar.prototype.foo = 'hello world';
	Bar.prototype.constructor = Bar;
	var test = new Bar();//创建一个新实例，但是不会创造一个新的Foo实例。而是重复使用它 
	原型上的那个实例；因此所欲的Bar实例都会共享相同的value属性。	
	hasOwnProperty是javascript中唯一一个处理但是不查找原型链的函数。	
	//js中的hasOwnProperty可能被非法占用。作为一个对象的属性，就不能通过这个方法获取期待的结果了。解决办法如下。
	({}).hasOwnProperty.call(foo, 'bar');//使用其他对象的hasOwnProperty，并将其上下文设置为foo		
	console.assert(a == 1,'halilya');//当变量a的值为1的时候，输出haliluya（断言调试方法）	
	arguments instanceof Array //判别对象是什么类型的		
	//解决时间冒泡的问题。该方式在任何一个响应时间的div上添加都可以达到需要的效果 	
	 function newevent(event){
	 var event=event?event:window.event;
	 if(document.all)
	  event.cancelBubble=true;
	 else 
	  event.stopPropagation();
	 }		
	 var a = [1,2,3]  1 in  a//查看1是否在a数组里面		
	 new Array(count + 1).join(stringToRepeat); //预先设置长度，重复设置字符省去了for的麻烦  new Array(3).join('#')将会返回##	
	 typeof主要是查看变量是否已经定义。		
	 
	 '' + 10 == '10'//true   +'10' == 10//true
	 !!可以将变量转化为布尔类型的值
	 options.list || [] //判断元素是否为空，为空的话值为后面的默认值  省去了if else判断的麻烦
	 
	 function foo(a, b, c) {}
	 //调用定时器中的方法传递参数
	// 不要这样做
	setTimeout('foo(1,2, 3)', 1000)
	 
	// 可以使用匿名函数完成相同功能
	setTimeout(function() {
	  foo(1, 2, 3);
	}, 1000)
	
	cls=arguments[1]//虽然这里传来的第二个形参是一个数组，但是封装了一个元素到数组中。想要真正取到这里面的数据 ，需要a[0]的方式才可以获取到里面的数组数据。而且这里的cls虽然是具有数组形式，但是不是一个真实的数组。
