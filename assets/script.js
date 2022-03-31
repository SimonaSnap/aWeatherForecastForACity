//the openweather API to use for homework
//url: https://openweathermap.org

//the API call for One Call API 1.0
//the url to change: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//the API call for Geocoding API
//the url to change: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//global variables
var body = document.body;
var citySearch = document.createElement("input");
citySearch.type = "text";
citySearch.value = "";
body.appendChild(citySearch);

var submitCity = document.createElement("button");
submitCity.textContent = "Submit";
body.appendChild(submitCity);

var cityHistory = [];

var currentForecast = document.getElementById("todaysInfo");
var cityName = document.createElement("h1");
var temp = document.createElement("h4");
var wind = document.createElement("h4");
var humidity = document.createElement("h4");
var UVindex = document.createElement("h4");
currentForecast.appendChild(cityName);
currentForecast.appendChild(temp);
currentForecast.appendChild(wind);
currentForecast.appendChild(humidity);
currentForecast.appendChild(UVindex);

var futureForecast = document.getElementById("futureForecast");

submitCity.addEventListener("click", function (event)
{
    event.stopPropagation();
    event.preventDefault();

    var city = citySearch.value;
    var geoCodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=3&appid=278839f9e7ae87dbb59691575959053f";



    if (city === "")
    {
        citySearch.textContent = "Please search for a city";
    }
    else
    {
        fetch(geoCodeURL).then((function (response)
        {
            response.json().then(function (response)
            {
                //console.log(response);
                var longitude = response[0].lon;
                var latitude = response[0].lat;
                var cityWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=278839f9e7ae87dbb59691575959053f";

                fetch(cityWeatherURL).then(function (weather)
                {
                    weather.json().then(function (weather)
                    {
                        console.log(weather);
                        var farenheit = ((weather.current.temp) - 273.15) * 1.8 + 32
                        var roundFarenheit = farenheit.toFixed(1);

                        cityName.textContent = city + " " + weather.current.weather[0];
                        temp.textContent = "Temperature: " + roundFarenheit;
                        wind.textContent = "Wind Speed: " + weather.current.wind_speed;
                        humidity.textContent = "Humidity: " + weather.current.humidity;
                        UVindex.textContent = "UV Index: " + weather.current.humidity;

                        for (let i = 0; i < 5; i++)
                        {
                            var dayTemp = document.createElement("h4");
                            var dayWind = document.createElement("h4");
                            var dayHumidity = document.createElement("h4");
                            var toFarenheit = ((weather.daily[i].temp.day) - 273.15) * 1.8 + 32
                            var roundFarenheit = toFarenheit.toFixed(1);

                            futureForecast.appendChild(dayTemp);
                            futureForecast.appendChild(dayWind);
                            futureForecast.appendChild(dayHumidity);

                            dayTemp.textContent = "Temp: " + roundFarenheit;
                            dayWind.textContent = "Wind: " + weather.daily[i].wind_speed;
                            dayHumidity.textContent = "Humidity: " + weather.daily[i].humidity;
                        }
                    })
                })
            })
        }))
    }
})





//selectCity Div - the place to choose from a selection of different cities that have been stored in the search history
var selectCity = document.getElementById("searchCity");



//for (i = 0; i < 1; i++)
//{
//    var cityWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=47.6038321&lon=-122.3300624&appid=278839f9e7ae87dbb59691575959053f";

//    fetch(cityWeather).then(function (response)
//    {
//        response.json().then(function (response)
//        {
//            console.log(response)
//        })
//    })

//}
