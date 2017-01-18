`<xmp></xmp>`  *标签可以让html代码作为字符串在页面里面显示出来；*  
`<pre></pre>` *标签，可以在保留原来文本格式的基础上让文本在页面上显示出来；例如你的文章原来有个换行，如果把它放在pre标签里面，在页面上显示出来的时候还是换行而不需要额外的加换行标签<br/>*

	<input class="form-control easyui-validatebox" placeHolder="新密码" id="newPW" type="password" name="newPwd" data-options="required:true,validType:['minLength[6]']"/>	
	<input class="form-control easyui-validatebox" id="surePW" validType='equals["#newPwd"]' placeHolder="确认新密码"   type="password" name="conformNewPwd" data-options="required:true"/>
	