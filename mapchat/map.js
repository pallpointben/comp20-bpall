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
  var url = "https://secret-about-box.herokuapp.com/sendLocation";
  var params = "login=KelleyRumfelt&lat=" + myLat + "&lng=" + myLng + "&message=Shum%20shum%20shlippady%20dop!";
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

        me = new google.maps.LatLng(data[i].lat, data[i].lng);
        text[i] = "User: " + data[i].login + "<br/> Message:" + data[i].message + "<br/> Miles away:" + haversine(data[i].lat, data[i].lng);
        markers[i] = new google.maps.Marker({
          position: me,
          content: text[i]
        });
        markers[i].setMap(map);
        google.maps.event.addListener(markers[i], 'click', function() {
          infowindow.setContent(this.content);
          infowindow.open(this.getMap(), this);
        });
    }
}
    
  // Open info window on click of marker
  
function haversine(lat, lng) {
  return lat + " " + lng;
}
