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
       		};
       		infowindow = new google.maps.InfoWindow();
	     		var service = new google.maps.places.PlacesService(map);
   		      service.search(request, callback);
        
		});
	} /* close if */

}

 function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
