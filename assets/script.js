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

var day = moment().format("L");

var submitCity = document.createElement("button");
submitCity.textContent = "Submit";
body.appendChild(submitCity);

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
currentForecast.hidden = true;

var cloudy = document.createElement("img");
var raining = document.createElement("img");
var snowing = document.createElement("img");
var storm = document.createElement("img");
var sunnyclear = document.createElement("img");
var haze = document.createElement("img");

cloudy.src = "assets/images/cloudySun.png";
raining.src = "assets/images/rain.png";
snowing.src = "assets/images/Snowing.png";
storm.src = "assets/images/Storm.png";
sunnyclear.src = "assets/images/sunnyClear.png";
haze.src = "assets/images/Windy.png";

var futureForecast = document.getElementById("futureForecast");

var searchHistory = [];
var inStorage = localStorage.getItem("city");
if (null != inStorage)
{
    searchHistory = inStorage.split(",")
}


function onCityBtnClick()
{
    var thisButton = document.getElementById(this.id);

    var chosenCity = thisButton.textContent;

    var getGeoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + chosenCity + "&limit=3&appid=278839f9e7ae87dbb59691575959053f";

    fetch(getGeoURL).then(function (response)
    {
        response.json().then(function (response)
        {
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
                    currentForecast.hidden = false;

                    cityName.textContent = chosenCity + "(" + day + ")" + " ";
                    temp.textContent = "Temperature: " + roundFarenheit;
                    wind.textContent = "Wind Speed: " + weather.current.wind_speed;
                    humidity.textContent = "Humidity: " + weather.current.humidity;
                    UVindex.textContent = "UV Index: " + weather.current.uvi;



                    for (let i = 0; i < 5; i++)
                    {
                        var date = moment().add(i, "days").format("L");
                        var displayDate = document.createElement("h3");
                        var dayTemp = document.createElement("h4");
                        var dayWind = document.createElement("h4");
                        var dayHumidity = document.createElement("h4");
                        var eachDay = document.createElement("div");
                        eachDay.setAttribute("id", "future")

                        var toFarenheit = ((weather.daily[i].temp.day) - 273.15) * 1.8 + 32
                        var roundFarenheit = toFarenheit.toFixed(1);
                        var description = weather.current.weather[0].main;

                        eachDay.appendChild(displayDate);
                        eachDay.appendChild(dayTemp);
                        eachDay.appendChild(dayWind);
                        eachDay.appendChild(dayHumidity);
                        futureForecast.appendChild(eachDay);

                        displayDate.textContent = date;
                        dayTemp.textContent = "Temp: " + roundFarenheit;
                        dayWind.textContent = "Wind: " + weather.daily[i].wind_speed;
                        dayHumidity.textContent = "Humidity: " + weather.daily[i].humidity;
                    }

                    if (weather.current.uvi <= 2)
                    {
                        UVindex.style.backgroundColor = "lightgreen";
                    }
                    else if (weather.current.uvi <= 5)
                    {
                        UVindex.style.backgroundColor = "yellow";
                    }
                    else if (weather.current.uvi <= 7)
                    {
                        UVindex.style.backgroundColor = "lightsalmon";
                    }
                    else
                    {
                        UVindex.style.backgroundColor = "tomato";
                    }

                    if (description.indexOf("Clouds") >= 0)
                    {
                        cityName.append(cloudy);
                    }
                    else if (description.indexOf("Clear") >= 0)
                    {
                        cityName.append(sunnyclear);
                    }
                    else if (description.indexOf("Rain") >= 0)
                    {
                        cityName.append(raining);
                    }
                    else if (description.indexOf("Snow") >= 0)
                    {
                        cityName.append(snowing);
                    }
                    else if (description.indexOf("Haze") >= 0)
                    {
                        cityName.append(haze);
                    }
                    else if (description.indexOf("Thunderstorm") >= 0)
                    {
                        cityName.append(storm);
                    }

                })
            })
        })
    })
}

