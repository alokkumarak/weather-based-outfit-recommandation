"use client";

import React, { useState } from "react";
import CitySearch from "./CitySearch";
import WeatherDisplay from "./WeatherDisplay";
import OutfitRecommendations from "./OutfitRecommendations";
import SearchHistory from "./SearchHistory";
import { fetchWeatherData } from "@/utils/api";

const Weather = () => {
    const [weatherData, setWeatherData] = useState("");

    const handleCitySearch = async (city) => {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
    };

    return (
        <div className="flex flex-col items-center mt-10  ">
            {" "}
            <h1 className="text-4xl font-bold mb-8 text-center ">
                Weather-Based Outfit Recommender
            </h1>
            <CitySearch onCitySearch={handleCitySearch} />
            <WeatherDisplay weatherData={weatherData} />
            <OutfitRecommendations />
            <SearchHistory />
        </div>
    );
};

export default Weather;
