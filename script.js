//Global Function for converting Kevin to Fahrenheit
function toFahrenheit (a){ 
  var decTemp = (a-273.15) * (9/5)+32;
  return decTemp.toFixed(2);
}
// Prepares document 
$(document).ready(function(){
// Variable that sets city search count to zero
  var searchItemCount = 0;
//Click function that fires the ajax request with your given city and populates containers with weather information
$("#city-search").on("click", function(event) {
  event.preventDefault();
   
  var m = moment();
  var today = " (" + moment().format('l') + ") ";
  var city = $("#city-input").val();
  var key ="9546d99cd10770006eac8569a744792c"
  var queryURL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + key;
  var temp = "Temp: "
  var humid = "Humidity: "
   
$.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(json) {
  $("#city").val((json.name) + (today));
  $("#wind-speed").val(json.wind.speed + " MPH");
  $("#description_weather").val(json.weather[0].description);
  $("#weather_image").attr("src", "https://crossorigin.me/http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    var tempFar = toFahrenheit(json.main.temp);
  $("#temperature").val(tempFar + '°F');
  $("#humidity").val((json.main.humidity) + "%");
    
//second ajax request to populate a 5 day weather forecast
$.ajax({
  url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/uvi?appid=" +key + "&lat=" + json.coord.lat +"&lon=" + json.coord.lon,
  method: "GET"
  }).then(function(response) {
  $("#uvIndex").val(response.value);
  console.log(response.value);
    var uvNum = (response.value);
    
  if(uvNum < 2){
    $("#uvIndex").css("background-color", "green");  
  }else if(uvNum < 6){
    $("#uvIndex").css("background-color", "yellow");
  }else if(uvNum < 8){
    $("#uvIndex").css("background-color", "orange");
  }else if(uvNum < 11){
    $("#uvIndex").css("background-color", "red");
  }else{
    $("#uvIndex").css("background-color", "violet");
  }

  var fiveURL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/onecall?lat=" + json.coord.lat + "&lon=" + json.coord.lon + "&exclude=hourly,minutely&appid=" + key; 
  // console.log(fiveURL);
  // console.log(queryURL);
  $.ajax({
    url: fiveURL,
    method: "GET"
    }).then(function(fiveDaily){
  for(var i = 1; i < 6; i++){ 
    //console.log(i);
    //console.log(fiveDaily.daily[i]);
    var futureDays =moment().add(i, 'days').format('l');
    
    $("#fiveDate" + i).val(futureDays);
    $("#fiveIcon" + i).attr("src", "https://crossorigin.me/http://openweathermap.org/img/w/" + fiveDaily.daily[i].weather[0].icon + ".png");
    
    // console.log(fiveDaily.daily[i].weather[0].icon);
    
    var tempFar2 = toFahrenheit(fiveDaily.daily[i].temp.day)
    $("#fiveTemp" + i).val(temp + tempFar2 + '°F');
    $("#fiveHumidity" + i).val(humid + fiveDaily.daily[i].humidity + "%");
  }        
  })
  });   
 });
// A button is created to add the current city to the search history, and can be clicked on later to pull up that given cities weather info             
      searchItemCount++;
      var tempName = "historyBtn" + searchItemCount;  
      $(".weatherHistory").append(`<div>
            <div class="historyColumn">
                <button class="historyBtn" id="${tempName}"></button>
            </div>`
            );
      document.getElementById(tempName).innerHTML = city; 
// click function for past city searches          
    $("#historyBtn1, #historyBtn2, #historyBtn3, #historyBtn4, #historyBtn5, #historyBtn6, #historyBtn7"
      ).on("click", function(event) {
      event.preventDefault();
      var histCity = ($(this).text());
      var m = moment();
      var today = " (" + moment().format('l') + ") ";
      var city = histCity
      var key ="9546d99cd10770006eac8569a744792c"
      var queryURL = ""https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + key;
      var temp = "Temp: "
      var humid = "Humidity: "
      
      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(json) {
        $("#city").val((json.name) + (today));
        $("#wind-speed").val(json.wind.speed + " MPH");
        $("#description_weather").val(json.weather[0].description);
        $("#weather_image").attr("src", "https://crossorigin.me/http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
          var tempFar = toFahrenheit(json.main.temp);
        $("#temperature").val(tempFar + '°F');
        $("#humidity").val((json.main.humidity + "%"));
    

        //$("#city-history").set(city);
        

        $.ajax({
            url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/uvi?appid=" +key + "&lat=" + json.coord.lat +"&lon=" + json.coord.lon,
            method: "GET"
          }).then(function(response) {
            $("#uvIndex").val(response.value);
            console.log(response.value);
              var uvNum = (response.value);
              
            if(uvNum < 2){
              $("#uvIndex").css("background-color", "green");  
            }else if(uvNum < 6){
              $("#uvIndex").css("background-color", "yellow");
            }else if(uvNum < 8){
              $("#uvIndex").css("background-color", "orange");
            }else if(uvNum < 11){
              $("#uvIndex").css("background-color", "red");
            }else{
              $("#uvIndex").css("background-color", "violet");
            }


            var fiveURL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/onecall?lat=" + json.coord.lat + "&lon=" + json.coord.lon + "&exclude=hourly,minutely&appid=" + key; 

            
            console.log(fiveURL);
            console.log(queryURL);
            $.ajax({
              url: fiveURL,
              method: "GET"
            }).then(function(fiveDaily){
              for(var i = 1; i < 6; i++){ 
                console.log(i);
              //console.log(fiveDaily.daily[i]);
              var futureDays =moment().add(i, 'days').format('l');
              $("#fiveDate" + i).val(futureDays);
              $("#fiveIcon" + i).attr("src", "https://crossorigin.me/http://openweathermap.org/img/w/" + fiveDaily.daily[i].weather[0].icon + ".png");
              console.log(fiveDaily.daily[i].weather[0].icon);
                var tempFar2 = toFahrenheit(fiveDaily.daily[i].temp.day)
              $("#fiveTemp" + i).val(temp + tempFar2 + '°F');
              $("#fiveHumidity" + i).val(humid + fiveDaily.daily[i].humidity + "%");
              }        
            })
          });   
        });                       
      });         
  });
});
