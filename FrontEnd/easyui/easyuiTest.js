'use strict';
$(function() {
	//模拟赋值--datepicker, 实际赋值时根据具体情况
	var today = new Date();
	$('.endDate').val(formatDate(today));
	today.setMonth(today.getMonth() - 6);
	$('.startDate').val(formatDate(today));
	
	//创建jQueryUI datepicker
	$('.startDate, .endDate').datepickerJQueryUI();
	
	//验证全部表单
	$('#validateAll').click(function() {
		if ($('#formID').form('validate')) {
			$alert('yy');
		}
	});
	
	//验证单个input
	$('#validateOne').click(function() {
		
	});
	//easy弹窗
	var $modifyDialog = $("#dialog-modify");
	$modifyDialog.dialog({
		title: '郵便番号を変更する',
		width: 550,
		height: 300,
		closed: true,
		cache: false,
		inline: true,
		href: './pages/user/basement/zipcode_manage_mod.jsp',
		modal: false,
		onOpen: function() {
			if ($("#dialog-add").attr('class')) {
				$("#dialog-add").dialog('close');
			}
			if ($("#dialog-check").attr('class')) {
				$("#dialog-check").dialog('close');
			}
		},
		onLoad: function() {
			/**
			 *ajax属性说明
			 *url:提交数据的路径
			 *data:提交的数据,{param1:value1,param2:value2}
			 *dataType:声明返回值的类型
			 *type:以post或get方式提交数据
			 *success:function 提交到指定路径后执行的事件，参数为获取的返回值
			 */
			$.ajax({
				url: './user/basement/zipcodeManage/check',
				data: {
					zipcode: row[0].zipcode
				},
				dataType: 'json',
				type: 'post',
				success: function(data) {
					$("#form-modify").form('load', data);
				}
			});
		}
	});
	$modifyDialog.dialog('open');
	
	$('#datagrid-search').datagrid({
		url: './user/basement/zipcodeManage/search',
		fitColumns: true,
		nowrap: false,
		pagination: true,
		rownumbers: true,
		singleSelect: false, //实现可多选当只保留最新一条选中状态步骤一：取消单选
		checkOnSelect: false,
		pageSize: 10,
		pageList: [10, 15, 20, 25, 30],
		sortName: "zipcode",
		sortOrder: "desc",
		columns: [
			[{
				field: 'ck',
				checkbox: true
			}, {
				field: 'zipcode',
				title: '郵便番号',
				width: 80,
				sortable: true,
				align : 'center',
				formatter: function(value, row) {
					var link = '<a onclick="checkRow(\'' + row.zipcode + '\')" href="javascript:void(0)">' + row.zipcode + '</a>';
					return link;
				}
			},{
				field: 'first_str',
				title: '着店番号',
				align : 'center',
				width: 50
			}]
		],
		toolbar: '#toolbar-area',
		onLoadSuccess: function(data) {
			//$('.checkcls').linkbutton({text:'',plain:false,iconCls:'icon-search'});
			if (data.total == 0) {
				$.messager.show({
					title: '提示',
					msg: 'データを見つけません！',
					timeout: 3000,
					showType: 'slide',
				});
			}
			//载入完成后对datagrid进行自适应
			$(this).datagrid("fixRownumber");
			//        	resizeDatagrid();

			//动态改变datagrid高度
			setTimeout('resizeDatagrid()', 300);
		},
		onClickRow: function(rowIndex, rowData) {
			//实现可多选当只保留最新一条选中状态步骤二：添加datagrid点击行事件
			$('#datagrid-search').datagrid('unselectAll');
			$('#datagrid-search').datagrid('selectRow', rowIndex);
		},
		onCheck: function(rowIndex, rowData) {
			//实现可多选当只保留最新一条选中状态步骤三：添加单选框点击行事件
			$('#datagrid-search').datagrid('unselectAll');
			$('#datagrid-search').datagrid('selectRow', rowIndex);
		}
	});
	
	$.messager.confirm('提示', '确定要删除此号码段吗？', function(r) {
		if (r) {
			$.ajax({
				url: './user/delivery/SagawaNo/deleteAllSagawaNo',
				data: {
					jp_express_section_id: jp_express_section_id
				},
				dataType: 'json',
				type: 'post',
				success: function(data) {
					$.messager.show({
						title: '提示',
						msg: data.msg,
						timeout: 3000,
						showType: 'slide',
					});
					$("#datagrid-search").datagrid('load', {});
				}
			});
		}
	});
	
	/**
	 *form属性说明
	 *url:提交数据的路径,提交的数据为form中带name的input
	 *$.parseJson与ajax中的dataType类似
	 *onSubmit:function 提交前执行的事件，返回false可阻止本次提交
	 *success:function 提交到指定路径后执行的事件，参数为获取的返回值
	 */
	$("#form-modify").form('submit', {
		url: './user/delivery/SagawaNo/updateAllSagawaNo',
		onSubmit: function() {
			var isValid = $(this).form('validate');
			return isValid; // return false will stop the form submission
		},
		success: function(d) {
			var data = $.parseJSON(d);
			$.messager.show({
				title: '提示',
				msg: data.msg,
				timeout: 3000,
				showType: 'slide',
			});
			$("#dialog-modify").dialog('close');
			$("#datagrid-search").datagrid('load', {});
		}
	});
});


