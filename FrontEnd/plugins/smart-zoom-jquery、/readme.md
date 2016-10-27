#图像缩放查看效果插件

`if(picture!="null"){
		t = '<h5>认证所用身份证照片:</h5><a class="img" href="imageshow.html?img=' + result.Picture + '" 			target="_blank" title="点击查看大图"><img style="display:none;" src="' + contextPath + 			'/storage/upload/authentication/' + result.Picture +'" /></a>';
}else{
    t = '<span>该用户还未上传相关认证照片</span>'
}
`