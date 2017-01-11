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

		$('#content img').not('.loaded');//获取不存在样式loaded的图片
		$.each(array, function(){
			return (this != 'haliluya' );//当this为haliluya的时侯跳出循环
		})
		
####比较两个数` > < = `三个关系 `return (compA < compB)?-1:(compA > compB)?1:0;`
#### get函数可以将选中的页面元素集合转化为数组。	
#### 为jquery dom搜索指定一个上下文$("a", "js_links#div");		
		$('[type=button]').attr('disabled');//禁用按钮  attr('disabled', '');//解禁按钮
		$('.className', '#id')//为jquery制定一个上下文，可以大大加快便利dom的速度
		doucument.getElementById('baz').href = this.href;
		$('div.name')比 $('.name')效率要搞 ，建议这么进行dom的选择
·	
