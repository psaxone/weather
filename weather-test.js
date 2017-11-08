var map = null
var marker = null
// var icon = {
//     200: '../desktop/climacons-master/SVG/Cloud-Drizzle.svg',
//     500: '../desktop/climacons-master/SVG/Cloud-Lightning.svg',
// }

$("#div-popup").hide();
$(document).ready(function(){
    $("button").click(function(){
        var apiKEY = "&units=metric&appid=af95bc4e30710dff7080cfb67eadba30"
        var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='
        var ciudad = $("#ciudad").val();
        var URLcompleta = apiURL+ciudad+apiKEY
        console.log(URLcompleta);
        $.get(URLcompleta, function( data ) {
            console.log( data );
                $("#city").html(data.name).addClass("h2-popup");
                $("#temperature").html(data.main.temp + 'º').addClass("h1-popup");
                $("#temp_max").html(data.main.temp_max);
                $("#temp_min").html(data.main.temp_min);
                $("#pressure").html(data.main.pressure + ' hPa').addClass("h3-popup");
                $("#humidity").html(data.main.humidity + ' %').addClass("h3-popup");
                $("#weather.icon").html(data.weather.icon);
                $("#div-popup").show();
                $("#boton-mapa").click(function(){
                    $("#div-popup").hide(function(){
                        updateMap(data);
                    });
                });
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
     map.setZoom(13);
     map.panTo(uluru);
 }
 
 