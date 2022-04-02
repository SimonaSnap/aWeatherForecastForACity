//the openweather API to use for homework
//url: https://openweathermap.org

//the API call for One Call API 1.0
//the url to change: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//the API call for Geocoding API
//the url to change: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//global variables
var body = document.body;
var searchDiv = document.getElementById("searchCity")
var citySearch = document.createElement("input");
citySearch.type = "text";
citySearch.value = "";
searchDiv.appendChild(citySearch);

var day = moment().format("L");

var submitCity = document.createElement("button");
submitCity.textContent = "Submit";
searchDiv.appendChild(submitCity);

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


for (let i = 0; i < 5; i++)
{
    var dayDiv = document.getElementById((i + 50).toString());
    dayDiv.hidden = true;
}

//hiding the empty image
for (let i = 0; i < 5; i++)
{
    var emptyimage = document.getElementById((i + 75).toString());
    emptyimage.hidden = true;
}

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

    var getGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + chosenCity + "&limit=3&appid=278839f9e7ae87dbb59691575959053f";

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
                    //console.log(weather);
                    var farenheit = ((weather.current.temp) - 273.15) * 1.8 + 32
                    var roundFarenheit = farenheit.toFixed(1);
                    currentForecast.hidden = false;
                    var currentDescription = weather.current.weather[0].main;

                    cityName.textContent = chosenCity + "(" + day + ")" + " ";
                    temp.textContent = "Temperature: " + roundFarenheit;
                    wind.textContent = "Wind Speed: " + weather.current.wind_speed;
                    humidity.textContent = "Humidity: " + weather.current.humidity;
                    UVindex.textContent = "UV Index: " + weather.current.uvi;



                    for (let i = 0; i < 5; i++)
                    {
                        var date = moment().add((i + 1), "days").format("L");
                        var displayDate = document.getElementById((i + 55).toString());
                        var weathericon = document.getElementById((i + 75).toString());
                        weathericon.hidden = false;
                        var dayTemp = document.getElementById((i + 60).toString());
                        var dayWind = document.getElementById((i + 65).toString());
                        var dayHumidity = document.getElementById((i + 70).toString());
                        var eachDay = document.getElementById((i + 50).toString());
                        eachDay.hidden = false;

                        var toFarenheit = ((weather.daily[i].temp.day) - 273.15) * 1.8 + 32
                        var roundFarenheit = toFarenheit.toFixed(1);
                        var description = weather.daily[i].weather[0].main;

                        eachDay.appendChild(displayDate);
                        eachDay.appendChild(weathericon);
                        eachDay.appendChild(dayTemp);
                        eachDay.appendChild(dayWind);
                        eachDay.appendChild(dayHumidity);
                        futureForecast.appendChild(eachDay);

                        displayDate.textContent = date;
                        dayTemp.textContent = "Temp: " + roundFarenheit;
                        dayWind.textContent = "Wind: " + weather.daily[i].wind_speed;
                        dayHumidity.textContent = "Humidity: " + weather.daily[i].humidity;

                        if (description.indexOf("Clouds") >= 0)
                        {
                            weathericon.src = "assets/images/cloudySun.png";
                        }
                        else if (description.indexOf("Clear") >= 0)
                        {
                            weathericon.src = "assets/images/sunnyClear.png";
                        }
                        else if (description.indexOf("Rain") >= 0)
                        {
                            weathericon.src = "assets/images/rain.png";
                        }
                        else if (description.indexOf("Snow") >= 0)
                        {
                            weathericon.src = "assets/images/Snowing.png";
                        }
                        else if (description.indexOf("Haze") >= 0)
                        {
                            weathericon.src = "assets/images/Windy.png"
                        }
                        else if (description.indexOf("Thunderstorm") >= 0)
                        {
                            weathericon.src = "assets/images/Storm.png";
                        }
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

                    if (currentDescription.indexOf("Clouds") >= 0)
                    {
                        cityName.append(cloudy);
                    }
                    else if (currentDescription.indexOf("Clear") >= 0)
                    {
                        cityName.append(sunnyclear);
                    }
                    else if (currentDescription.indexOf("Rain") >= 0)
                    {
                        cityName.append(raining);
                    }
                    else if (currentDescription.indexOf("Snow") >= 0)
                    {
                        cityName.append(snowing);
                    }
                    else if (currentDescription.indexOf("Haze") >= 0)
                    {
                        cityName.append(haze);
                    }
                    else if (currentDescription.indexOf("Thunderstorm") >= 0)
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
    var geoCodeURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=3&appid=278839f9e7ae87dbb59691575959053f";

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
                        //console.log(weather);
                        var farenheit = ((weather.current.temp) - 273.15) * 1.8 + 32
                        var roundFarenheit = farenheit.toFixed(1);
                        currentForecast.hidden = false;
                        var currentDescription = weather.current.weather[0].main;

                        cityName.textContent = city + "(" + day + ")" + " ";
                        temp.textContent = "Temperature: " + roundFarenheit;
                        wind.textContent = "Wind Speed: " + weather.current.wind_speed;
                        humidity.textContent = "Humidity: " + weather.current.humidity;
                        UVindex.textContent = "UV Index: " + weather.current.uvi;



                        for (let i = 0; i < 5; i++)
                        {
                            var date = moment().add((i + 1), "days").format("L");
                            var displayDate = document.getElementById((i + 55).toString());
                            var weathericon = document.getElementById((i + 75).toString());
                            weathericon.hidden = false;
                            var dayTemp = document.getElementById((i + 60).toString());
                            var dayWind = document.getElementById((i + 65).toString());
                            var dayHumidity = document.getElementById((i + 70).toString());
                            var eachDay = document.getElementById((i + 50).toString());
                            eachDay.hidden = false;

                            var toFarenheit = ((weather.daily[i].temp.day) - 273.15) * 1.8 + 32
                            var roundFarenheit = toFarenheit.toFixed(1);
                            var description = weather.daily[i].weather[0].main;

                            eachDay.appendChild(displayDate);
                            eachDay.appendChild(weathericon);
                            eachDay.appendChild(dayTemp);
                            eachDay.appendChild(dayWind);
                            eachDay.appendChild(dayHumidity);
                            futureForecast.appendChild(eachDay);


                            displayDate.textContent = date;
                            dayTemp.textContent = "Temp: " + roundFarenheit;
                            dayWind.textContent = "Wind: " + weather.daily[i].wind_speed;
                            dayHumidity.textContent = "Humidity: " + weather.daily[i].humidity;

                            if (description.indexOf("Clouds") >= 0)
                            {
                                weathericon.src = "assets/images/cloudySun.png";
                            }
                            else if (description.indexOf("Clear") >= 0)
                            {
                                weathericon.src = "assets/images/sunnyClear.png";
                            }
                            else if (description.indexOf("Rain") >= 0)
                            {
                                weathericon.src = "assets/images/rain.png";
                            }
                            else if (description.indexOf("Snow") >= 0)
                            {
                                weathericon.src = "assets/images/Snowing.png";
                            }
                            else if (description.indexOf("Haze") >= 0)
                            {
                                weathericon.src = "assets/images/Windy.png"
                            }
                            else if (description.indexOf("Thunderstorm") >= 0)
                            {
                                weathericon.src = "assets/images/Storm.png";
                            }
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

                        if (currentDescription.indexOf("Clouds") >= 0)
                        {
                            cityName.append(cloudy);
                        }
                        else if (currentDescription.indexOf("Clear") >= 0)
                        {
                            cityName.append(sunnyclear);
                        }
                        else if (currentDescription.indexOf("Rain") >= 0)
                        {
                            cityName.append(raining);
                        }
                        else if (currentDescription.indexOf("Snow") >= 0)
                        {
                            cityName.append(snowing);
                        }
                        else if (currentDescription.indexOf("Haze") >= 0)
                        {
                            cityName.append(haze);
                        }
                        else if (currentDescription.indexOf("Thunderstorm") >= 0)
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
