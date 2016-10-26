$(function(){
	
	$(".ptss__toggle-btn").click(function () {	
		$('.js-ptss-frame').toggleClass('is-opened');
	});
	
	
	$('.ptss__layout-wrapper > div').click(function(){
		
		$(this).closest('.ptss__setting-control').find('.ptss__layout-wrapper').removeClass('is-selected');
		
		$(this).parent().addClass('is-selected');
		
		if( $(this).hasClass('ptss__layout-box--wide') ) {
			
			$('body').removeClass('boxed');
			
		} else {
			
			$('body').addClass('boxed');
			
		}
		
	});
	
	
	$('#ptss__color-skin > span').click(function(){
		
		$(this).parent().find('span').removeClass('is-selected');
		
		$(this).addClass('is-selected');
		
		$cssLink = $("<link/>", {
			rel: "stylesheet",
		   	type: "text/css"
		})
		
		
		
		if( $(this).hasClass('option0') ) {
			
			$cssLink.attr('href', 'css/style-alt0.css');
			
		} else if( $(this).hasClass('option1') ) {
						
			$cssLink.attr('href', 'css/style-alt1.css');
			
		} else if( $(this).hasClass('option2') ) {
			
			$cssLink.attr('href', 'css/style-alt2.css');
			
		} else if( $(this).hasClass('option3') ) {
			
			$cssLink.attr('href', 'css/style-alt3.css');
			
		} else if( $(this).hasClass('option4') ) {
			
			$cssLink.attr('href', 'css/style-alt4.css');
			
		}
		
		$cssLink.appendTo("head");
		
	})
	
})


