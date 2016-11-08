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

