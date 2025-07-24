import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiCloud, FiSun, FiCloudRain, FiWind } from "react-icons/fi";

const NoWeatherSearched = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            background: [
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            ],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            },
        });
    }, [controls]);

    const weatherIcons = [
        { icon: FiSun, delay: 0, color: "text-yellow-300" },
        { icon: FiCloud, delay: 0.2, color: "text-blue-300" },
        { icon: FiCloudRain, delay: 0.4, color: "text-blue-400" },
        { icon: FiWind, delay: 0.6, color: "text-gray-300" },
    ];

    return (
        <motion.div
            className="flex flex-col items-center justify-center mt-8 p-6 md:p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto relative overflow-hidden"
            animate={controls}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
        >
   
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
            
 
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            rotate: [0, 360],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            {weatherIcons[i % 4].icon && React.createElement(weatherIcons[i % 4].icon, {
                                className: `w-4 h-4 ${weatherIcons[i % 4].color}`
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 text-center">
    
                <motion.div
                    className="mb-6 relative"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-white/20 rounded-full flex items-center justify-center relative backdrop-blur-lg border border-white/30">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-2 border-dashed border-white/40 rounded-full"
                        />
                        <div className="text-6xl md:text-8xl">🌤️</div>
                        
                  
                        {weatherIcons.map((item, index) => (
                            <motion.div
                                key={index}
                                className="absolute w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border border-white/40"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transformOrigin: `${60 * Math.cos((index * Math.PI) / 2)}px ${60 * Math.sin((index * Math.PI) / 2)}px`,
                                }}
                                animate={{ 
                                    rotate: 360,
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ 
                                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity, delay: item.delay }
                                }}
                            >
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-white"
                >
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
                        Weather-Based Outfit Recommender
                    </h1>
                    <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
                        Discover the perfect outfit for any weather condition. 
                        Simply search for your city above and get personalized clothing recommendations 
                        tailored to today's forecast.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    {[
                        { emoji: "🌡️", text: "Real-time Temperature" },
                        { emoji: "👕", text: "Smart Recommendations" },
                        { emoji: "🌍", text: "Global Cities" },
                        { emoji: "📱", text: "Mobile Friendly" },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 md:px-6 md:py-4 border border-white/30"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="text-2xl md:text-3xl mb-2">{feature.emoji}</div>
                            <div className="text-white/90 font-medium text-sm md:text-base">{feature.text}</div>
                        </motion.div>
                    ))}
                </motion.div>

          
                <motion.div
                    className="mt-8 flex items-center justify-center gap-2 text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xl md:text-2xl"
                    >
                        👆
                    </motion.div>
                    <span className="text-base md:text-lg font-medium">Start by searching for your city above</span>
                </motion.div>
            </div>

         
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-60 -z-10"></div>
        </motion.div>
    );
};

export default NoWeatherSearched;