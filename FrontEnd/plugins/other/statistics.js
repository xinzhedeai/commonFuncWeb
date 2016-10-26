/***
 * 展示网页右下角站长统计图表功能
 * 
 * anjun
 * 
 * 2016.08.12
 */
$(document).ready(function(){
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	$('.footer-bottom').append(unescape("%3Cspan id=\'cnzz_stat_icon_1260120095\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1260120095%26show%3Dpic\' type=\'text/javascript\'%3E%3C/script%3E"));
	$('.footer-bottom #cnzz_stat_icon_1260120095').append(
			'<a href="http://www.cnzz.com/stat/website.php?web_id=1260120095" title="站长统计" target="_blank">' +
			'<img border="0" hspace="0" vspace="0" src="http://icon.cnzz.com/img/pic.gif">' +
			'</a>'
			);
});