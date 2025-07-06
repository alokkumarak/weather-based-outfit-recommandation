import axios from "axios";

// adding api keys and base urls for conviniouns, not creating .env file.
const OPEN_WEATHER_API_KEY = "4c4e1de3388868177700dcc3b0a66423";
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const RAPIDAPI_KEY = "e75f2ca447msh9c5e1bac0a12da5p150b0fjsn5f5f9b2643a0";
const GEO_API_KEY = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(
            `${OPEN_WEATHER_BASE_URL}?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        );

        return response.data;
    } catch (error) {
        return null;
    }
};

export const fetchGeoData = async (city) => {
    try {
        const response = await axios.get(
            `${GEO_API_KEY}/cities?namePrefix=${city}`,
            {
                headers: {
                    "X-RapidAPI-Key": RAPIDAPI_KEY,
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                },
            }
        );
        return {
            options: response.data.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),
        };
    } catch (error) {
        return {
            options: [],
        };
    }
};
