// Making the API Call:

// Replace {lat} and {lon} in the URL with the latitude and longitude of the city for which you want to get the weather forecast.
// Replace {API key} with the API key you obtained from OpenWeatherMap.
// To make the API call, you can use various methods, such as Fetch API or Axios in JavaScript. Here's an example using Fetch API:

// javascript
const apiKey = '52017217fdbd2a28a829344d4614e7f1';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const previousSearchList = document.getElementById('previousSearchList');
const weatherCardsContainer = document.getElementById('weatherCardsContainer');

// Function to handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    // Call the function to fetch the weather data for the entered city
    getWeatherData(city);
});


function showPreviousSearches() {
    previousSearchContainer.classList.remove('hidden');
}

// Function to update and render previous searches list
function updatePreviousSearches(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    previousSearchList.appendChild(listItem);
}


// Function to fetch weather data for a specific city
function getWeatherData(city) {
    const apiUrl = `${baseUrl}?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === '404') {
                alert('City not found');
            } else {
                weatherCardsContainer.innerHTML = ''; // Clear any previous content
                weatherCardsContainer.style.display = 'flex'; // Show the weather cards container

                // Display the location name
                const cityName = data.city.name;
                const locationHeader = document.createElement('h3');
                locationHeader.textContent = cityName;
                weatherCardsContainer.appendChild(locationHeader);

                // Group forecasts by date
                const forecastsByDate = groupForecastsByDate(data.list);

                // Display the 5-day forecast using Bulma cards
                for (const date in forecastsByDate) {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-content');

                    const cardHeader = document.createElement('p');
                    cardHeader.classList.add('title', 'is-5', 'has-text-centered', 'mb-4');
                    cardHeader.style.fontSize = '20px'; // Set the font size to 20px
                    cardHeader.style.fontWeight = 'bold'; // Set the font weight to bold
                    cardHeader.textContent = date; // Use the date directly without numbering
                    cardContent.appendChild(cardHeader);

                    const cardDescription = document.createElement('div');
                    for (const forecast of forecastsByDate[date]) {
                        const forecastItem = document.createElement('p');
                        forecastItem.textContent = forecast;
                        cardDescription.appendChild(forecastItem);
                    }
                    cardContent.appendChild(cardDescription);

                    card.appendChild(cardContent);
                    weatherCardsContainer.appendChild(card); // Append the card to the weatherCardsContainer
                }

                // Update the previous searches list
                updatePreviousSearches(city);

                // Show the previous searches container and list
                showPreviousSearches();
            }
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}
// Function to group forecasts by date
function groupForecastsByDate(forecasts) {
    const today = new Date().toDateString();
    const forecastsByDate = {};

    // Filter out the current day's forecast
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

    // Convert the grouped forecasts into an array and keep only the first five items
    return forecastsByDate
}

// Function to get the day name
function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}





