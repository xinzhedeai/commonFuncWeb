> + *warehouse今天修改标签打印。 总是不能很好的控制body的宽度.最小宽度为1000px时，当使用火狐浏览器打印标签的时候，总是会出现min-width:1000px;无效的情况，而这时候，标签打印的布局刚刚好 。但是如果把宽度调整为1750px;布局就炸了，而且无论我在html中设置为1000px时，总是达不到从外面public.css引入进来所达到的效果。。真心搞不明白到底哪里出问题！！！*

> + *sx在改货物跟踪哪里，往页面中填充bad way的时候，火狐和谷歌表现不一致。站长统计的图标会在谷歌上面显示。而火狐没有。更令人无语的是谷歌在刷新页面的时候，还能看到所覆盖页面的内容的影子，虽说是一晃而过，但是体验很不好。*

> + `	$('#sagawaTxt,#sagawaHtml,#jpEms').each(function() {`*循环遍历后再家一个点击事件，怎么回事？*
 `		if ($(this).is(':checked')) {`
    `	} else {`
	`	}`
`	}).click(function() {`
`	});`

##js配置校验盒子的属性？？ sx->waybill->add-waybill.js 
	$('#sx_no').keyup(function() {
		var optSxno =  $('#waybillForm #sx_no').validatebox('options'),validArray = [];
		validArray[0] = 'code';
		validArray[1] = 'remote[\'/v1/api/common/check-num.json\']';
	optSxno.validType = validArray;
	});  
##循环遍历删掉多条行数据，这里虽然没有调用接口，但是应该是easyui封装好的吧，有机会可以看下- - 路径同上
	for(var i=0; i<rows.length; i++){
		var rowIndex = $($addWaybill.datagridGoods).datagrid('getRowIndex', rows[i]);
		$($addWaybill.datagridGoods).datagrid('deleteRow',rowIndex);
	}
##为什么*1000后又除以1000，什么单位换算啊？？ - - 路径同上
	packObject.package_weight = (Math.round((packObject.package_weight/copyNum)*1000)/1000).toFixed(3);
	
##有时间测试下easyui的append行与delete行跟以往直接传递id列表操作表然后reload一下网格的方法有什么不同，因该是在效率发面会有区别吧。

## 火狐下，select框怎么设置都不许选中。。不知道怎么回事，兼容性问题吧应该，easyui 的form（'load'）方法做到了兼容的效果，很不错

		