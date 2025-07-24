import React from "react";
import Image from "next/image";
import { weatherThemes } from "../utils/WeatherBasedThemes";
import clsx from "clsx";
import { motion } from "framer-motion";
import { 
    FiThermometer, 
    FiWind, 
    FiDroplets, 
    FiBarChart3, 
    FiEye,
    FiSunrise,
    FiSunset,
    FiMapPin 
} from "react-icons/fi";

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { 
            type: "spring", 
            stiffness: 200, 
            damping: 20 
        },
    },
};

const WeatherDisplay = ({ weatherData }) => {
    const theme = weatherThemes[weatherData.weather[0].main];

    const weatherStats = [
        {
            label: "Feels like",
            value: `${Math.round(weatherData.main.feels_like)}°C`,
            icon: FiThermometer,
            gradient: "from-orange-400 to-red-500"
        },
        {
            label: "Min temp.",
            value: `${Math.round(weatherData.main.temp_min)}°C`,
            icon: FiThermometer,
            gradient: "from-blue-400 to-blue-600"
        },
        {
            label: "Max temp.",
            value: `${Math.round(weatherData.main.temp_max)}°C`,
            icon: FiThermometer,
            gradient: "from-red-400 to-orange-500"
        },
        {
            label: "Wind Speed",
            value: `${weatherData.wind?.speed || 0} m/s`,
            icon: FiWind,
            gradient: "from-gray-400 to-gray-600"
        },
        {
            label: "Humidity",
            value: `${weatherData.main.humidity}%`,
            icon: FiDroplets,
            gradient: "from-blue-400 to-cyan-500"
        },
        {
            label: "Pressure",
            value: `${weatherData.main.pressure} hPa`,
            icon: FiBarChart3,
            gradient: "from-purple-400 to-indigo-500"
        },
    ];

    return (
        <motion.div
            key={weatherData.dt}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto mt-8"
        >
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className={clsx(
                    "absolute inset-0 opacity-20",
                    theme.bg
                )} />
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-24 -translate-x-24" />

                <div className="relative z-10 p-8">
                    <motion.div
                        className="flex justify-between items-start mb-8"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/30">
                                <FiMapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-1">
                                    {weatherData.name}
                                </h1>
                                <p className="text-xl text-white/80 capitalize font-medium">
                                    {weatherData.weather[0].description}
                                </p>
                            </div>
                        </div>

                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <div className="text-7xl font-bold text-white mb-2">
                                {Math.round(weatherData.main.temp)}°
                            </div>
                            <div className="text-white/60 text-lg font-medium">
                                Celsius
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center lg:justify-start"
                        >
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/30"
                                    whileHover={{ 
                                        rotate: [0, -5, 5, 0],
                                        scale: 1.05 
                                    }}
                                    transition={{ 
                                        rotate: { duration: 0.5 },
                                        scale: { type: "spring", stiffness: 300 }
                                    }}
                                >
                                    <Image
                                        alt="weather"
                                        src={`/icons/${weatherData.weather[0].icon}.png`}
                                        width={120}
                                        height={120}
                                        className="drop-shadow-lg"
                                    />
                                </motion.div>
                                
                                <motion.div
                                    className="absolute -top-4 -right-4 text-4xl bg-white/20 backdrop-blur-md rounded-full w-16 h-16 flex items-center justify-center border border-white/30"
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1] 
                                    }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {theme.icon}
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4"
                        >
                            {weatherStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                    whileHover={{ 
                                        scale: 1.05,
                                        y: -5 
                                    }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`bg-gradient-to-r ${stat.gradient} p-2 rounded-lg`}>
                                            {stat.icon ? React.createElement(stat.icon, { className: "w-4 h-4 text-white" }) : null}
                                        </div>
                                        <span className="text-white/80 text-sm font-medium">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <div className="text-white text-xl font-bold ml-11">
                                        {stat.value}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                        {weatherData.visibility && (
                            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2">
                                <FiEye className="w-4 h-4 text-white/70" />
                                <span className="text-white/80 text-sm">
                                    Visibility: {(weatherData.visibility / 1000).toFixed(1)}km
                                </span>
                            </div>
                        )}
                        
                        {weatherData.sys?.sunrise && (
                            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2">
                                <FiSunrise className="w-4 h-4 text-yellow-300" />
                                <span className="text-white/80 text-sm">
                                    Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        )}
                        
                        {weatherData.sys?.sunset && (
                            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2">
                                <FiSunset className="w-4 h-4 text-orange-300" />
                                <span className="text-white/80 text-sm">
                                    Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        )}
                    </motion.div>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </motion.div>
        </motion.div>
    );
};

export default WeatherDisplay;