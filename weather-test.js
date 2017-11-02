var map = null
var marker = null

$(document).ready(function(){
    $("button").click(function(){
        var apiKEY = "&units=metric&appid=af95bc4e30710dff7080cfb67eadba30"
        var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='
        var ciudad = $("#ciudad").val();
        var URLcompleta = apiURL+ciudad+apiKEY
        console.log(URLcompleta);
        $.get(URLcompleta, function( data ) {
            console.log( data );
                $("#city").html(data.name);
                $("#temperature").html(data.main.temp);
                $("#temp_max").html(data.main.temp_max);
                $("#temp_min").html(data.main.temp_min);
                $("#pressure").html(data.main.pressure + ' hPa');
                $("#humidity").html(data.main.humidity + ' %');
                updateMap(data)
        });
    });
});


function initMap() {
    var uluru = {lat: 0, lng: 0};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: uluru
    });
}

function updateMap(data) {
     var uluru = {lat: (data.coord.lat), lng: (data.coord.lon)};
     if (marker === null){
        marker = new google.maps.Marker({
             position: uluru,
             map: map,
        })
     } else {
         marker.setPosition(uluru)
     }
     map.setZoom(5);
     map.panTo(uluru);
 }
 
 