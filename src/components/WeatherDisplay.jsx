import React from "react";
import Image from "next/image";
import { weatherThemes } from "../utils/WeatherBasedThemes";
import clsx from "clsx";
import { motion } from "framer-motion";

const WeatherDisplay = ({ weatherData }) => {
    const theme = weatherThemes[weatherData.weather[0].main];

    return (
        <motion.div
            key={weatherData.dt}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                duration: 0.8,
                ease: "easeInOut",
            }}
            className={clsx(
                "rounded-md cursor-pointer text-white mt-8 pt-0 pb-5 pl-5 pr-5 hover:scale-105 transition-all duration-300",
                theme.bg
            )}
            style={{
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
            }}
        >
            <div className="flex justify-between items-center h-[50%] p-5">
                <div>
                    <p className="text-4xl font-bold m-0">{weatherData.name}</p>
                    <p className="text-xl font-semibold m-0">
                        {weatherData.weather[0].description}
                    </p>
                </div>

                <p className="font-bold text-7xl w-auto my-5 mx-0">
                    {Math.round(weatherData.main.temp)}°C
                </p>
            </div>
            <div className="flex justify-between items-center">
                <Image
                    alt="weather"
                    src={`/icons/${weatherData.weather[0].icon}.png`}
                    width={150}
                    height={150}
                />

                <div className="flex flex-col w-[40%]">
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Feels like
                        </span>
                        <span className="text-right font-bold text-lg">
                            {Math.round(weatherData.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Min temp.
                        </span>
                        <span className="text-right font-bold text-lg">
                            {Math.round(weatherData.main.temp_min)}°C
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Max temp.
                        </span>
                        <span className="text-right font-bold text-lg">
                            {Math.round(weatherData.main.temp_max)}°C
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Wind
                        </span>
                        <span className="text-right font-bold text-lg">
                            {weatherData.wind.speed} m/s
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Humidity
                        </span>
                        <span className="text-right font-bold text-lg">
                            {weatherData.main.humidity}%
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Pressure
                        </span>
                        <span className="text-right font-bold text-lg   ">
                            {weatherData.main.pressure} hPa
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left font-semibold text-xl">
                            Coordinates
                        </span>
                        <span className="text-right font-bold text-lg">
                            {weatherData.coord.lat}, {weatherData.coord.lon}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherDisplay;
