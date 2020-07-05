var searchBtn = document.querySelector("#searchBtn");
var cityInput = document.querySelector("#cityInput");
var cityName = document.querySelector(".cityName");
var cityTemp = document.querySelector(".cityTemp");
var cityHumid = document.querySelector(".cityHumid");
var cityWind = document.querySelector(".cityWind");
var cityUv = document.querySelector(".cityUv");

var currentWeather = function(city) {
    var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&units=imperial&appid=d7e187056bfdee658678bfef68ee958b");
    
    fetch(apiUrl) 
        .then(function (response) {
            return response.json(response);
        })
        .then(function (data) {
            //console.log(data);
            var nameValue = data.name;
            var tempValue = data.main.temp;
            var humidValue = data.main.humidity;
            var windValue = data.wind.speed
            cityName.innerHTML = nameValue;
            cityTemp.innerHTML = "Tempature: " +  tempValue;
            cityHumid.innerHTML = "Humidity: " +  humidValue + "%";
            cityWind.innerHTML = "Wind Speed: " + windValue + " MPH";
            uvIndex(data.coord.lat, data.coord.lon);
        })
};

var formInput = function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();

    if (cityName) {
        currentWeather(cityName);
        cityInput.value = "";

        fiveDayForecast(cityName);
        cityInput.value = "";
    }
    else {
        alert("Please enter city")
    }
};

var uvIndex = function(lat, lon) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=d7e187056bfdee658678bfef68ee958b&lat=" +
    lat +
    "&lon=" +
    lon;

    fetch(apiUrl)
        .then(function (response) {
            return response.json(response);
        })
        .then(function(data) {
            //console.log(data);
            var uvValue = data.value;
            cityUv.innerHTML = "UV Index: " + uvValue;
        })
};

var fiveDayForecast = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=d7e187056bfdee658678bfef68ee958b";

    fetch(apiUrl)
        .then(function(response) {
            return response.json(response);
        })
        .then(function(data) {
            console.log(data);
            for(var i=1; i<data.list.length; i+=8) {
                if (data.list[i].dt_txt.indexOf("1,9,17,25,33")) {

                    var forecastDisplay = document.querySelector("#forecastDisplay");
                    var weatherCard = document.createElement("div");
                    weatherCard.classList.add("card","row","col-md-1","bg-primary","text-white");
                    forecastDisplay.appendChild(weatherCard);

                    var dateEl = document.createElement("h5");
                    dateEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
                    weatherCard.appendChild(dateEl);

                    var iconEl = document.createElement("img");
                    iconEl.classList.add("card-img");
                    iconEl.src ="http://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+ "@2x.png";
                    weatherCard.appendChild(iconEl);

                    var temp = document.createElement("p");
                    temp.classList.add("card-text");
                    temp.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
                    weatherCard.appendChild(temp);

                    var humidityEl = document.createElement("p");
                    humidityEl.classList.add("card-text");
                    humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                    weatherCard.appendChild(humidityEl);
                }
            }
        })
};




searchBtn.addEventListener("click", formInput);





