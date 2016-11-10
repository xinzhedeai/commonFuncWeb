#### 选择器
E+F  EF是相邻的兄弟元素  f在e后面。
E~F  是指E后面所有的F元素。
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
 
 *div宽度在2s内逐渐变为一个新的宽度-过渡效果*
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

`div>p:nth-child(2) - 段落元素而且是div的第二个子元素`  
`div>p:nth-of-type(2)- div元素段落2  `*强烈推荐使用，比nth-child更稳定*  
`.article img:nth-of-type(n+2):nth-last-of-type(n+2){float:left;}`*除了第一个和最后一个图片左浮动*

##两个空格+回车才是回车换行  
`table{border-spacing:0;} `*制作表格圆角效果前，需要这样设置*

`::before 伪元素虽然不是dom中的一部分，但是可以设置大小样式。 ` `：before伪类-清除浮动是会用到`
`a[href^=http]::after{content:"("attr(href)")"}` *在超链接元素后面的括号中不用硬编码url*  
`class^="icon-" 代表以类icon-为开始的样式  class*="icon-" 代表凡包含icon-的类`  
`::selection{background:red;color:#fff;}`*特别醒目的样式，类似于鼠标选中一段文字，背景和文字颜色不一样。可能就是这个原理*

`.elm{border:hidden} `*与none相同定义无边框，但是对于表，hidden只是用来解决边框冲突。*

`border-top-colors: ###111 #222 #333 #444 #555` *边框颜色 实现多颜色边框，每个颜色填充一像素*  
`-moz-  -webkit-  -ms- -o- border-top-colors` *浏览器前缀+正常写法*  
`-prefix-free` *插件可以略去浏览器前缀，方便节省时间*  
`border-radius`*取值为none并无效果，需要将元素的border-radius设置为0*   
`ie兼容性问题，可以使用第三方插件IE-css3.js,PIE等` *得看书啊。要不然怎么知道还有这些好用的东西*  
`box-shadow` *对象阴影层级：对象阴影同盒模型层次一样，边框->内阴影->背景图片->背景色->外阴影->对象背景*  

> + 图片上的阴影inset属性是没有效果的。  
> + 兼容ie低版本，可以使用ie的滤镜来模拟实现box-shadow的效果  

    filter:progid:DXImageTransform.Microsoft.Shadow(color='颜色值'，Direction=阴影角度（数值）,Strength=阴影半径（数值）);  
    overflow:hidden; *有清楚浮动的效果。但是使用clear有些时候效果会更好些*  
    input:-moz-placeholder{ *可以设置输入框提示默认显示文字的样式*
    	color:green;
	}  
    #formWrapper::-moz-focus-inner{border:0;}*firefox下去去除焦点线*
    background-attachment取值为“fixed”时，一般运用在html或body标签上，使用在其他标签上不能达到固定效果。  
	transform:scale(2)缩放比例便为原来的2倍