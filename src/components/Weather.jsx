"use client";

import React, { useState } from "react";
// import CitySearch from "./CitySearch";
import WeatherDisplay from "./WeatherDisplay";
import OutfitRecommendations from "./OutfitRecommendations";
import SearchHistory from "./SearchHistory";
import { fetchWeatherData } from "@/utils/api";
import dynamic from "next/dynamic";
import Image from "next/image";

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

    return (
        <div className="flex flex-col items-center mt-10  ">
            {" "}
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
                    <div className="flex flex-col items-center justify-center mt-10 p-8 bg-gradient-to-tr from-blue-100 via-green-100 to-yellow-100 rounded-2xl shadow-lg max-w-xl mx-auto">
                        <img
                            src="/happy-weather.png"
                            alt="Welcome"
                            className="w-32 h-32 mb-6 animate-fade-in"
                        />
                        <h2 className="text-3xl font-bold mb-2 text-gray-800 drop-shadow">
                            Welcome to Weather-Based Outfit Recommender!
                        </h2>
                        <p className="text-lg text-gray-700 mb-4 text-center">
                            Get personalized outfit suggestions based on the
                            current weather in your city. Enter a city name
                            above to get started and discover what to wear
                            today!
                        </p>
                        <div className="flex gap-2 justify-center">
                            <span className="text-2xl">☀️</span>
                            <span className="text-2xl">🌧️</span>
                            <span className="text-2xl">❄️</span>
                            <span className="text-2xl">🌫️</span>
                            <span className="text-2xl">👗</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className=" mt-10 flex flex-col items-center justify-center  rounded-md cursor-pointer text-white bg-gray-500 p-2 hover:scale-105 transition-all duration-300"
                        style={{
                            boxShadow: "10px -2px 20px 2px rgb(0 0 0 / 30%)",
                        }}
                    >
                        <Image
                            alt="weather"
                            src={`/weather-not-found.gif`}
                            width={200}
                            height={200}
                        />
                        <p className="text-center text-white">
                            No weather data available.
                        </p>
                        <div className="text-center text-white flex items-center">
                            Kindly choose the other city
                            <Image
                                alt="weather"
                                src={`/sad-emoji.gif`}
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
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
