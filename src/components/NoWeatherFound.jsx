import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle, FiRefreshCw, FiMapPin } from "react-icons/fi";

const NoWeatherFound = () => {
    const floatingElements = [
        { emoji: '🌩️', delay: 0 },
        { emoji: '🌫️', delay: 0.5 },
        { emoji: '❓', delay: 1 },
        { emoji: '🔍', delay: 1.5 },
    ];

    return (
        <motion.div
            className="mt-12 flex flex-col items-center justify-center max-w-2xl mx-auto relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
      
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl blur-3xl opacity-60 -z-10" />
            
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-12 text-center">
           
                <div className="absolute inset-0 pointer-events-none">
                    {floatingElements.map((element, index) => (
                        <motion.div
                            key={index}
                            className="absolute text-4xl"
                            style={{
                                left: `${20 + index * 20}%`,
                                top: `${10 + (index % 2) * 70}%`,
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                rotate: [-10, 10, -10],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 3 + index * 0.5,
                                repeat: Infinity,
                                delay: element.delay,
                            }}
                        >
                            {element.emoji}
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10">
                   
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200,
                            delay: 0.3 
                        }}
                    >
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-400/20 to-orange-500/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-red-300/30 relative">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0] 
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <FiAlertCircle className="w-16 h-16 text-red-300" />
                            </motion.div>
                            
                          
                            <motion.div
                                className="absolute inset-0 border-2 border-red-300/50 rounded-full"
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0, 0.5] 
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity 
                                }}
                            />
                        </div>
                    </motion.div>

           
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-white mb-8"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-red-300">
                            Weather Data Not Found
                        </h2>
                        <p className="text-xl text-white/80 mb-2">
                            We couldn't find weather information for this location.
                        </p>
                        <p className="text-lg text-white/60">
                            This might happen if the city name is misspelled or doesn't exist in our database.
                        </p>
                    </motion.div>

               
                    <motion.div
                        className="space-y-4 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-white mb-4">
                            💡 Try these suggestions:
                        </h3>
                        
                        <div className="grid gap-3">
                            {[
                                { icon: '🔤', text: 'Check your spelling' },
                                { icon: '🌍', text: 'Try a different city name' },
                                { icon: '📍', text: 'Include country name (e.g., "Paris, France")' },
                                { icon: '🏙️', text: 'Use major city names' },
                            ].map((suggestion, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ 
                                        delay: 0.8 + index * 0.1,
                                        duration: 0.5 
                                    }}
                                    whileHover={{ 
                                        scale: 1.02,
                                        backgroundColor: "rgba(255, 255, 255, 0.15)"
                                    }}
                                >
                                    <div className="text-2xl">{suggestion.icon}</div>
                                    <div className="text-white font-medium">
                                        {suggestion.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="text-center"
                    >
                        <h4 className="text-lg font-semibold text-white/90 mb-4">
                            🌟 Popular cities to try:
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                'New York', 'London', 'Tokyo', 'Paris', 
                                'Mumbai', 'Sydney', 'Dubai', 'Singapore'
                            ].map((city, index) => (
                                <motion.span
                                    key={city}
                                    className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white/80 text-sm border border-white/30 hover:bg-white/30 hover:text-white transition-all cursor-pointer"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ 
                                        delay: 1.1 + index * 0.05,
                                        type: "spring",
                                        stiffness: 300 
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiMapPin className="inline w-3 h-3 mr-1" />
                                    {city}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-8 flex items-center justify-center gap-3 text-white/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <FiRefreshCw className="w-5 h-5" />
                        </motion.div>
                        <span className="text-lg">
                            Try searching again with a different city name
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: `linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)`,
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

export default NoWeatherFound;