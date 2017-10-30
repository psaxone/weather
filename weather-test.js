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
                $("#pressure").html(data.main.pressure);
                updateMap(data)
        });
    });
});


function initMap() {
    var uluru = {lat: 0, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 1,
      center: uluru
    });
}

function updateMap(data) {
    
     var uluru = {lat: (data.coord.lat), lng: (data.coord.lon)};
     var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 6,
       center: uluru
     });
     var marker = new google.maps.Marker({
       position: uluru,
       map: map
     });
 }
 



