import React from "react";
import {
    getOutfitRecommendation,
    weatherThemes,
} from "../utils/WeatherBasedThemes";

import clsx from "clsx";

const OutfitRecommendations = ({ weatherData }) => {
    const theme = weatherThemes[weatherData.weather[0].main];
    return (
        <div
            className={clsx(
                "my-4 cursor-pointer rounded-md p-6 shadow-2xl max-w-2xl mx-auto text-white backdrop-blur-md bg-gradient-to-r hover:scale-105 transition-all duration-300",
                theme.bg
            )}
            style={{
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
            }}
        >
            <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
                    Outfit Recommendation
                </h2>
                <span className="text-5xl">{theme.icon}</span>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed font-medium drop-shadow-sm">
                {getOutfitRecommendation(weatherData)}
            </p>
        </div>
    );
};

export default OutfitRecommendations;
