/**
 * @file datagrid detail
 * @author Double
 * @date 2015/12/25 16:30
 */

'use strict';

$(function() {
	
	//创建jQueryUI datepicker
	$('.startDate, .endDate').datepickerJQueryUI();
	
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
			return '<a title="点击显示详情" onclick=$gridDetail.showRow(\'' + objToStr(row) + '\')>' + value + '</a>';
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
		field : 'email',
		title : 'email',
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
		fitColumns : true,
		crossPageSwitch : true,
		conditionSwitch : true,
		downloadPage : true
	};
	
	//创建easyUI datagrid
	$($gridDetail.datagrid).datagridEasyUI(options); 
	
	//查询按钮
	$('#searchBtn').click(function() { 
		$($gridDetail.datagrid).datagrid('load', serializeObject($('#searchForm')));
	});
	
	//添加按钮
	$('#addBtn').click(function() { 
		$($gridDetail.addDlg).showDialog();
	});
	
	//添加弹窗->确认按钮
	$('#okAddBtn').click(function() { 
		$confirm('确认要添加吗?', function() {
			$gridDetail.addRow();
		});
	});
	
	//详情弹窗->确认按钮
	$('#okUpdateBtn').click(function() { 
		$confirm('确认要修改吗?', function() {
			$gridDetail.updateRow();
		});
	});
	
	//删除按钮(按照查询条件进行操作)
	$('#delBtn').click(function() {
		var conditionOperating = $($gridDetail.datagrid).conditionOperatingEasyUI(['id']);
		if (conditionOperating) {
			$confirm(conditionOperating.msg + '删除吗?', function() {
				$($gridDetail.datagrid).datagrid('clearChecked');
				$gridDetail.deleteRow(conditionOperating.data);
			});
		}
	});
	
	//不按条件删除按钮
	$('#delNoConditionBtn').click(function() {
		var conditionOperating = $($gridDetail.datagrid).conditionOperatingEasyUI(['id'], 'noCondition');
		if (conditionOperating) {
			$confirm(conditionOperating.msg + '删除吗?', function() {
				$($gridDetail.datagrid).datagrid('clearChecked');
				$gridDetail.deleteRow(conditionOperating.data);
			});
		}
	});
	
	//下载按钮
	$('#dldBtn').click(function() { 
		$($gridDetail.datagrid).downloadFileEasyUI({url : '/v1/api/test/sample/exporter/samples.excel', field : ['id'], button : this});
//		$('#searchForm').downloadFileEasyUI({url : '/v1/api/waybill/exporter/waybill-invoice.excel', field : ['id'], button : this});
	});
	
});

//请求体
var $gridDetail = {
	datagrid : '#datagridExp',
	addDlg : '#addDlg',
	updateDlg : '#updateDlg',
	addRow : function() {
		var addRow = new nssoft.openApi.addRow.api();
		$.each($($gridDetail.addDlg).find('form').serializeArray(), function(index, field) {
			addRow.addParam(field.name, field.value);
		});
		addRow.addParam('id', new Date().getTime());
		addRow.request({
			method : 'POST',
			async : false,
			url : contextPath + '/v1/api/test/sample/add-row.json'
		});
	},
	showRow : function(row) {
		row = $.parseJSON(row);
		$($gridDetail.updateDlg).find('form').form('load', row);
		$($gridDetail.updateDlg).showDialog();
	},
	updateRow : function() {
		var updateRow = new nssoft.openApi.updateRow.api();
		$.each($($gridDetail.updateDlg).find('form').serializeArray(), function(index, field) {
			updateRow.addParam(field.name, field.value);
		});
		updateRow.request({
			method : 'POST',
			async : false,
			url : contextPath + '/v1/api/test/sample/update-row.json'
		});
	},
	deleteRow : function(data) {
		var deleteRow = new nssoft.openApi.deleteRow.api();
		deleteRow.addParam('operate_type', data.operate_type);
		deleteRow.addParam('params', data.params);
		deleteRow.request({
			method : 'POST',
			async : false,
			url : contextPath + '/v1/api/test/sample/delete-row.json'
		});
	}
};

//添加一行
(function() {
	$class('nssoft.openApi.addRow.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			if (res.errCd == 0) {
				if (result) {
					if (result.success) {
						$($gridDetail.datagrid).datagrid('reload');
						$confirm(result.msg + '，是否继续添加？', {
							yesText : '是',
							yesHandler : function() {
								$($gridDetail.addDlg).find('form')[0].reset();
							},
							noText : '否',
							noHandler : function() {
								$($gridDetail.addDlg).closeDialog();
							}
						});
					} else {
						$alert(result.msg);
					}
				}
				
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//更新一行
(function() {
	$class('nssoft.openApi.updateRow.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			if (res.errCd === 0) {
				if (result) {
					if (result.success) {
						var id = $($gridDetail.updateDlg).find('form input[name="id"]').val(),
						index = $($gridDetail.datagrid).datagrid('getRowIndex', id),
						row = serializeObject($($gridDetail.updateDlg).find('form'));
						$($gridDetail.datagrid).datagrid('updateRow', {
							index : index,
							row : row
						});
						$alert(result.msg, function() {
							$($gridDetail.updateDlg).closeDialog();
						});
					} else {
						$alert(result.msg);
					}
				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//删除若干行
(function() {
	$class('nssoft.openApi.deleteRow.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			if (res.errCd == 0) {
				if (result) {
					$alert(result.msg);
					if (result.success) {
						$($gridDetail.datagrid).datagrid('reload');
					}
				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());
