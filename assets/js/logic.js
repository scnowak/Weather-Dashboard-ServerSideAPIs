var btnEl=document.getElementById('btn');
var cityList=JSON.parse(localStorage.getItem("cityList"))||[]; //grabbing city from local storage or using an empty array
async function getWeather() {
    const apiKey = '621d3cf76576ffbf195bb5257af2d141';
    const city = document.getElementById('cityInput').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    displayWeather(data);

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
    cityList.push(city);   //adds a new element to the end of array
    localStorage.setItem("cityList", JSON.stringify(cityList));   //adds data to local storage
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const { name, main, weather } = data;
        weatherInfo.innerHTML = `
        <div class="col">
            <h2>Current Weather in ${name}</h2>
            <p>Description: ${weather[0].description}</p>
            <p>Temperature: ${main.temp} °F</p>
            <p>Feels like: ${main.feels_like} °F</p>
            <p>Min temperature: ${main.temp_min} °F</p>
            <p>Max temperature: ${main.temp_max} °F</p>
        </div>    
            `;
    }
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    if (data.cod !== '200') {
        forecastElement.innerHTML = `<p>Forecast not available</p>`;
    } else {
        const forecasts = data.list;
        let forecastOutput = '<h2>5-Day Forecast</h2>';
        for (let i = 0; i < forecasts.length; i += 8) {
            const { main, weather, dt_txt } = forecasts[i];
            forecastOutput += `
            
                <div class="col forecast-item">
                    <p>Date: ${dt_txt}</p>
                    <p>Description: ${weather[0].description}</p>
                    <p>Temperature: ${main.temp} °F</p>
                    <p>Feels like: ${main.feels_like} °F</p>
                    <p>Min temperature: ${main.temp_min} °F</p>
                    <p>Max temperature: ${main.temp_max} °F</p>
                </div>`;
        }
        forecastElement.innerHTML = forecastOutput;
    }
}
btnEl.addEventListener('click', getWeather);



//have to do a for loop to get my list of favorite cities searched next