##7种基本的刷新方法
####10表示间隔10秒刷新



`<meta http-equiv="refresh"content="10;url=跳转的页面"> `
`<script language="javascript">`
   ` window.location.reload(true);`
`</script>`

####如果是你要刷新某一个iframe就把window给换成frame的名字或ID号

`<script language=''javascript''>`
    `window.navigate("本页面url");`
`</script>`

function abc()
{
    window.location.href="/blog/window.location.href";
    setTimeout("abc()",10000);
}`

####刷新本页：
   ` Response.Write("<script type="text/javascript">window.location.href=window.location.href;</script>")`
   
####刷新父页：
    `Response.Write("<script type="text/javascript" >opener.location.href=opener.location.href;</script>")`
    
####转到指定页:
    `Response.Write("<script type="text/javascript" >window.location.href='yourpage.aspx';</script>")`
    
##定时刷新页面的三种方法
####在html中设置 在<head>标签中加入下面一行代码：
    <meta http-equiv="refresh" content="10">
>10代表刷新间隔，单位为秒。 jsp方法
    `<% response.setHeader("refresh","1"); %>`
>1代表每一秒刷新一次。
***
>javascript方法
`<script type="text/javascript">
    setTimeout("self.location.reload();",1000);
<script>`
1000代表1000毫秒，即1秒。