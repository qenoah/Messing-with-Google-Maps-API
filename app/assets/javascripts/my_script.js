function init() {


    var myOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    

    
    // from eqinfo.ucsd.edu/~rnewman/howtos/maps/geolocation/test.html
    // Try W3C Geolocation method (Preferred)
    if(navigator.geolocation) {

        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition( function(position) {
            myLatLong = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            contentString = "Location found using W3C standard";
            map.setCenter(myLatLong);
            
            var marker = new google.maps.Marker({
        			position: myLatLong, 
       			map: map,
       		   title:"Hello World!"
       		});
       		
       		var request = {
       			location: myLatLong,
       			radius: 500,
       			types: ['restaruant']
       		}
		});
	} /* close if */

}