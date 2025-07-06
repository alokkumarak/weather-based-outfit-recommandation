"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
const themeGradients = {
    Clear: ["#fef9c3", "#fde68a", "#fb923c"],
    Rain: ["#bfdbfe", "#60a5fa", "#2563eb"],
    Snow: ["#ffffff", "#e5e7eb", "#dbeafe"],
    Clouds: ["#d1d5db", "#9ca3af", "#4b5563"],
    Thunderstorm: ["#374151", "#6b21a8", "#4c1d95"],
    Drizzle: ["#dbeafe", "#93c5fd", "#3b82f6"],
    Mist: ["#e5e7eb", "#d1d5db", "#9ca3af"],
    Haze: ["#fef9c3", "#fef08a", "#d1d5db"],
    default: ["#444745", "#393b3a", "#2d2e2d"],
};

const WeatherBackground = ({ condition }) => {
    const controls = useAnimation();
    const colors = themeGradients[condition] || themeGradients.default;

    useEffect(() => {
        controls.start({
            background: [
                `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                `linear-gradient(135deg, ${colors[2]}, ${colors[1]}, ${colors[0]})`,
                `linear-gradient(135deg, ${colors[1]}, ${colors[0]}, ${colors[2]})`,
            ],
            opacity: [0, 1],
            transition: {
                background: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                opacity: {
                    duration: 5,
                    ease: "easeInOut",
                },
            },
        });
    }, [colors, controls]);

    return (
        <motion.div
            animate={controls}
            className="fixed inset-0 -z-10"
            style={{
                backgroundSize: "200% 200%",
                position: "absolute",
            }}
        />
    );
};

export default WeatherBackground;
