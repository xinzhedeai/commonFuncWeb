'use strict';

$(function() {
	//模拟赋值--datepicker, 实际赋值时根据具体情况
//	var today = new Date();
//	$('.endDate').val(formatDate(today));
//	today.setMonth(today.getMonth() - 6);
//	$('.startDate').val(formatDate(today));
	
	//创建jQueryUI datepicker 日历控件
	//普通视图
	$('#startDate1, #startDate2, #endDate2').datepickerJQueryUI();
	//年月视图
//	$('#startDate3, #endDate3').datepickerJQueryUI({yearMonthView: true});
	
	//创建BUI combox
	var itemsCombox = ['汉字','汉字 短语','English','number 5'];
	var combox = $('.combox:eq(0)').comboxBui(itemsCombox);
	//combox对象自定义的方法
	//1.setItems
//	自定义combox setItems方法，数据源可为一维数组、字符串形式的一维数组、一维Map数组、字符串形式的一维Map数组
//	combox.setItems('[{\"a\":\"v1\"}]');
//	2.setSelection
//	combox.setSelection('v1,v2');

	//创建自定义宽度的combox
	$('.combox:eq(1)').comboxBui(itemsCombox, 324);
	
	//创建BUI自动完成插件suggest
	var itemsSuggest = ['你好么123','我很好234445','这里是122','哪里是1111111'];
	$('.suggest:eq(0), .suggest:eq(2)').suggestBui(itemsSuggest);
//	itemsSuggest = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'}];
	var sug = $('.suggest:eq(1)').suggestBui(itemsSuggest);
//	$('.suggest:eq(1) input').val('这里是122');
	sug.on('change', function(ev) {
      console.info(ev.item);
   	});
   	$('body').dblclick(function() {
   		if($('form').form('validate') && $('form').validateSuggest()) {
	   		alert('success')
	   	}
   	});
//  $('.acticle').hideForm();
});