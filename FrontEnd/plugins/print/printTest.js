$('#printContent').show();//隐藏的区域不能打印，所以设置他显示，打印后再让他隐藏
for (var i=0; i<result.length; i++) {
	$('#printContent').append('<div id="bcTarget' + i + '" class="barcodeImg"></div>');
	$('#bcTarget' + i).empty().barcode(result[i].product_reg_code, "code128",{barWidth:1, barHeight:40,showHRI:false});
	if(result[i].company_product_code != null && result[i].company_product_code != ''){
		$('#bcTarget' + i).prepend('<p style="padding-left: 60px;">' + result[i].company_product_code + '</p>');
	}
//	$('#bcTarget' + i).prepend('<p style="padding-left: 60px;">222555</p>');
	$('#bcTarget' + i).append('<p style="padding-left: 0px">' + result[i].product_reg_code.substring(0, 14) + '-' + result[i].product_reg_code.substring(14) + '</p>');
}
$('#printContent').jqprint();
	setTimeout(function() {
	$('#printContent').hide();
}, 100);
}