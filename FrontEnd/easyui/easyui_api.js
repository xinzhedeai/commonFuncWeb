//获取行索引值删除行数据。
row = row instanceof Object ? row : $.parseJSON(row);
$($waybillLablePrint.datagridWaybill).datagrid('deleteRow', $($waybillLablePrint.datagridWaybill).datagrid('getRowIndex', row.waybill_id));

//获取当前数据网格的总条数
$($Bill.datagridBill).datagrid('getData').total)

//在动态修改行数据，而且能够让它及时显示最新的数据-不是从后台刷新得到的
$($joinMaster.dgUnjoined).datagrid('deleteRow', $($joinMaster.dgUnjoined).datagrid('getRowIndex', row.master_item_id));//删掉原有行
row.join_state = '已入单';//修改行数据
$($joinMaster.dgUnjoined).datagrid('appendRow', row);//再将新行添加上去

var rows = $($joinMaster.dgUnjoined).datagrid('getRows'); //获取网格总共的条数还是当前页的总条数
var totalRowNum = rows.length;
$("input[type='checkbox']")[totalRowNum].disabled = true;//将最后一行的数据的选择框改为可用
row = row instanceof Object ? row : $.parseJSON(row); //在操作数据网格行数据的时候
$($joinMaster.dgUnjoined).datagrid('insertRow', {//向网格的第一行添加新的行数据
	index : 0, 
	row : row
});

/*//只有一个主键的情况下，采用updateRow的方法更新行；
//如果有多个主键，采用reload的方法更新当前页
$($masters.datagrid).datagrid('updateRow', {
	index: $($masters.datagrid).datagrid('getRowIndex', $($masters.dialog).find('form #master_id').val()),
	row: serializeObject($($masters.dialog).find('form'))
});*/
$($masters.dialog).closeDialog();
$($masters.datagrid).datagrid('reload'); 

//选择数据后进行行删除，那么后台不能知道？？因为好像没有调用后台接口
for(var i=0; i<rows.length; i++){
	var rowIndex = $($basicinfo.datagridTechnology).datagrid('getRowIndex', rows[i]);
	$($basicinfo.datagridTechnology).datagrid('deleteRow',rowIndex);
}

//有没有datagrid方法 使得用户只能选择一个数据？？提高用户体验
if (row.length == 0) {
	$alert('请选择要修改的数据');
} else if (row.length >1) {
	$alert('请选中一条数据编辑');
} else {
	$flight.loadDetail(row[0]);
}
//
//起飞时间 是easyui中的时间插件方法吗？
$('input[name="departure_time"]').timepicker({
	onSelect : function() {
		$(this).validatebox('validate');
	}
});
//easyui tree的使用
var parentNode = $($menu.treegrid).treegrid('getParent', node.menu_id);//获取当前选择树节点的父亲节点
var node = $($menu.treegrid).treegrid('getSelected'); // 选择节点
$($menu.treegrid).treegrid('update', {//更新节点数据
	id: node.menu_id,
	row: serializeObject($($menu.dialogMenu).find('form'))
});
//数据网格 列编辑器配置
editor : {
	type : 'numberbox',
	options : {
		required : true,
		precision : 3,
		novalidate : true
	}
}
//取消编辑行
var index = $(editBtn).parents('tr.datagrid-row').attr('datagrid-row-index');//添加行数据的时候，出于在编辑状态时获取行index的方法
$($addWaybill.datagridPack).datagrid('cancelEdit', index);


//清空方法有两种
//第一种.
$('#clearBtn').click(function() {
	//$($waybillLablePrint.datagridWaybill).datagrid('loadData',{total:0,rows:[]}); 
	 var item = $($waybillLablePrint.datagridWaybill).datagrid('getRows');
     if (item) {
         for (var i = item.length - 1; i >= 0; i--) {
             var index = $($waybillLablePrint.datagridWaybill).datagrid('getRowIndex', item[i]);
             $($waybillLablePrint.datagridWaybill).datagrid('deleteRow', index);
         }
     }
});
//第二种
//删除datagrid中原有数据
$($stockmanage.datagridGoods).datagrid('loadData', { total: 0, rows: [] });