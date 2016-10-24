// Smart Time Ago v0.1.0

// Copyright 2012, Terry Tai, Pragmatic.ly
// https://pragmatic.ly/
// Licensed under the MIT license.
// https://github.com/pragmaticly/smart-time-ago/blob/master/LICENSE


(function() {
  var TimeAgo;
 
  TimeAgo = (function() {

    function TimeAgo(element, options) {
      this.startInterval = 60000;
      this.init(element, options);
    }

    TimeAgo.prototype.init = function(element, options) {
      this.$element = $(element);
      this.options = $.extend({}, $.fn.timeago.defaults, options);
      this.updateTime();
      return this.startTimer();
    };

    TimeAgo.prototype.startTimer = function() {
      var self;
      self = this;
      return this.interval = setInterval((function() {
        return self.refresh();
      }), this.startInterval);
    };

    TimeAgo.prototype.stopTimer = function() {
      return clearInterval(this.interval);
    };

    TimeAgo.prototype.restartTimer = function() {
      this.stopTimer();
      return this.startTimer();
    };

    TimeAgo.prototype.refresh = function() {
      this.updateTime();
      return this.updateInterval();
    };

    TimeAgo.prototype.updateTime = function() {
      var self;
      self = this;
      return this.$element.findAndSelf(this.options.selector).each(function() {
        var timeAgoInWords;
        timeAgoInWords = self.timeAgoInWords($(this).attr(self.options.attr));
        return $(this).html(timeAgoInWords);
      
      });
    };

    TimeAgo.prototype.updateInterval = function() {
      var filter, newestTime, newestTimeInMinutes, newestTimeSrc;
      if (this.$element.findAndSelf(this.options.selector).length > 0) {
        if (this.options.dir === "up") {
          filter = ":first";
        } else if (this.options.dir === "down") {
          filter = ":last";
        }
        newestTimeSrc = this.$element.findAndSelf(this.options.selector).filter(filter).attr(this.options.attr);
        newestTime = this.parse(newestTimeSrc);
        newestTimeInMinutes = this.getTimeDistanceInMinutes(newestTime);
        if (newestTimeInMinutes >= 0 && newestTimeInMinutes <= 44 && this.startInterval !== 60000) {
          this.startInterval = 60000;
          return this.restartTimer();
        } else if (newestTimeInMinutes >= 45 && newestTimeInMinutes <= 89 && this.startInterval !== 60000 * 22) {
          this.startInterval = 60000 * 22;
          return this.restartTimer();
        } else if (newestTimeInMinutes >= 90 && newestTimeInMinutes <= 2519 && this.startInterval !== 60000 * 30) {
          this.startInterval = 60000 * 30;
          return this.restartTimer();
        } else if (newestTimeInMinutes >= 2520 && this.startInterval !== 60000 * 60 * 12) {
          this.startInterval = 60000 * 60 * 12;
          return this.restartTimer();
        }
      }
    };
   
    TimeAgo.prototype.timeAgoInWords = function(timeString) {
      var absolutTime;
      absolutTime = this.parse(timeString);
      return this.distanceOfTimeInWords(absolutTime) /*+ (this.options.lang.suffix)*/;
    };
   
    TimeAgo.prototype.parse = function(iso8601) {
      var timeStr;
      timeStr = $.trim(iso8601);
      timeStr = timeStr.replace(/\.\d\d\d+/, "");
      timeStr = timeStr.replace(/-/, "/").replace(/-/, "/");
      timeStr = timeStr.replace(/T/, " ").replace(/Z/, " UTC");
      timeStr = timeStr.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
      return new Date(timeStr);
    };

    TimeAgo.prototype.getTimeDistanceInMinutes = function(absolutTime) {
      var timeDistance;
      timeDistance = new Date().getTime() - absolutTime.getTime();
      var time = Math.abs(timeDistance) / 1000 / 60;
      if(Math.floor(time) == 0){
    	  return Math.floor(time);
      }else{
    	  return Math.round((Math.abs(timeDistance) / 1000) / 60);  
      }
    };
    
    function Todate(num,tag) { //时间转换jianghaipeng
  	  num = num + "";
  	  var date = "";
  	  var month = new Array();
  	  month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6;
  	  month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
  	  var week = new Array();
  	  week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
  	  str = num.split(" ");
  	  var t = tag;
  	  if(t == 1){
  		  date = str[3] + "-";
  		  date = date + month[str[1]] + "-" + str[2] + " " + str[4].substr(0,5);  
  	  }else{
  		  date = "";
  		  date = date + month[str[1]] + "-" + str[2] + " " + str[4].substr(0,5);
  	  }
  	  return date;
  	 };
    function ieTodate(num,tag) { //ie时间转换jianghaipeng
		num = num + "";
		var date = "";
		var month = new Array();
		month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6;
		month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
		var week = new Array();
		week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
		str = num.split(" ");
		var t = tag;
		if(t == 1){
			date = str[5] + "-";
			date = date + month[str[1]] + "-" + str[2] + " " + str[3].substr(0,5);  
		}else{
			date = "";
			date = date + month[str[1]] + "-" + str[2] + " " + str[3].substr(0,5);
		}
		return date;
	 };
	 function Ietest(absolutTime,tag){
    	 var Sys = {};
         var ua = navigator.userAgent.toLowerCase();
         var s;
         (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
         (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
         (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
         (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
         (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
         if(Sys.ie){
       	  if (Sys.ie.substr(0,2) < 11)
       		 return ieTodate(absolutTime,tag);
             else
            	 return Todate(absolutTime,tag);
         }else{
        	 return Todate(absolutTime,tag);
         }
	 };
    TimeAgo.prototype.distanceOfTimeInWords = function(absolutTime) {
      var dim;
      dim = this.getTimeDistanceInMinutes(absolutTime);
      var IETester = 10;
      if (dim >= 0 && dim < 1) {
    	  //return "" + this.options.lang.prefixes.lt + " " + this.options.lang.units.minute;
    	  //return "1 " + this.options.lang.units.minute;
    	  return "刚刚";
      }else if (dim >= 525600) {
    	  return Ietest(absolutTime,1);
      }else if (dim > 4320) {
    	  return Ietest(absolutTime,0);
      }else if (dim === 1) {
    	  return "1 " + this.options.lang.units.minute + this.options.lang.suffix;
      }else if (dim >= 2 && dim <= 44) {
    	  return "" + dim + " " + this.options.lang.units.minutes + this.options.lang.suffix;
      }else if (dim >= 45 && dim <= 89) {
    	  return ""  + " 1 " + this.options.lang.units.hour + this.options.lang.suffix;
      }else if (dim >= 90 && dim <= 1439) {
    	  return ""  + (Math.round(dim / 60)) + " " + this.options.lang.units.hours + this.options.lang.suffix;
      }else if (dim >= 1440 && dim <= 2519) {
    	  return "1 " + this.options.lang.units.day + this.options.lang.suffix;
      }else if (dim >= 2520 && dim <= 43199) {
    	  return "" + (Math.round(dim / 1440)) + " " + this.options.lang.units.days + this.options.lang.suffix;
      }
      /* else if (dim >= 2520 && dim <= 43199) {
        return "" + (Math.round(dim / 1440)) + " " + this.options.lang.units.days;
      } else if (dim >= 43200 && dim <= 86399) {
        return "" + " 1 " + this.options.lang.units.month;
      } else if (dim >= 86400 && dim <= 525599) {
        return "" + (Math.round(dim / 43200)) + " " + this.options.lang.units.months;
      } else if (dim >= 525600 && dim <= 655199) {
        return "" + " 1 " + this.options.lang.units.year;
      } else if (dim >= 655200 && dim <= 914399) {
        return "" + " 1 " + this.options.lang.units.year;
      } else if (dim >= 914400 && dim <= 1051199) {
        return ""+ " 2 " + this.options.lang.units.years;
      } else {
        return "" + (Math.round(dim / 525600)) + " " + this.options.lang.units.years;
      }*/
    };

    return TimeAgo;

  })();
  
  
  $.fn.timeago = function(options) {
    if (options == null) options = {};
    return this.each(function() {
      var $this, data;
      $this = $(this);
      data = $this.data("timeago");
      if (!data) $this.data("timeago", new TimeAgo(this, options));
      if (typeof options === 'string') return data[options]();
    });
  };

  $.fn.findAndSelf = function(selector) {
    return this.find(selector).add(this.filter(selector));
  };

  $.fn.timeago.Constructor = TimeAgo;

/* $.fn.timeago.defaults = {
    selector: 'time.timeago',
    attr: 'datetime',
    dir: 'up',
    lang: {
      units: {
        second: "second",
        seconds: "seconds",
        minute: "minute",
        minutes: "minutes",
        hour: "hour",
        hours: "hours",
        day: "day",
        days: "days",
        month: "month",
        months: "months",
        year: "year",
        years: "years"
      },
      prefixes: {
        lt: "less than 1",
        about: "",//大约
        over: "over",
        almost: "almost"
      },
      suffix: ' ago'
    }
  };*/
  
  
  $.fn.timeago.defaults = {
    selector: 'time.timeago',
    attr: 'datetime',
    dir: 'up',
    lang: {
      units: {
        second: "秒",
        seconds: "秒",
        minute: "分钟",
        minutes: "分钟",
        hour: "小时",
        hours: "小时",
        day: "天",
        days: "天",
        month: "月",
        months: "月",
        year: "年",
        years: "年"
      },
      prefixes: {
        lt: "少于1",
        about: "大约",
        over: "超过",
        almost: "接近"
      },
      suffix: '前'
    }
  };

}).call(this);
