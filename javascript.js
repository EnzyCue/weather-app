async function getWeatherDataJSON(location){

    try {
        
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=17449172071339b4b837b4f0e11e55de', {mode: 'cors'});
        return response;
        
    } catch(error){
        console.log(error);
    }
        
}




function extractWeatherData(JSON){
    const weatherObject = {
        location: JSON.name,
        temp: JSON.main.temp,
        feelsLike: JSON.main.feels_like,
        humidity: JSON.main.humidity
    };

    return weatherObject;
}


function setupLocationInput(){
    const form = document.querySelector('form');

    const locationInput = document.querySelector('input');
    
    const button = document.querySelector('button');


    button.addEventListener('click',  () => {
        const location = locationInput.value;
        console.log(location);
        updateWeatherDisplay(location);
    })

    form.addEventListener('submit', event => {
        event.preventDefault();

        const location = locationInput.value;
        console.log(location);
        updateWeatherDisplay(location);
    });
}


function updateWeatherDisplay(location){
    getWeatherDataJSON(location).then(response => {

        if (response.status === 200) {
            return response.json();
        } else {
            alert('Invalid Location');
        }
    })
    .then(JSON => extractWeatherData(JSON))
    .then(weatherData => {

        console.log(weatherData);
        displayWeather(weatherData);
        
    }).catch(error => console.log(error));
}


function displayWeather(weatherObject){
    const tempDisplay = document.querySelector('.temp');


    const feelsLikeDisplay = document.querySelector('.feelsLike');
    const humidityDisplay = document.querySelector('.humidity');
    const location = document.querySelector('.city');

  

    location.textContent = weatherObject.location;
    tempDisplay.textContent = Math.round(weatherObject.temp - 273.15);
    feelsLikeDisplay.textContent = Math.round(weatherObject.feelsLike - 273.15);
    humidityDisplay.textContent = weatherObject.humidity;
}


setupLocationInput();

updateWeatherDisplay('Melbourne');