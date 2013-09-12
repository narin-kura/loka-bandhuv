base_url = "http://"+document.location.host+"/index.php/";
var cnt=0;
var lat;
var lng;
$(document).ready(function(){

	page_hgt = $(window).height();
	var modif=0;
	if($(".hello_pic").length==0)modif=90;
	if($("body").hasClass("narrow"))modif=0;
	$(".map").css({ "height" : page_hgt-modif });
	
	if(!$("body").hasClass("narrow")){
		makeline(5,"left","bottom","map");
		makeline(5,"right","top","map");
	}
	
	/*ORDER FORM*/
	$(".feedback").live("submit",function(e){
		e.preventDefault();
		var el= $(this);
		el.find("button").addClass("loader");
		var nm = $.trim($("#nm").val());
		var mail = $.trim($("#mail").val());
		var ph = $.trim($("#phone").val());
		var msg = $.trim($("#msg").val());
		if(nm!="" &&  mail!=""){
			$.ajax({
				type: "POST",
				async: false,
				data: {"nm": nm, "phone": ph,"email": mail, "txt": msg, "lang": "en"},
				url: base_url+"main/send_fb",
				success: function(data){
					if(data == 1){
						el.parent().slideUp('fast',function(){
							$(this).html("<div class='feedback_success'><strong>Thanks for Your request.</strong><br/><br/>We will contact You as soon as possible</div>").slideDown('fast');	
						})
					}
				}
			})
		}else {
			$("#form_subm").removeClass("loader");	
		}
		return false;	
	})
	/*END OF ORDER FORM*/
	
	if( $(".scrollable").length>0 && !$("body").hasClass("narrow") ){
		var startAt = $(".scrollable").offset().top;
		$(window).scroll(function(){
		var scrl = $(window).scrollTop();
		if(scrl >= startAt){
			$('.scrollable').css({position: "fixed", top: 0});
		}else {
			$('.scrollable').css({position: "static"});
		}
				
	});
	}
	
	
	
	var hldr = $(".map .holder");
				  	var myLatlng = new google.maps.LatLng(lat,lng);
					var myLatlngCent = new google.maps.LatLng(lat-0.03,lng+0.02);
				  	var myOptions = {
					  zoom: 13,
					  center: myLatlngCent,
					  scrollwheel: false,
   	   				  navigationControl: true,
					  mapTypeControl: false,
					  streetViewControl: false,
					  mapTypeId: google.maps.MapTypeId.ROADMAP
				  	}
					if($("body").hasClass("narrow")){
						myOptions["draggable"]=false;
						var thgt = $("#map_wrapper").height();
						$("#map_wrapper, .map.frame").css({"height": thgt*1.5});
					}
				  	var map = new google.maps.Map(document.getElementById("map_wrapper"), myOptions);			
				   
				   
				   /*TEMP*/
function Label(opt_options) {
 // Initialization
 this.setValues(opt_options);

 // Label specific

 var div = this.div_ = document.createElement('div');
 div.appendChild(document.getElementById("mapform"));
 div.style.cssText = 'position: absolute; display: none';
};
Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
 var pane = this.getPanes().overlayLayer;
 pane.appendChild(this.div_);
 pane.parentNode.style['zIndex'] = 1001;

 // Ensures the label is redrawn if the text or position is changed.
 var me = this;

};

// Implement onRemove
Label.prototype.onRemove = function() {
 this.div_.parentNode.removeChild(this.div_);

 // Label is removed from the map, stop updating its position/text.
 for (var i = 0, I = this.listeners_.length; i < I; ++i) {
   google.maps.event.removeListener(this.listeners_[i]);
 }
};

// Implement draw
Label.prototype.draw = function() {
 var projection = this.getProjection();
 var position = projection.fromLatLngToDivPixel(this.get('position'));

 var div = this.div_;
 div.style.left = position.x + 'px';
 div.style.top = position.y + 'px';
 div.style.display = 'block';
 div.style['zIndex'] = 1001;
 google.maps.event.addDomListener(div, 'mousedown', cancelEvent);  
	//google.maps.event.addDomListener(div, 'click', cancelEvent);             
	google.maps.event.addDomListener(div, 'dblclick', cancelEvent);
	google.maps.event.addDomListener(div, 'contextmenu', cancelEvent);  	
};

 var marker = new google.maps.Marker({
       position: myLatlng,
       draggable: false,
       map: map
     });

     var label = new Label({
       map: map
     });
     label.bindTo('position', marker, 'position');
     //label.bindTo('text', marker, 'position');
	
	function cancelEvent(e) { 
	  e.cancelBubble = true; 
	  if (e.stopPropagation) e.stopPropagation(); 
	} 
				
	
});
