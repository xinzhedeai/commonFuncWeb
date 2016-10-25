'use strict';

$(function() {
	
	//模拟赋值--datepicker, 实际赋值时根据具体情况
	var today = new Date();
	$('.endDate').val(formatDate(today));
	today.setMonth(today.getMonth() - 6);
	$('.startDate').val(formatDate(today));
	
	//创建jQueryUI datepicker
	$('.startDate, .endDate').datepickerJQueryUI();
	
	//显示基本弹窗
	$('#btnShowDialog').click(function() {
		$('#dialog').showDialog();
	});
	
	//显示扩展弹窗
	$('#btnShowExtendDialog').click(function() {
		//模拟数据
		var data = {
			"id":"sample_table_tables",
			"result":{
				"total":5,
				"summarys":null,
				"rows":[{"birthday":"2015-01-08","name":"1111","tel":"15243434343","email":"121@qq.com"},
						{"birthday":"2015-01-08","name":"1111","tel":"15243434343","email":"121@qq.com"},
						{"birthday":"2015-01-08","name":"1111","tel":"15243434343","email":"121@qq.com"},
						{"birthday":"2015-01-08","name":"1111","tel":"15243434343","email":"121@qq.com"},
						{"birthday":"2015-01-08","name":"1111","tel":"15243434343","email":"121@qq.com"}]},
				"errMsg":"Success",
				"errCd":0,
				"trId":"*oqc_sample_table_tables_1439779290668"
		};
		
		var datagridElement = '#popupVerticalTable',
	 	columns = [ {
			field : 'name',
			title : 'name',
			width : 100
		}, {
			field : 'email',
			title : 'email',
			width : 100
		}, {
			field : 'birthday',
			title : 'birthday',
			width : 100
		}, {
			field : 'tel',
			title : 'tel',
			width : 100
		} ],
	 	options = {
			columns : columns,
			data : data
		};
		
		//创建弹框中用于显示数据的垂直表格
		$('#popupVerticalTable').createVerticalTable(options);
		
		$('#extendDialog').showDialog();
	});
	
	var columns = [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'id',
		title : 'id',
		hidden : true
	}, {
		field : 'name',
		title : 'name',
		width : 100,
		formatter : function(value, row, index) {
			return '<a target="_blank" title="点击新开页面" href="detail.html">' + value + '</a>';
		}
	}, {
		field : 'email',
		title : 'email',
		width : 100,
		formatter : function(value, row, index) {
			return '<a title="点击显示详情" onclick="$(\'#dialogElement\').showDialog();">' + value + '</a>';
		}
	}, {
		field : 'birthday',
		title : 'birthday',
		width : 100,
		sortable : true
	}, {
		field : 'tel',
		title : 'tel',
		width : 100
	}, {
		field : 'address',
		title : 'address',
		width : 100
	}, {
		field : 'photo',
		title : 'photo',
		width : 100
	}, {
		field : 'exp',
		title : 'exp',
		width : 100
	} ],
 	options = {
		url : contextPath + '/v1/api/test/sample/table.json',
		idField : 'id',
		columns : [ columns ],
		pagination : true,
		fitColumns : true
	};
	
	//创建easyUI datagrid
	$('#datagridDlg').datagridEasyUI(options); 
	
	//显示嵌套datagrid的弹窗
	$('#btnShowDgDialog').click(function() {
		$('#datagridDlg').datagrid('load'); 
		$('#datagridDialog').showDialog();
	});
	
	//显示自定义的弹窗dialog
	$('#btnShowOwnDialog').click(function() {
		$dialog({title : '测试dialog'},{id : 'testDialog'}, {width : '700'}, {height : ''},
				{content : '<table class="popupTable" summary="弹框详情">' +
					'<colgroup>' +
						'<col width="100"/>' +
						'<col width="240"/>' +
						'<col width="100"/>' +
						'<col width=""/> ' +
					'</colgroup>' +
					'<tbody>' +
						'<tr>' +
							'<th>航空袋号</th>' +
							'<td><span id="air_bag_id">请闭眼</span></td>' +
							'<th>主单号</th>' +
							'<td><span id="master_id">请走开</span></td>' +
						'</tr>' +
						'<tr>' +
							'<th>袋子类型</th>' +
							'<td><span id="airbag_type"></span></td>' +
							'<th>国内航班号</th>' +
							'<td><span id="flight_no_cn"></span></td>' +
						'</tr>' +
						'<tr>' +
							'<th>状态</th>' +
							'<td><span id="status"></span></td>' +
							'<th>录入时间</th>' +
							'<td><span id="reg_ts"></span></td>' +
						'</tr>' +
						'<tr>' +
							'<th>录入地点</th>' +
							'<td><span id="position_code"></span></td>' +
							'<th>总重量</th>' +
							'<td><span id="weight"></span></td>' +
						'</tr>' +
					'</tbody>' +
					'</table>'},
				{buttons : [
				            { text: "她来了", handler: function() { $alert($('#testDialog #air_bag_id').text());} },
				            { text: "我来了", handler: function() { $alert($('#testDialog #master_id').text());} }
				] }
		);
	});
	
	//alert
	$('#btnShowAlert').click(function() {
		$alert('Hello, I\'m a alert.');
	});
	
	//confirm
	$('#btnShowConfirm').click(function() {
		$confirm('Hello, I\'m a confirm.', function() {
			$alert('你点击了确认按钮.');
		});
	});
	
});

var dialog = {
		
};