		$('ul>li').click(function(){//在一个无序列表超找当前点击事件元素的索引值
		 	var index = $(this).prevAll().length;
		});
		
		#### bootstrap框架的datepicker插件初始化方法：
			var today = new Date();
			today.setDate(today.getDate() - 30);
			//jqueryui时间插件初始化
			$('.startDate, .endDate').datetimepicker({
				  language: "ja",
		          autoclose: true,//选中之后自动隐藏日期选择框
		          clearBtn: true,//清除按钮
		          todayBtn: true,//今日按钮
		          format: "yyyy-mm-dd",
		          startView : 2,//初始视图
		          todayHighlight: 1,
		          minView : 2,//日
		          maxView : 3,//年
		          pickerPosition : 'bottom-right',
			});
			$('.startDate').val(formatDate(today));//默认时间显示
			$('.endDate').val(formatDate(new Date()));
			
			
			map将一组元素转换成其他数组（不论是否是元素数组）
			$("p").append( $("input").map(function(){//demo
			  return $(this).val();
			}).get().join(", ") );
			[ <p>John, password, http://ejohn.org/</p> ]//结果
			
			for (var i = 5;i--;){	console.info('haliluya!!!');	}//打印五次，逆向for循环简洁些
			
####hover相当于onmouseover和onmouseout集合体，两个回调函数，一个是移入，另一个是移出事件
		