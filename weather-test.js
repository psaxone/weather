$(document).ready(function(){
    $("button").click(function(){
        var apiKEY = "&units=metric&appid=af95bc4e30710dff7080cfb67eadba30"
        var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='
        var ciudad = $("#ciudad").val();
        var URLcompleta = apiURL+ciudad+apiKEY
        console.log(URLcompleta);
        $.get(URLcompleta, function( data ) {
            console.log( data );
            $(document).ready(function(){
                $("#city").append(data.name);
                $("#temperature").append(data.main.temp);
                $("#pressure").append(data.main.pressure);
            });   
        });
    });
});



