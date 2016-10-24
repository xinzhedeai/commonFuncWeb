//获取行索引值删除行数据。
row = row instanceof Object ? row : $.parseJSON(row);
$($waybillLablePrint.datagridWaybill).datagrid('deleteRow', $($waybillLablePrint.datagridWaybill).datagrid('getRowIndex', row.waybill_id));