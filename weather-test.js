$(document).ready(function(){
    $("button").click(function(){
        var apiKEY = "&appid=b1b15e88fa797225412429c1c50c122a1"
        var apiURL = 'http://samples.openweathermap.org/data/2.5/weather?q='
        var ciudad = $("#ciudad").val();
        var URLcompleta = apiURL+ciudad+apiKEY
        console.log(URLcompleta);
        $.get(URLcompleta, function( data ) {
            console.log( data );
        });
    });
});


