'use strict';

$(function() {
	
	//选择文件1
	$('#btnChooseFir').click(function() {
		$($fileupload.fileOplFirDialog).showDialog();
	});
	
	//选择文件2
	$('#btnChooseSec').click(function() {
		$($fileupload.fileOplSecDialog).showDialog();
	});
	
	//打印文件列表
	$('#btnPrint').click(function() {
		$('#fileListPre').text(getFileList());
	});
	$('#btnPrint').click();
	
});

var $fileupload = {
	fileOplFirDialog : '#fileOplFirDialog',
	fileOplSecDialog : '#fileOplSecDialog'
};