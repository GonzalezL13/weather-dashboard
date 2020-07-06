var searchBtn = document.querySelector("#searchBtn");
var cityInput = document.querySelector("#cityInput");
var cityName = document.querySelector(".cityName");
var cityTemp = document.querySelector(".cityTemp");
var cityHumid = document.querySelector(".cityHumid");
var cityWind = document.querySelector(".cityWind");
var cityUv = document.querySelector(".cityUv");

//function to get current weather
var currentWeather = function (city) {
    var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=d7e187056bfdee658678bfef68ee958b");

    //fetching api
    fetch(apiUrl)
        .then(function (response) {
            return response.json(response);
        })
        .then(function (data) {
            console.log(data);
            var nameValue = data.name;
            var tempValue = data.main.temp;
            var humidValue = data.main.humidity;
            var windValue = data.wind.speed;
            var weatherIcon = data.weather[0].icon;
            //inputing data received to diplay
            cityName.innerHTML = nameValue + ' - ' +new Date().toLocaleDateString();
            cityTemp.innerHTML = "Temperature: " + tempValue + " °F";
            cityHumid.innerHTML = "Humidity: " + humidValue + "%";
            cityWind.innerHTML = "Wind Speed: " + windValue + " MPH";
            //pushed lat and lon to uv function
            uvIndex(data.coord.lat, data.coord.lon);
        })
};

//this function will receive the city name
var formInput = function (event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();

    if (cityName) {
        //pushed it to current weather function
        currentWeather(cityName);
        cityInput.value = "";
        //pushed it to forecast function
        fiveDayForecast(cityName);
        cityInput.value = "";

        forecastDisplay.textContent="";
    }
    else {
        alert("Please enter city")
    }
};

//will receive UV info 
var uvIndex = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=d7e187056bfdee658678bfef68ee958b&lat=" +
        lat +
        "&lon=" +
        lon;

    fetch(apiUrl)
        .then(function (response) {
            return response.json(response);
        })
        .then(function (data) {
            //console.log(data);
            var uvValue = data.value;
            //will display it on doc
            cityUv.innerHTML = "UV Index: " + uvValue;
        })
};

//5 day forecast function
var fiveDayForecast = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=d7e187056bfdee658678bfef68ee958b";

    fetch(apiUrl)
        .then(function (response) {
            return response.json(response);
        })
        .then(function (data) {
            console.log(data);
           
            

            for (var i = 1; i < data.list.length; i += 8) {
                //created elements and classes and pushed data that was received to display on page
                var forecastDisplay = document.querySelector("#forecastDisplay");
                var weatherCard = document.createElement("div");
                weatherCard.classList.add("card", "row", "col-md-1", "bg-primary", "text-white");
                forecastDisplay.appendChild(weatherCard);

                //will display date
                var dateEl = document.createElement("h6");
                dateEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
                weatherCard.appendChild(dateEl);

                //will display icon
                var iconEl = document.createElement("img");
                iconEl.classList.add("card-img");
                iconEl.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                weatherCard.appendChild(iconEl);

                //will display tempature
                var temp = document.createElement("p");
                temp.classList.add("card-text");
                temp.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
                weatherCard.appendChild(temp);

                //will display humidity
                var humidityEl = document.createElement("p");
                humidityEl.classList.add("card-text");
                humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                weatherCard.appendChild(humidityEl);
            }
        })
};




searchBtn.addEventListener("click", formInput);





