

const apiKey = '52017217fdbd2a28a829344d4614e7f1';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const previousSearchList = document.getElementById('previousSearchList');
const weatherCardsContainer = document.getElementById('weatherCardsContainer');


document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    getWeatherData(city);
});


function showPreviousSearches() {
    previousSearchContainer.classList.remove('hidden');
}


function updatePreviousSearches(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    previousSearchList.appendChild(listItem);
}


function getWeatherData(city) {
    const apiUrl = `${baseUrl}?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === '404') {
                alert('City not found');
            } else {
                weatherCardsContainer.innerHTML = ''; 
                weatherCardsContainer.style.display = 'flex'; 

                const cityName = data.city.name;
                const locationHeader = document.createElement('h3');
                locationHeader.textContent = cityName;
                weatherCardsContainer.appendChild(locationHeader);

                
                const forecastsByDate = groupForecastsByDate(data.list);

               
                for (const date in forecastsByDate) {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-content');

                    const cardHeader = document.createElement('p');
                    cardHeader.classList.add('title', 'is-5', 'has-text-centered', 'mb-4');
                    cardHeader.style.fontSize = '20px'; 
                    cardHeader.style.fontWeight = 'bold'; 
                    cardHeader.textContent = date; 
                    cardContent.appendChild(cardHeader);

                    const cardDescription = document.createElement('div');
                    for (const forecast of forecastsByDate[date]) {
                        const forecastItem = document.createElement('p');
                        forecastItem.textContent = forecast;
                        cardDescription.appendChild(forecastItem);
                    }
                    cardContent.appendChild(cardDescription);

                    card.appendChild(cardContent);
                    weatherCardsContainer.appendChild(card); 
                }

                
                updatePreviousSearches(city);

               
                showPreviousSearches();
            }
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

function groupForecastsByDate(forecasts) {
    const today = new Date().toDateString();
    const forecastsByDate = {};

    const forecastsForNextDays = forecasts.filter((forecast) => {
        return new Date(forecast.dt * 1000).toDateString() !== today;
    });

    for (const forecast of forecastsForNextDays) {
        const date = new Date(forecast.dt * 1000).toDateString();
        if (!forecastsByDate[date]) {
            forecastsByDate[date] = [];
        }
        forecastsByDate[date].push(
            `${forecast.weather[0].description}, Temperature: ${(forecast.main.temp - 273.15).toFixed(2)}°C`
        );
    }

   
    return forecastsByDate
}


function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}





