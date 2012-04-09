var map;
var infoWindow;

function initialize() {



  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
                                       
                                       
      var myOptions = {
      		zoom: 16,
      		mapTypeId: google.maps.MapTypeId.ROADMAP,
      		center: pos
      	};
	
	  map = new google.maps.Map(document.getElementById('map_canvas'),
      myOptions);                 

		// Put marker and info box at your location
      var yourInfo = new google.maps.InfoWindow({
        content: 'You are here!'
      });
      
      var marker = new google.maps.Marker({
        position: pos, 
        map: map,
        title:"Your location"
      });


      
      google.maps.event.addListener(marker, 'click', function() {
        yourInfo.open(map,marker);
      });
      
      
      // Find nearest restaurants and place maerkers
      var request = {
          location: pos,
          radius: 500,
          types: ['restaurant']
      };
      
       infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.search(request, callback);
     
    
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
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

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);