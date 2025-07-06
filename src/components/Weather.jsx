import React from "react";
import CitySearch from "./CitySearch";
import WeatherDisplay from "./WeatherDisplay";
import OutfitRecommendations from "./OutfitRecommendations";
import SearchHistory from "./SearchHistory";

const Weather = () => {
    return (
        <div className="flex flex-col items-center mt-10  ">
            {" "}
            <h1 className="text-4xl font-bold mb-8 text-center ">
                Weather-Based Outfit Recommender
            </h1>
            <CitySearch />
            <WeatherDisplay />
            <OutfitRecommendations />
            <SearchHistory />
        </div>
    );
};

export default Weather;
