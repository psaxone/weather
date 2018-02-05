var map = null;
var marker = null;
var icon = {
  "01d": "./climacons-master/SVG/Sun.svg",
  "01n": "./climacons-master/SVG/Moon.svg",
  "02d": "./climacons-master/SVG/Cloud-Sun.svg",
  "02n": "./climacons-master/SVG/Cloud-Moon.svg",
  "03d": "./climacons-master/SVG/Cloud.svg",
  "03n": "./climacons-master/SVG/Cloud.svg",
  "04d": "./climacons-master/SVG/Cloud-Wind.svg",
  "04n": "./climacons-master/SVG/Cloud-Wind.svg",
  "09d": "./climacons-master/SVG/Cloud-Drizzle-Sun.svg",
  "09n": "./climacons-master/SVG/Cloud-Drizzle-Moon.svg",
  "10d": "./climacons-master/SVG/Cloud-Drizzle-Sun-Alt.svg",
  "10n": "./climacons-master/SVG/Cloud-Drizzle-Moon-Alt.svg",
  "11d": "./climacons-master/SVG/Cloud-Lightning-Sun.svg",
  "11n": "./climacons-master/SVG/Cloud-Lightning-Moon.svg",
  "13d": "./climacons-master/SVG/Cloud-Snow-Sun-Alt.svg",
  "13n": "./climacons-master/SVG/Cloud-Snow-Moon-Alt.svg",
  "50d": "./climacons-master/SVG/Cloud-Fog-Sun.svg",
  "50n": "./climacons-master/SVG/Cloud-Fog-Moon.svg"
};

$("#div-popup").hide();
$(document).ready(function() {
  $("#boton-search").attr("disabled", true);
  $("#ciudad").keyup(function() {
    if ($(this).val().length != 0) $("#boton-search").attr("disabled", false);
    else $("#boton-search").attr("disabled", true);
  });
  $("#boton-search").click(function() {
    var apiKEY = "&units=metric&appid=af95bc4e30710dff7080cfb67eadba30";
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var ciudad = $("#ciudad").val();
    var URLcompleta = apiURL + ciudad + apiKEY;
    console.log(URLcompleta);
    $.get(URLcompleta, function(data) {
      console.log(data);
      $("#city")
        .html(data.name)
        .addClass("h2-popup");
      $("#temperature")
        .html(data.main.temp + "º")
        .addClass("h1-popup");
      $("#temp_max").html(data.main.temp_max);
      $("#temp_min").html(data.main.temp_min);
      $("#pressure")
        .html(data.main.pressure + " hPa")
        .addClass("h3-popup");
      $("#humidity")
        .html(data.main.humidity + " %")
        .addClass("h3-popup");
      updateMap(data.coord.lat, data.coord.lon);
      var codigo = data.weather[0].icon;
      var rutaIcono = icon[codigo];
      $("#weather-icon").attr("src", rutaIcono);
      $("#div-popup").show();
      $("#boton-mapa").click(function() {
        $("#div-popup").hide();
      });
    });
  });
  $("#boton-geo").click(function() {
    geoLoc();
  });
});

function initMap() {
  var uluru = { lat: 0, lng: 0 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: uluru
  });
}

function updateMap(latitud, longitud) {
  var uluru = { lat: latitud, lng: longitud };
  if (marker === null) {
    marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  } else {
    marker.setPosition(uluru);
  }
  map.setZoom(13);
  map.panTo(uluru);
}

function geoLoc() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var uluru = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    handleGeoChanges(position.coords.latitude, position.coords.longitude);
  });
}

function handleGeoChanges(latitud, longitud) {
  updateMap(latitud, longitud);
  var apiKEY = "&units=metric&appid=af95bc4e30710dff7080cfb67eadba30";
  var apiURLgeoLat = "https://api.openweathermap.org/data/2.5/weather?lat=";
  var apiURLgeoLon = "&lon=";
  var URLgeo = apiURLgeoLat + latitud + apiURLgeoLon + longitud + apiKEY;
  $.get(URLgeo, function(data) {
    $("#city")
      .html(data.name)
      .addClass("h2-popup");
    $("#temperature")
      .html(data.main.temp + "º")
      .addClass("h1-popup");
    $("#temp_max").html(data.main.temp_max);
    $("#temp_min").html(data.main.temp_min);
    $("#pressure")
      .html(data.main.pressure + " hPa")
      .addClass("h3-popup");
    $("#humidity")
      .html(data.main.humidity + " %")
      .addClass("h3-popup");
    updateMap(data.coord.lat, data.coord.lon);
    var codigo = data.weather[0].icon;
    var rutaIcono = icon[codigo];
    $("#weather-icon").attr("src", rutaIcono);
    $("#div-popup").show();
    $("#boton-mapa").click(function() {
      $("#div-popup").hide();
    });
  });
}
