"use client";
import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import OutfitRecommendations from "./OutfitRecommendations";
import SearchHistory from "./SearchHistory";
import { fetchWeatherData } from "@/utils/api";
import dynamic from "next/dynamic";
import NoWeatherSearched from "./NoWeatherSearched";
import NoWeatherFound from "./NoWeatherFound";
import WeatherBackground from "./WeatherBackground";

// due to hydration error
const CitySearch = dynamic(() => import("../components/CitySearch"), {
    ssr: false,
});

const Weather = () => {
    const [weatherData, setWeatherData] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);

    const handleCitySearch = async (city) => {
        const data = await fetchWeatherData(city);
        setWeatherData(data);

        if (data) {
            setSearchHistory((prevHistory) => {
                if (prevHistory.includes(city)) {
                    return prevHistory;
                }
                const updatedHistory = [city, ...prevHistory];
                return updatedHistory.slice(0, 5);
            });
        }
    };

    const condition = weatherData?.weather?.[0]?.main || "default";

    return (
        <div className="flex flex-col items-center mt-10 ">
            {" "}
            <WeatherBackground condition={condition} />
            <div>
                <h1 className="text-4xl font-bold mb-8 text-center ">
                    Weather-Based Outfit Recommender
                </h1>
                <CitySearch onCitySearch={handleCitySearch} />
                {weatherData ? (
                    <>
                        <WeatherDisplay weatherData={weatherData} />
                        <OutfitRecommendations weatherData={weatherData} />
                    </>
                ) : weatherData === "" ? (
                    <NoWeatherSearched />
                ) : (
                    <NoWeatherFound />
                )}
            </div>
            <div>
                <SearchHistory
                    history={searchHistory}
                    onSearch={handleCitySearch}
                />
            </div>
        </div>
    );
};

export default Weather;
