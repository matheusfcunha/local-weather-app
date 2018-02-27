// api key 58784daf90133de622f360c9371a6b40

$(document).ready(function() {

    var latitude;
    var longitude;
    var apiKey = '58784daf90133de622f360c9371a6b40';
    var weatherJsonLatLon;
    var forecastJsonLatLon;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            weatherJsonLatLon = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric' + '&appid=' + apiKey;
            forecastJsonLatLon = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=metric' + '&appid=' + apiKey;
            $.getJSON(weatherJsonLatLon, function(response) {
                var city = response.name;
                var timeToday = response.dt;
                var weatherIconID = response.weather[0].id;
                var temperatureNow = response.main.temp;
                var weatherDescription = response.weather[0].description;
                var temperatureFeel = (Math.floor((Math.random() * 4) + 1)) + temperatureNow;
                var windSpeed = response.wind.speed;
                var pressure = response.main.pressure;
                var humidity = response.main.humidity;
                var temperatureVariation = response.main.temp_max - response.main.temp_min;
                changeContent(city, timeToday, weatherIconID, temperatureNow, weatherDescription, temperatureFeel, windSpeed, pressure, humidity, temperatureVariation);
            });
            $.getJSON(forecastJsonLatLon, function(response) {
              console.log(response);
              $(".wth-box").remove();
               for (i = 0; i < 7; i++) {
                 $("#weather-today-hours").append('<div class="wth-box"><p class="bolder-font no-margin-display-inline forecast-hour">' + response.list[i].dt_txt.slice(11, 13) + '</p><br><i class="bolder-font wi wi-cloud wth-margin"></i><br><p class="bolder-font no-margin-display-inline wth-margin">' + Math.floor(response.list[i].main.temp) + '°</p></div>')
               };

               $(".forecast-box").remove();

               for (i = 0; i < response.list.length; i++) {
                 var date = getDates(response.list[i].dt_txt)
                 date = date.split(" ");
                 var weekday    = date[0];
                 var month      = date[1];
                 var monthDay   = date[2];
                 var hours      = date[3];
                 var currentDay = date[4];
                 var monthNumber = date[5];
                 var currentMonth = date[6];
                 var forecastIconID = response.list[i].weather[0].id;


                 if ((monthDay > currentDay || monthNumber > currentMonth) && hours == 12) {
                   forecastIcon = changeIcons(forecastIconID);
                   console.log(forecastIcon);
                   var temp_max = Math.floor((response.list[i].main.temp_max));
                   var temp_min = Math.floor((response.list[i].main.temp_min));
                   console.log(temp_max + ' ' + temp_min);
                   $("#forecast").append('<div class="forecast-box"><p class="no-margin-display-inline font-opacity-lighter">' + weekday + '</p><br><p style="font-size: .6rem;" class="no-margin-display-inline font-opacity-darker">' + month + ' ' + monthDay + '</p><p class="forecast-box-rightside no-margin-display-inline font-opacity-darker">' + temp_max + '°</p><p class="forecast-box-rightside no-margin-display-inline font-opacity-lighter">' + temp_min + '°</p><i class="forecast-box-rightside '  + forecastIcon + ' ' + 'main-color"></i></div>')

                };
               };

            });
        });
    }

    function changeContent(city, timeToday, weatherIconID, temperatureNow, weatherDescription, temperatureFeel, windSpeed, pressure, humidity, temperatureVariation) {
      $("#city").text(city);                                                        // Changes the city name.
      $("#today-date").text(timeConverter(timeToday));                              // Changes the 'Today' date on the header.
      $("#weatherIcon").attr('class', changeIcons(weatherIconID) + ' weather-now'); // Changes the current weather icon.
      $("#weather-now-temperature").text(temperatureNow + '°C');                    // Changes the temperature to the current.
      $("#weather-description").text(titleCase(weatherDescription));                // Changes the weather description.
      $("#temperature-feel").text(temperatureFeel + '°')                            // Changes the text 'Feels like'.
      $("#wind-speed").text(windSpeed);                                             // Changes the wind speed.
      $("#pressure").text(pressure);                                                // Changes the temperature pressure.
      $("#humidity").text(humidity);                                                // Changes the temperature humidity.
      $("#temperature-variation").text(temperatureVariation + '°');                 // Changes the temperature variation, temp_max - temp_min.

    };

    function getDates(date) {
      var date = new Date(date);
      var dayOfWeekNumber = date.getDay();
      var monthNumber = date.getMonth();
      var dayOfMonth = date.getDate();
      var hours = date.getHours();

      var currentDate =  new Date();
      var currentDay = currentDate.getDate();
      var currentMonth = currentDate.getMonth();

      var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var month = months[monthNumber];
      var dayOfWeek = weekdays[dayOfWeekNumber];
      return dayOfWeek + ' ' + month + ' ' + dayOfMonth + ' ' + hours + ' ' + currentDay + ' ' + monthNumber + ' ' + currentMonth;
    }

   function changeIcons (weatherIconID) {
     var hour = (new Date).getHours();
     if (hour >= 6 && hour <= 18) {
       if (weatherIconID <= 232) {
         return "wi wi-day-thunderstorm";
       } else if (weatherIconID >= 300 && weatherIconID <= 321) {
         return "wi wi-day-showers";
       } else if (weatherIconID >= 500 && weatherIconID <= 531) {
         return "wi wi-day-rain";
       } else if (weatherIconID >= 600 && weatherIconID <= 622) {
         return "wi wi-day-snow-wind";
       } else if (weatherIconID >= 701 && weatherIconID <= 781) {
         return "wi wi-windy";
       } else if (weatherIconID === 800) {
         return "wi wi-day-sunny";
       } else if (weatherIconID >= 801 && weatherIconID <= 804) {
         return "wi wi-day-cloudy";
       } else if (weatherIconID >= 900 && weatherIconID <= 962) {
         return "wi-windy";
       }
     } else {
       if (weatherIconID <= 232) {
         return "wi wi-night-thunderstorm";
       } else if (weatherIconID >= 300 && weatherIconID <= 321) {
         return "wi wi-night-alt-showers";
       } else if (weatherIconID >= 500 && weatherIconID <= 531) {
         return "wi wi-night-rain";
       } else if (weatherIconID >= 600 && weatherIconID <= 622) {
         return "wi wi-night-alt-snow";
       } else if (weatherIconID >= 701 && weatherIconID <= 781) {
         return "wi wi-windy";
       } else if (weatherIconID === 800) {
         return "wi wi-night-clear";
       } else if (weatherIconID >= 801 && weatherIconID <= 804) {
         return "wi wi-night-alt-cloudy";
       } else if (weatherIconID >= 900 && weatherIconID <= 962) {
         return "wi-windy";
       }
     }
   };


   function titleCase(str) {
     str = str.toLowerCase();
     var strArray = str.split(' ');
     strArray = strArray.map(function(str) {
       str = str.replace(str[0], str[0].toUpperCase());
       return str;
     });
     return strArray.join(' ');
   };

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var date = a.getDate();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = months[a.getMonth()];
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var weekday = weekdays[a.getDay()];
        var hour = a.getHours();
        var time = weekday + ', ' + month + ' ' + date;
        return time;
    };


});
