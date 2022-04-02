# aWeatherForecastForACity

## Deployed GitHub Page: https://simonasnap.github.io/aWeatherForecastForACity/ 

## Description:
A weather forecast dashboard. Submit a city name in the input to generate today's weather information as well as a 5 day forecast (that city will go into a search hisotry section that will populate on refresh), or click one of the city buttons in the search hisotry to get that information as well.

Forecast information includes, the city name, UV Index (that is color coded based on condition), the day's date, an icon to match the weather condition, the temperature in Farenheit, Humidity and windspeed.

The 5 day forecast does not include city name, and UV index information

## What I learned:
- Practiced what it meant to do a fetch API call on my own
    - Also how to set up a fetch call within another fetch call
    - How to set a variable parameter so the user input dictates the information returned
- Practiced traversal - variables were set to be a certain variable set in the weather object being returned
- Practiced setting up empty divs in the html to make sure that the loop i set in the javascript code linked to a specific set of elements, that would change to display the forecast instead of appending new elements for every user search
- Got to make buttons from values set in LocalStorage and linked them to the same div elements, there for the same divs can either be populated by the click of a button, or the submit button 

## Screenshot of Deployed Page:
![A picture of the deployed HTML file](./Assets/ "Weather Forecast Deployed Page Screenshot")

Copyright (c) 2022 Simona Snap

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.