//获取行索引值删除行数据。
row = row instanceof Object ? row : $.parseJSON(row);
$($waybillLablePrint.datagridWaybill).datagrid('deleteRow', $($waybillLablePrint.datagridWaybill).datagrid('getRowIndex', row.waybill_id));

//获取当前数据网格的总条数
$($Bill.datagridBill).datagrid('getData').total)