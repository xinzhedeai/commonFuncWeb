/**
 * 
 * @functionName: datepickerJQueryUI
 * @Description: 自定义easyUI的create datepicker 方法
 * @param: options-选填
 * @desc : 默认起始时间不能大于技术时间。结束时间不能小于起始时间
 */
jQuery.fn.datepickerJQueryUI = function() {
	var options = (arguments.length > 0 ? arguments[0] : {}),
	options_extend = {
		changeYear : true,
		changeMonth : true,
		showAnim : 'slideDown',
		showOn : 'both',
		buttonImageOnly: true,
		buttonImage : '/lib/img/ico/ico_calendar.png',
		buttonText : '选择日期',
		maxDate: new Date(),
		onClose : function(selectedDate) {
			 if ($(this).hasClass('startDate')) {
				if ($(this).next().next().hasClass('endDate')) {
					$(this).next().next().datepicker('option', 'minDate', selectedDate);
				}
			} else if ($(this).hasClass('endDate')) {
				if ($(this).prev().prev().hasClass('startDate')) {
					$(this).prev().prev().datepicker('option', 'maxDate', new Date());
				}
			}
		}
	};
	$.extend(options, options_extend);
	$.each(this, function(index, input) {
		if (!$(input).val()) {
			//设置开始日期为一个月前，结束日期为当天
			if ($(input).hasClass('startDate')||$(input).hasClass('statDate')) {
				var today = new Date();
				today.setDate(today.getDate()-15);
				$(input).val(formatDate(today));
				
			} else if ($(input).hasClass('endDate') || $(input).hasClass('edDate')) {
				$(input).val(formatDate( new Date()));
			}
		}
	});
	$(this).datepicker(options);
} 

/**
 * jqueryui datepicker 日期拓展方法（含有时分秒）
 * 
 */
jQuery.fn.datepickerJQueryUITwo = function() {
	var options = (arguments.length > 0 ? arguments[0] : {
		timeFormat: 'HH:mm:ss',
		stepHour: 1,
		stepMinute: 1,
		stepSecond: 1
	}),
	options_extend = {
		changeYear : true,
		changeMonth : true,
		showAnim : 'slideDown',
		showOn : 'both',
		buttonImageOnly: true,
		buttonImage : '/lib/img/ico/ico_calendar.png',
		buttonText : '选择日期',
		onClose : function(selectedDate) {
			 if ($(this).hasClass('startDate')) {
				if ($(this).next().next().hasClass('endDate')) {
				}
			} else if ($(this).hasClass('endDate')) {
				if ($(this).prev().prev().hasClass('startDate')) {
				}
			}
		}
	};
	$.extend(options, options_extend);
	$.each(this, function(index, input) {
		if (!$(input).val()) {
			var originToday = new Date();
			var newTime = null;
			if ($(input).hasClass('startDate')) {
				newTime = getCurrentTimeHMS(originToday,-15);
				$(input).val(newTime);
			} else if ($(input).hasClass('endDate')) {
				newTime = getCurrentTimeHMS(originToday,15);
				$(input).val(newTime);
			}
		}
	});
	$(this).datetimepicker(options);
} 
