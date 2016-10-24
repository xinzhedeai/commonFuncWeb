#弹窗形式上传图片-支持多个
var fileupload = $($stockmanage.importStockDialog).find('.fileupload');
fileupload.plupload('getUploader').setOption('url', contextPath+fileupload.attr('url'));
//调用上传文件接口
$(this).find('.fileupload').fileUpload();

#此方法只能上传一个图片(此方法在ie8浏览器上回有兼容性的问题)
#此方法可以和 jcrop插件搭配使用 切割图片大小
var uploader = new plupload.Uploader({
    browse_button : 'pickfiles', //按钮的id属性值
    url : "/v1/api/common/upload-files.form",
    filters : {
      //  max_file_size : '3mb',
        mime_types: [
            {title : "Image files", extensions : "jpg,gif,png"}
        ]
    },
    multipart_params : {
    	module_cd : '/head'
    },
    multi_selection : false,
    flash_swf_url : 'lib/plugin/plupload-2.1.2/Moxie.swf',
	silverlight_xap_url : 'lib/plugin/plupload-2.1.2/MoxiDe.xap',
    init: {
        FilesAdded: function (uploader, file) {
        	var filefor = uploader.getFile(file[0].id);
        	if(filefor.size > 2097152){
        		var txt = "文件大小超过2M！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
				uploader.files.splice(0, 1);
        	}else{
        		uploader.start();
        	}
        },
		FileUploaded: function (uploader, file, responseObject) {
			var res = $.parseJSON(responseObject.response);
			if(res.errCd === 0 && res.result && res.result.files) {
				var file = res.result.files[0];
				$personset.filepath = file.file_absolute_path;
				$personset.headPortrait = file.file_id + '.' +  file.file_extension;
				$personset.upfile = '[{"module_cd":"/head","file_ids":["' + file.file_id + '"]}]';
				$('#previewArea').html('<img id="' + file.file_id + '" src="' + contextPath + '/storage/upload/' + file.file_relative_path + '/' + file.file_id + '.' + file.file_extension + '"/>');
				var w = file.width, 
				h = file.height;
				var Ratio = 1,
					wRatio = Math.ceil(w / 230),
					hRatio = Math.ceil(h / 230);
				if(wRatio >= 1){
					if(hRatio >= 1){
						Ratio = Math.ceil((wRatio + hRatio) / 2);
					}else{
						Ratio = wRatio;
					}
					$('#' + file.file_id).height(h/Ratio);
					$('#' + file.file_id).width(w/Ratio);
				}else{
					if(hRatio >= 1){
						Ratio = hRatio;
						$('#' + file.file_id).height(h/Ratio);
						$('#' + file.file_id).width(w/Ratio);
					}else{
						var wratio = Math.ceil(230/w);
						var hratio = Math.ceil(230/h);
						if(wratio <= hratio){
							Ratio = wratio;
						}else{
							Ratio = hratio;
						}
						$('#' + file.file_id).height(h * Ratio);
						$('#' + file.file_id).width(w * Ratio);
						
						$personset.flag = true;
					}
				}
				$personset.scale = Ratio;
				 $('#' + file.file_id).Jcrop({
					 setSelect: [0,0,120,120],
					 onChange:showPreview,
			        onSelect:showPreview,
					 aspectRatio:1
				 });
			} else {
				var txt=  "获取失败！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			}
		}
    }
}).init();

