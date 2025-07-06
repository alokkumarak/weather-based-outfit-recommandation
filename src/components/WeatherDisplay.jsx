import React from "react";
import Image from "next/image";
import { weatherThemes } from "../utils/WeatherBasedThemes";
import clsx from "clsx";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.4,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ease: "easeOut", duration: 0.4 },
    },
};

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
            <motion.div
                className="flex justify-between items-center h-[50%] p-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <p className="text-4xl font-bold m-0">{weatherData.name}</p>
                    <p className="text-xl font-semibold m-0">
                        {weatherData.weather[0].description}
                    </p>
                </motion.div>

                <motion.p
                    className="font-bold text-7xl w-auto my-5 mx-0"
                    variants={itemVariants}
                >
                    {Math.round(weatherData.main.temp)}°C
                </motion.p>
            </motion.div>

            <motion.div
                className="flex justify-between items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <Image
                        alt="weather"
                        src={`/icons/${weatherData.weather[0].icon}.png`}
                        width={150}
                        height={150}
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col w-[40%]"
                    variants={containerVariants}
                >
                    {[
                        [
                            "Feels like",
                            `${Math.round(weatherData.main.feels_like)}°C`,
                        ],
                        [
                            "Min temp.",
                            `${Math.round(weatherData.main.temp_min)}°C`,
                        ],
                        [
                            "Max temp.",
                            `${Math.round(weatherData.main.temp_max)}°C`,
                        ],
                        ["Wind", `${weatherData.wind.speed} m/s`],
                        ["Humidity", `${weatherData.main.humidity}%`],
                        ["Pressure", `${weatherData.main.pressure} hPa`],
                    ].map(([label, value], idx) => (
                        <motion.div
                            key={idx}
                            className="flex justify-between items-center"
                            variants={itemVariants}
                        >
                            <span className="text-left font-semibold text-xl">
                                {label}
                            </span>
                            <span className="text-right font-bold text-lg">
                                {value}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default WeatherDisplay;
