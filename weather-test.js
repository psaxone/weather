$(document).ready(function(){
    $("button").click(function(){
        var apiKEY = "&appid=af95bc4e30710dff7080cfb67eadba30"
        var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='
        var ciudad = $("#ciudad").val();
        var URLcompleta = apiURL+ciudad+apiKEY
        console.log(URLcompleta);
        $.get(URLcompleta, function( data ) {
            console.log( data );
        });
    });
});


