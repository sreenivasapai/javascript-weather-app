const apikey= "0853a8d26d72064163f61cf9d6bdcc46";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");

async function checkWeather(city) {
    if (!city) return;

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status === 404) {
        alert("City not found!");
        weatherBox.style.display = "none";
        return; 
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
        data.main.temp.toFixed(1) + "°C";
    document.querySelector(".humidity").innerHTML =
        data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
        data.wind.speed + " km/hr";

    const condition = data.weather[0].main;

    if (condition === "Clouds") weatherIcon.src = "images/clouds.png";
    else if (condition === "Clear") weatherIcon.src = "images/clear.png";
    else if (condition === "Rain") weatherIcon.src = "images/rain.png";
    else if (condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (condition === "Mist") weatherIcon.src = "images/mist.png";
    else if (condition === "Snow") weatherIcon.src = "images/snow.png";

    weatherBox.style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});