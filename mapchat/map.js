var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
      zoom: 13, // The larger the zoom number, the bigger the zoom
      center: me,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
var http = new XMLHttpRequest();
var map;
var data = new Array();
var markers = new Array();
var text = new Array();
var infowindow = new google.maps.InfoWindow();

function init() {
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  getMyLocation();
}

function getMyLocation() {
  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
    navigator.geolocation.getCurrentPosition(function(position) {
      myLat = position.coords.latitude;
      myLng = position.coords.longitude;
      postmystuff();
    });
  }
  else {
    alert("Geolocation is not supported by your web browser.  What a shame!");
  }
}

function postmystuff() {
  var url = "https://ancient-shore-1307.herokuapp.com/sendLocation";
  var params = "login=KelleyRumfelt&lat=" + myLat + "&lng=" + myLng + "&message=I%20am%20here!";
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          data = JSON.parse(http.responseText);
          renderMap();
      }
  }
  http.send(params);
}

function renderMap() {
    me = new google.maps.LatLng(myLat, myLng);
    
    // Update map and go there...
    map.panTo(me);

    // Create a marker
    for (i = 0; i < data.length; i++) {

        var them = new google.maps.LatLng(data[i].lat, data[i].lng);
        text[i] = "<span class='label'>User:</span> " + data[i].login + 
        "<br/> <span class='label'>Message:</span> " + data[i].message + 
        "<br/> <span class='label'>Miles away:</span> " + haversine(me, them).toFixed(2);
        if (data[i].login != 'KelleyRumfelt'){
          markers[i] = new google.maps.Marker({
            position: them,
            content: text[i]
          });
        }
        else {
          markers[i] = new google.maps.Marker({
            position: them,
            content: text[i],
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
        }
        markers[i].setMap(map);
        google.maps.event.addListener(markers[i], 'click', function() {
          infowindow.setContent(this.content);
          infowindow.open(this.getMap(), this);
        });
    }

}
    
  // Open info window on click of marker

var rad = function(x) {
    return x * Math.PI / 180;
};

function haversine(p1, p2) {
  
  var R = 3959; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}