for (let i = 0; i < searchHistory.length; i++)
{
    var cityBtn = document.createElement("button");
    var searched = document.getElementById("selectCity");
    cityBtn.textContent = searchHistory[i];
    searched.appendChild(cityBtn);
    cityBtn.setAttribute("id", i.toString());
    //don't put parameter parantheses after the function - it means the function is being run, and you want it to be called on click
    cityBtn.addEventListener("click", onCityBtnClick);
}



submitCity.addEventListener("click", function (event)
{
    event.stopPropagation();
    event.preventDefault();

    var city = citySearch.value;
    var geoCodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=3&appid=278839f9e7ae87dbb59691575959053f";

    var cityHistory = [];
    var savedCities = localStorage.getItem("city");
    if (null != savedCities)
    {
        cityHistory = savedCities.split(",");
    }


    if (city === "")
    {
        citySearch.textContent = "Please search for a city";
    }
    else
    {
        cityHistory.push(city);
        localStorage.setItem("city", cityHistory.toString());

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
                        currentForecast.hidden = false;

                        cityName.textContent = city + "(" + day + ")" + " ";
                        temp.textContent = "Temperature: " + roundFarenheit;
                        wind.textContent = "Wind Speed: " + weather.current.wind_speed;
                        humidity.textContent = "Humidity: " + weather.current.humidity;
                        UVindex.textContent = "UV Index: " + weather.current.uvi;



                        for (let i = 0; i < 5; i++)
                        {
                            var date = moment().add(i, "days").format("L");
                            var displayDate = document.createElement("h3");
                            var dayTemp = document.createElement("h4");
                            var dayWind = document.createElement("h4");
                            var dayHumidity = document.createElement("h4");
                            var eachDay = document.createElement("div");
                            eachDay.setAttribute("id", "future")

                            var toFarenheit = ((weather.daily[i].temp.day) - 273.15) * 1.8 + 32
                            var roundFarenheit = toFarenheit.toFixed(1);
                            var description = weather.current.weather[0].main;

                            eachDay.appendChild(displayDate);
                            eachDay.appendChild(dayTemp);
                            eachDay.appendChild(dayWind);
                            eachDay.appendChild(dayHumidity);
                            futureForecast.appendChild(eachDay);

                            displayDate.textContent = date;
                            dayTemp.textContent = "Temp: " + roundFarenheit;
                            dayWind.textContent = "Wind: " + weather.daily[i].wind_speed;
                            dayHumidity.textContent = "Humidity: " + weather.daily[i].humidity;
                        }

                        if (weather.current.uvi <= 2)
                        {
                            UVindex.style.backgroundColor = "lightgreen";
                        }
                        else if (weather.current.uvi <= 5)
                        {
                            UVindex.style.backgroundColor = "yellow";
                        }
                        else if (weather.current.uvi <= 7)
                        {
                            UVindex.style.backgroundColor = "lightsalmon";
                        }
                        else
                        {
                            UVindex.style.backgroundColor = "tomato";
                        }

                        if (description.indexOf("Clouds") >= 0)
                        {
                            cityName.append(cloudy);
                        }
                        else if (description.indexOf("Clear") >= 0)
                        {
                            cityName.append(sunnyclear);
                        }
                        else if (description.indexOf("Rain") >= 0)
                        {
                            cityName.append(raining);
                        }
                        else if (description.indexOf("Snow") >= 0)
                        {
                            cityName.append(snowing);
                        }
                        else if (description.indexOf("Haze") >= 0)
                        {
                            cityName.append(haze);
                        }
                        else if (description.indexOf("Thunderstorm") >= 0)
                        {
                            cityName.append(storm);
                        }

                    })
                })
            })
        }))
    }
})

//for the UV index
// <2 = green 3-5 = yellow 6-7 = orange 8-10 = red



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
