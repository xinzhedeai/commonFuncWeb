	//信息提示窗
	var txt=  "获取失败！";
	window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
	
	//操作确认框
	var txt = "确认删除？";
	var option = {
		title: "系统信息",
		btn: parseInt("0011",2),
		onOk: function(){
			//这里写调用函数处理逻辑
		},
		onCancel: function(){
			
		}
	}
	window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info, option);

	//qq登陆提示窗
	var txt=  "您还未登录,请登录！";
	var option = {
		title: "系统消息",
		btn: parseInt("1100",2),
		onregist: function(){
			location.href="main/register.html";
		},
		onLogin: function(v, p){
			var userId = v,
				password = p,
				clientId = "WEB",
				clientSecret = "52FA629647E2D2B2003A65F300B700E0";
			if(userId){
				if(password){
					password =  hex_md5(password);
					$login.login(userId, password, clientId, clientSecret);
				}else{
					var txt=  "密码为空！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
				}
			}else{
				var txt=  "用户名为空！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			}
		}
	}
	window.wxc.xcConfirm(txt, "login", option);