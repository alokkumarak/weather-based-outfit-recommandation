import React, { useEffect, useState } from "react";
import {
    getOutfitRecommendation,
    weatherThemes,
} from "../utils/WeatherBasedThemes";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FiShirt, FiSun, FiUmbrella, FiWind } from "react-icons/fi";

const OutfitRecommendations = ({ weatherData }) => {
    const theme = weatherThemes[weatherData.weather[0].main];
    const fullText = getOutfitRecommendation(weatherData);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
        if (index < fullText.length) {
            setDisplayedText((prev) => prev + fullText[index]);
            index++;
        } else {
            clearInterval(interval);
            setIsTyping(false);
        }
    }, 25);

    return () => clearInterval(interval);
}, [fullText]);

    const getWeatherIcon = () => {
        const condition = weatherData.weather[0].main.toLowerCase();
        switch (condition) {
            case 'rain':
            case 'drizzle':
                return FiUmbrella;
            case 'clear':
                return FiSun;
            case 'wind':
                return FiWind;
            default:
                return FiShirt;
        }
    };

    const clothingItems = [
        { emoji: '👕', delay: 0.1 },
        { emoji: '👖', delay: 0.2 },
        { emoji: '🧥', delay: 0.3 },
        { emoji: '👞', delay: 0.4 },
        { emoji: '🧢', delay: 0.5 },
        { emoji: '🕶️', delay: 0.6 },
    ];

    const WeatherIconComponent = getWeatherIcon();

    return (
        <motion.div
            key={weatherData.dt}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2 
            }}
            className="my-8 max-w-4xl mx-auto relative"
        >
      
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl opacity-60 -z-10" />
            
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
             
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 p-8">
             
                    <motion.div
                        className="flex items-center justify-between mb-8"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {WeatherIconComponent ? React.createElement(WeatherIconComponent, { className: "w-8 h-8 text-white" }) : null}
                            </motion.div>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-1">
                                    Outfit Recommendation
                                </h2>
                                <p className="text-white/70 text-lg">
                                    Perfect for {weatherData.weather[0].description}
                                </p>
                            </div>
                        </div>

                        <motion.div
                            className="text-6xl"
                            animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {theme.icon}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center gap-4 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {clothingItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: item.delay,
                                }}
                                whileHover={{ 
                                    scale: 1.2, 
                                    y: -10,
                                    rotate: [0, -5, 5, 0]
                                }}
                            >
                                <div className="text-2xl">{item.emoji}</div>
                            </motion.div>
                        ))}
                    </motion.div>

            
                    <motion.div
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
                        
                        <div className="relative z-10">
                            <p className="text-xl leading-relaxed font-medium text-white min-h-[4rem]">
                                {displayedText.slice(0, -9)}
                                <AnimatePresence>
                                    {isTyping && (
                                        <motion.span
                                            className="inline-block w-1 h-6 bg-white ml-1"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ 
                                                duration: 0.8, 
                                                repeat: Infinity 
                                            }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </p>
                        </div>

                        <motion.div
                            className="mt-6 flex items-center justify-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                        >
                            <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 flex items-center gap-3">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-full" />
                                <span className="text-white font-semibold">
                                    {Math.round(weatherData.main.temp)}°C
                                </span>
                                <span className="text-white/70">
                                    Feels like {Math.round(weatherData.main.feels_like)}°C
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.6 }}
                    >
                        <p className="text-white/60 text-lg">
                            💡 <em>Tip: Layer your clothing for easy temperature adjustment throughout the day!</em>
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
                        backgroundSize: '200% 200%',
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </motion.div>
    );
};

export default OutfitRecommendations;