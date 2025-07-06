import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const NoWeatherSearched = () => {
    const controls = useAnimation();
    const gradients = [
        "linear-gradient(to top right, #93c5fd, #86efac, #fde68a)", // blue-green-yellow
        "linear-gradient(to top right, #f9a8d4, #c084fc, #60a5fa)", // pink-purple-blue
        "linear-gradient(to top right, #93c5fd, #86efac, #fde68a)", // back to original
    ];

    useEffect(() => {
        controls.start({
            backgroundImage: gradients,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
                duration: 15,
                ease: "easeInOut",
                repeat: Infinity,
            },
        });
    }, [controls]);
    const handleHoverStart = () => {
        controls.stop();
    };

    const handleHoverEnd = () => {
        controls.start({
            backgroundImage: gradients,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
            },
        });
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center mt-10 p-8 rounded-2xl shadow-lg max-w-xl mx-auto cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
                backgroundSize: "200% 200%",
            }}
            animate={controls}
            whileHover={{ scale: 1.05 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
        >
            <img
                src="/happy-weather.png"
                alt="Welcome"
                className="w-32 h-32 mb-6 animate-fade-in"
            />
            <h2 className="text-3xl font-bold mb-2 text-gray-800 drop-shadow">
                Welcome to Weather-Based Outfit Recommender!
            </h2>
            <p className="text-lg text-gray-700 mb-4 text-center">
                Get personalized outfit suggestions based on the current weather
                in your city. Enter a city name above to get started and
                discover what to wear today!
            </p>
            <div className="flex gap-2 justify-center">
                <span className="text-2xl">☀️</span>
                <span className="text-2xl">🌧️</span>
                <span className="text-2xl">❄️</span>
                <span className="text-2xl">🌫️</span>
                <span className="text-2xl">👗</span>
            </div>
        </motion.div>
    );
};

export default NoWeatherSearched;
