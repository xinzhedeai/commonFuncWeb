/**
 * @file i18n
 * @date: 2015/11/24 13:00
 * @version: V1.0
 */
'use strict';

$(function() {
	/*login.js*/
	if (!localStorage.language) {
		localStorage.language = 'cn';
	}
	
	$('#chinese').click(function() {
		if (localStorage.language != 'cn') {
			$confirm('切换为中文', function() {
				localStorage.language = 'cn';
				location.reload();
			});
		} else {
			$alert('已经是中文了');
		}
	});
	$('#english').click(function() {
		if (localStorage.language != 'en') {
			$confirm('convert to english', function() {
				localStorage.language = 'en';
				location.reload();
			}, 'Prompt');
		} else {
			$alert('Already english', function(){}, 'Prompt');
		}
	});
	
	var pathname = window.location.pathname;
	
	/*语言文件选择*/
	var optionLan = { lng: localStorage.language, ns: pathname, fallbackLng: false };
	
	/*当前文件对应的js代码*/
	i18n.init(optionLan, function(err, t) {
		// translate body
		$('body').i18n();
		/*$.ajax({
			data: {'res_addr':'i18n.html','lang_type':'cn'},
			type: "POST",
			url: contextPath + "/v1/api/user/access-token.json",
			success: function(res) {
				if (res.errCd == 0) {
					var result = res.result;
				}
			},
			error: function(e) {
				$alert('发生错误');
			}
		});*/
	  
	  
	  var columnsUser = [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'user_id',
			title : t('result.user_id'),
			width : 80
		}, {
			field : 'user_nm',
			title : t('result.user_nm'),
			width : 80
		}, {
			field : 'user_level',
			title : t('result.user_level'),
			width : 80
		}, {
			field : 'user_status',
			title : t('result.user_status'),
			width : 80
		}, {
			field : 'user_tel',
			title : t('result.user_tel'),
			width : 80
		}, {
			field : 'user_mail',
			title : t('result.user_mail'),
			width : 100
		} ],
	 	optionsUser = {
			url : '',
			columns : [ columnsUser ],
			idField : 'user_id',
			fitColumns : true,
			pagination : true,
			pageSize : 10
		};
		
		$('#datagridUser').datagridEasyUI(optionsUser);
		
		$('#datagridUser').datagrid('loadData', {
		    rows : [
		           {user_id:'qq', user_nm:'球球', user_level:'低级', user_status:'聊天', user_tel:'110', user_mail:'1'},
		           {user_id:'wx', user_nm:'微信', user_level:'高级', user_status:'跑步', user_tel:'120', user_mail:'2'}
		    ]
		});
		
		
		$('#hoverBtn').click(function() {
			$alert(t('result.hover_message'));
		});
		
	});
	
});
