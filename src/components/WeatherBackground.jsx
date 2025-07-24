"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const themeGradients = {
    Clear: {
        colors: ["#FFD700", "#FFA500", "#FF6347", "#FF4500"],
        particles: "☀️"
    },
    Rain: {
        colors: ["#4682B4", "#1E90FF", "#00BFFF", "#87CEEB"],
        particles: "💧"
    },
    Snow: {
        colors: ["#F0F8FF", "#E6E6FA", "#B0E0E6", "#AFEEEE"],
        particles: "❄️"
    },
    Clouds: {
        colors: ["#696969", "#808080", "#A9A9A9", "#C0C0C0"],
        particles: "☁️"
    },
    Thunderstorm: {
        colors: ["#2F4F4F", "#483D8B", "#6A5ACD", "#9370DB"],
        particles: "⚡"
    },
    Drizzle: {
        colors: ["#87CEEB", "#4682B4", "#5F9EA0", "#008B8B"],
        particles: "🌦️"
    },
    Mist: {
        colors: ["#F5F5F5", "#DCDCDC", "#D3D3D3", "#C0C0C0"],
        particles: "🌫️"
    },
    Haze: {
        colors: ["#F0E68C", "#DDA0DD", "#D2B48C", "#BC8F8F"],
        particles: "🌁"
    },
    default: {
        colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
        particles: "🌤️"
    },
};

const WeatherBackground = ({ condition }) => {
    const controls = useAnimation();
    const particleControls = useAnimation();
    const [mounted, setMounted] = useState(false);
    const theme = themeGradients[condition] || themeGradients.default;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        controls.start({
            background: [
                `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                `linear-gradient(225deg, ${theme.colors[1]}, ${theme.colors[2]})`,
                `linear-gradient(315deg, ${theme.colors[2]}, ${theme.colors[3]})`,
                `linear-gradient(45deg, ${theme.colors[3]}, ${theme.colors[0]})`,
                `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
            ],
            opacity: [0.3, 0.8, 0.6, 0.9, 0.7],
            transition: {
                background: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            },
        });

        particleControls.start({
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        });
    }, [theme, controls, particleControls, mounted]);

    if (!mounted) {
        return (
            <div className="fixed inset-0 -z-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700" />
        );
    }

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden">
            <motion.div
                animate={controls}
                className="absolute inset-0"
                style={{
                    backgroundSize: "400% 400%",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-white/10" />

            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-30, 30, -30],
                            x: [-15, 15, -15],
                            rotate: [0, 360, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut",
                        }}
                    >
                        {theme.particles}
                    </motion.div>
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-10">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: `${20 + Math.random() * 40}px`,
                            height: `${20 + Math.random() * 40}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.3, 0.1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(circle at 20% 50%, ${theme.colors[0]}40 0%, transparent 50%), 
                                radial-gradient(circle at 80% 20%, ${theme.colors[1]}40 0%, transparent 50%), 
                                radial-gradient(circle at 40% 80%, ${theme.colors[2]}40 0%, transparent 50%)`,
                }}
                animate={{
                    backgroundPosition: [
                        "20% 50%, 80% 20%, 40% 80%",
                        "60% 30%, 20% 70%, 80% 40%",
                        "20% 50%, 80% 20%, 40% 80%",
                    ],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {condition === "Clear" && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent"
                            style={{
                                width: "2px",
                                height: "100vh",
                                left: `${10 + i * 15}%`,
                                transformOrigin: "center bottom",
                            }}
                            animate={{
                                rotate: [0, 5, -5, 0],
                                opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                                duration: 4 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}

            {(condition === "Rain" || condition === "Drizzle") && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-px bg-gradient-to-b from-transparent via-blue-300/60 to-transparent"
                            style={{
                                left: `${Math.random() * 100}%`,
                                height: `${20 + Math.random() * 30}px`,
                            }}
                            animate={{
                                y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 800],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1 + Math.random() * 0.5,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherBackground;