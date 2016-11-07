####关于p标签父子元素获取不到的问题
>实例请看test文件中的例子  就是p标签如果嵌套p标签的话，那么获取选择孙子p元素标签的时候竟然获取的包括子元素的。。很奇怪。
[haliluya](http://www.baidu.com)
*哈利路亚*
**哈利路亚**
******
*表单提交样例*
####onsubmit是一个表单提交是所触发的方法。这里面用的事easyui的filebox插件
```<form style="margin-top: 15px;" action="/v1/api/waybill/exporter/customer-lable-offline.excel" 	method="post" enctype="multipart/form-data" onsubmit="return checksubmit()">
 <input id="customerLabel" class="easyui-filebox" name="file" data-options="prompt:'选择文件'" 	buttonText="浏览文件" style="width: 50%;height: 30px;">
	<button class="btnPrimary" type="submit">下载</button>
</form>```

#### 自适应头文件
` <meta charset="utf-8">`
`   <meta http-equiv="X-UA-Compatible" content="IE=edge">`
`    <meta name="viewport" content="width=device-width, initial-scale=1">`
 `   <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->`
 
####判断是手机或电脑访问
	var system ={};  
    var p = navigator.platform;       
    system.win = p.indexOf("Win") == 0;  
    system.mac = p.indexOf("Mac") == 0;  
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);     
    if (system.win||system.mac||system.xll) {  //如果是电脑不跳转
         
    } else{  //如果是手机,跳转到微信页面
        window.location.href = '/wechat/index.html';  
    }
    
####判断是否需要直接跳转到上次访问的页面
`$('.btn-login').click(function() {`
   ` if (localStorage.lastRequestPage && localStorage.lastRequestPage.indexOf('login') == -1 && 		document.cookie.indexOf('access-token') != -1) {`
  `  			location.href = localStorage.lastRequestPage;`
    `		} else {`
    			`location.href = '/login.html';`
    		`}`
    	`});`
   
####将多个空格转化为一个
`var val = $(this).val().replace(/\s/g, '')`

####switch
`switch (value){``
	`case '1' :`
	`  todo;`
	 ` break;`
	`default :`
	` break;` 
`}`

***一下是css3学习的样式***

#### :before   伪类，添加元素内容之前插入新内容
*制作三角形的css样式*
  `  border: 5px solid #fff;`
    `border-color: #fff transparent transparent;` 方向向下的三角形
     `   border-color: transparent transparent transparent #fff;`方向向右的三角行
 .html#brand 目标伪类元素*手风琴效果案例* 
 `.accordionMenu :target h2:before` 定义一种样式
 `.accordionMenu h2:before`  默认样式
 在页面中的a标签中需要定义id `<a href="#brand">Brand</a> `
 *上例可见目标伪类选择器的优先级是大于一般的优先级的*
 *当点击不同a标签的时候，通过动态伪类的修饰，可以动态的达到箭头显示的效果。*
 
 `background: #2288dd;``
`	background: -moz-linear-gradient( top, #6bb2ff, #2288dd);`火狐下
`	background: -webkit-gradient(linear, left top, left bottom, from(#6bb2ff), to(#2288dd));`老式写法
`	background: -webkit-linear-gradient( top, #6bb2ff, #2288dd);`最新写法
`	background: -o-linear-gradient( top, #6bb2ff, #2288dd);` oprea浏览器下
`	background: linear-gradient( top, #6bb2ff, #2288dd);`
`	color:#FFF;`

`content 属性与 :before 及 :after 伪元素配合使用，来插入生成内容。`
 `height:0` 默认栏目内容高度为0，达到隐藏 效果
 
 *div宽度在2s内逐渐变为一个新的宽度*
  `div`
`{width:100px;`
`transition: width 2s;``
`-moz-transition: width 2s; /* Firefox 4 */`
`-webkit-transition: width 2s; /* Safari 和 Chrome */`
`-o-transition: width 2s; /* Opera */}`

`.btn.disabled,`*等效于下面这个写法， 用于兼容ie低版本的浏览器*
`.btn:disabled{}`

`    box-shadow: 2px 1px 14px 7px pink inset;`*阴影效果*

`div.rotate_right`*图片旋转效果，很漂亮*
`{`
`float:left;`
`-ms-transform:rotate(-8deg); /* IE 9 */`
`-moz-transform:rotate(-8deg); /* Firefox */`
`-webkit-transform:rotate(-8deg); /* Safari and Chrome */`
`-o-transform:rotate(-8deg); /* Opera */`
`transform:rotate(-8deg);`
`}`

`input[type="radio][disabled],等效于input[type="radio"]:disabled`
`E F:nth-child(n) 选择父元素E 的第n个子元素F。其中n的其实值是1而不是0`
`div div:first-of-type 指的是一个div的子元素中第一个div元素`
`p:nth-of-type(2) 只的事第二个p元素`
