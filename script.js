// Making the API Call:

// Replace {lat} and {lon} in the URL with the latitude and longitude of the city for which you want to get the weather forecast.
// Replace {API key} with the API key you obtained from OpenWeatherMap.
// To make the API call, you can use various methods, such as Fetch API or Axios in JavaScript. Here's an example using Fetch API:

// javascript
// Copy code
const apiKey = '52017217fdbd2a28a829344d4614e7f1';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to fetch 5-day weather forecast
function getFiveDayForecast(lat, lon) {
    const apiUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Process the data here (e.g., display on the dashboard)
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

// Example usage with latitude and longitude for a city (e.g., Miami)
const latitude = 25.7617
const longitude = -80.1918;

getFiveDayForecast(latitude, longitude);