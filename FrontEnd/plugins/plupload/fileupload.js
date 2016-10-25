/**
 * @file 文件上传-单个文件预览区
 * @author Double
 * @date 2015-09-08 08:30
 */

'use strict';

$(function() {
	
	//选择文件
	$('#btnChoose').click(function() {
		$($fileupload.fileOplDialog).showDialog();
	});
	
	//打印文件列表
	$('#btnPrint').click(function() {
		$('#fileListPre').text(getFileList());
	});
	$('#btnPrint').click();
	
});

var $fileupload = {
	fileOplDialog : '#fileOplDialog'
};