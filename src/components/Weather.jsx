"use client";
import React, { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay";
import OutfitRecommendations from "./OutfitRecommendations";
import SearchHistory from "./SearchHistory";
import { fetchWeatherData } from "@/utils/api";
import dynamic from "next/dynamic";
import NoWeatherSearched from "./NoWeatherSearched";
import NoWeatherFound from "./NoWeatherFound";
import WeatherBackground from "./WeatherBackground";
import { motion } from "framer-motion";


const CitySearch = dynamic(() => import("../components/CitySearch"), {
    ssr: false,
    loading: () => (
        <div className="mb-8 relative">
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-60"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-4 px-6 py-4">
                        <div className="animate-pulse w-6 h-6 bg-white/20 rounded-full"></div>
                        <div className="flex-1 animate-pulse h-14 bg-white/10 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    )
});

const Weather = () => {
    const [weatherData, setWeatherData] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCitySearch = async (city) => {
        setIsLoading(true);
        try {
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
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const condition = weatherData?.weather?.[0]?.main || "default";


    const [decorativeElements, setDecorativeElements] = useState([]);
    useEffect(() => {
        setMounted(true);
        const elements = Array.from({ length: 8 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 3,
        }));
        setDecorativeElements(elements);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-h-screen overflow-y-auto relative">
            <WeatherBackground condition={condition} />
            
            <div className="relative z-10 flex flex-col items-center px-4 py-4 md:py-8 min-h-screen">

                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            backgroundSize: "200% 200%",
                        }}
                    >
                        Outfit Recommender
                    </motion.h1>
                    
                    <motion.div
                        className="flex items-center justify-center gap-2 md:gap-4 text-2xl md:text-4xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            delay: 0.3, 
                            duration: 0.6,
                            type: "spring",
                            stiffness: 200 
                        }}
                    >
                        {['🧳', '👕', '👖'].map((emoji, index) => (
                            <motion.span
                                key={index}
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                    ease: "easeInOut",
                                }}
                                className="drop-shadow-lg"
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.p
                        className="text-white/80 text-base md:text-lg lg:text-xl mt-4 font-light max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Get personalized outfit suggestions based on real-time weather conditions
                    </motion.p>
                </motion.div>

                <div className="w-full max-w-4xl mb-6 relative z-50">
                    <CitySearch onCitySearch={handleCitySearch} />
                </div>

                {isLoading && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
                            <motion.div
                                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <p className="text-white text-xl font-medium">
                                Fetching weather data...
                            </p>
                            <p className="text-white/70 text-lg mt-2">
                                Please wait while we get the latest information
                            </p>
                        </div>
                    </motion.div>
                )}

                {!isLoading && (
                    <div className="w-full max-w-6xl flex-1 flex flex-col justify-center">
                        {weatherData && weatherData !== "" ? (
                            <motion.div
                                key="weather-content"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <WeatherDisplay weatherData={weatherData} />
                                <OutfitRecommendations weatherData={weatherData} />
                            </motion.div>
                        ) : weatherData === "" ? (
                            <NoWeatherSearched />
                        ) : (
                            <NoWeatherFound />
                        )}
                    </div>
                )}

                <SearchHistory
                    history={searchHistory}
                    onSearch={handleCitySearch}
                />

                <motion.footer
                    className="mt-16 text-center text-white/60 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <p>Made with ❤️ for better outfit decisions</p>
                </motion.footer>
            </div>

            <div className="fixed inset-0 pointer-events-none z-0">
                {decorativeElements.map((el, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{ left: el.left, top: el.top }}
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: el.duration,
                            repeat: Infinity,
                            delay: el.delay,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Weather;