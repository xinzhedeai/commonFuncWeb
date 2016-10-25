/*提示窗*/
$confirm("确定要登出系统吗？",function(){
		//$Modify.logOut();
		$.ajax({ 
			url: contextPath+'/v1/openapi/user/logout.d-json', 
			success: function(){
				//清除cookie
				clearAllCookie();	
				location.href="../login.html";
			}
		});
	});