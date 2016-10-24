/**
 * 有数据是直接填充
 * 没有数据直接显示默认值
 */	
var cityStr = [];
	if(rows.Area != null){
		$("#prov").val('');
		$("#city").val('');
		$("#dist").val('');
		cityStr = (rows.Area).split("|");
		var prov1 = cityStr[0];
		var city1 = cityStr[1];
		var dist1 = cityStr[2];
		if(prov1){
			if(city1){
				if(dist1){
					$("#city_2").citySelect({
						prov: prov1,
						city: city1,
						dist: dist1,
						nodata:"none"
					});
				}else{
					$("#city_2").citySelect({
						prov: prov1,
						city: city1,
						nodata:"none"
					});
				}
			}else{
				$("#city_2").citySelect({
					prov: prov1,
					nodata:"none"
				});
			}
		}
	}else{
		$("#city_2").citySelect({
			prov:"山东",
			nodata:"none"
		});
	}