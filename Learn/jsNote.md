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