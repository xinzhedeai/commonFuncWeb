/**
 * @file imageshow
 * @date: 2015/12/01 15:27
 * @version: V1.0
 */
'use strict';

$(function(){
	var access_token = getCookie('access_token_admin');
	if (!access_token) {
		location.href = '/admin/login.html';
	}
	var picture = getParameter('img');
//	var p = '<img src="' + contextPath + '/storage/upload/authentication/' + picture +'"/></a>';
	var p = contextPath + '/storage/upload/authentication/' + picture;
	$("#imageFullScreen").attr("src",p);
	 $('#imageFullScreen').smartZoom({'containerClass':'zoomableContainer'});        
     $('#topPositionMap,#leftPositionMap,#rightPositionMap,#bottomPositionMap').bind("click", moveButtonClickHandler);
     $('#zoomInButton,#zoomOutButton').bind("click", zoomButtonClickHandler);
     function zoomButtonClickHandler(e){
         var scaleToAdd = 0.8;
         if(e.target.id == 'zoomOutButton')
            scaleToAdd = -scaleToAdd;
         	$('#imageFullScreen').smartZoom('zoom', scaleToAdd);
     }        
     function moveButtonClickHandler(e){
         var pixelsToMoveOnX = 0;
         var pixelsToMoveOnY = 0;
         switch(e.target.id){
             case "leftPositionMap":
                 pixelsToMoveOnX = 50;	
             break;
             case "rightPositionMap":
                 pixelsToMoveOnX = -50;
             break;
             case "topPositionMap":
                 pixelsToMoveOnY = 50;	
             break;
             case "bottomPositionMap":
                 pixelsToMoveOnY = -50;	
             break;
         }
         $('#imageFullScreen').smartZoom('pan', pixelsToMoveOnX, pixelsToMoveOnY);
     } 
});
