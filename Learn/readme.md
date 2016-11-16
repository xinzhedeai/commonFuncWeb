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

*之所以编码请求参数，是防止参数中的一些字符影响参数传递*  
`modifyBasicInfoCompany.addParam('default_technologys', encodeURIComponent(JSON.stringify($(datagridTechnology).datagrid('getRows'))));`

****
[钟表效果](http://www.cnblogs.com/xljzlw/p/4399414.html)    
[css控制打印布局](http://blog.csdn.net/wyaspnet/article/details/6436368)  
`@media print {`
`	body {`
`		display: inherit; /*设置为none，则打印空白，即不能打印*/`
`	}`
`}`

##今天知道了一个新的社交网络评论插件-多说  还有一个是wordpress 建站插件系统

md语法超链接：<http://baidu.com>  
1. Bass (后端即服务和wordpress搭配，很不错)


