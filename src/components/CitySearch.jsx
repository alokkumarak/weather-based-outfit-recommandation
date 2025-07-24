import React, { useState, useEffect } from "react";
import { fetchGeoData } from "../utils/api";
import { AsyncPaginate } from "react-select-async-paginate";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin } from "react-icons/fi";

const CitySearch = ({ onCitySearch }) => {
    const [city, setCity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCityChange = async (cityData) => {
        if (!cityData || !cityData.label) return;
        
        setIsLoading(true);
        try {
            setCity(cityData);
            await onCitySearch(cityData.label);
        } catch (error) {
            console.error('Error searching for city:', error);
        } finally {
            setIsLoading(false);
        }
    };

   
    if (!mounted) {
        return (
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
        );
    }

    return (
        <motion.div 
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-60"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-4 px-6 py-2">
                        <motion.div
                            animate={{ rotate: isLoading ? 360 : 0 }}
                            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                        >
                            <FiSearch className="text-white/70 text-xl" />
                        </motion.div>
                        <div className="flex-1">
                            <AsyncPaginate
                                placeholder="🌍 Search for any city worldwide..."
                                value={city}
                                debounceTimeout={600}
                                onChange={handleCityChange}
                                loadOptions={fetchGeoData}
                                isClearable={true}
                                className="cursor-pointer"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        minHeight: "56px",
                                        height: "56px",
                                        borderRadius: "12px",
                                        padding: "0 16px",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        boxShadow: "none",
                                        cursor: "text",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: "rgba(30, 41, 59, 0.95)",
                                        backdropFilter: "blur(16px)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "16px",
                                        zIndex: 99999,
                                        marginTop: "8px",
                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                    }),
                                    menuList: (provided) => ({
                                        ...provided,
                                        padding: "8px",
                                        maxHeight: "280px",
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused
                                            ? "rgba(59, 130, 246, 0.3)"
                                            : "transparent",
                                        color: "#ffffff",
                                        padding: "12px 16px",
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        margin: "2px 0",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        transition: "all 0.2s ease",
                                        "&:before": {
                                            content: "'📍'",
                                            marginRight: "8px",
                                        }
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: "#ffffff",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        color: "#ffffff",
                                        fontSize: "16px",
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: "rgba(255, 255, 255, 0.6)",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                    }),
                                    indicatorSeparator: () => ({
                                        display: "none",
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        color: "rgba(255, 255, 255, 0.5)",
                                        "&:hover": {
                                            color: "#ffffff",
                                        }
                                    }),
                                    loadingIndicator: (provided) => ({
                                        ...provided,
                                        color: "#ffffff",
                                    }),
                                    clearIndicator: (provided) => ({
                                        ...provided,
                                        color: "rgba(255, 255, 255, 0.5)",
                                        "&:hover": {
                                            color: "#ffffff",
                                        }
                                    }),
                                }}
                                components={{
                                    LoadingMessage: () => (
                                        <div className="flex items-center justify-center py-4 text-white/70">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full mr-3"
                                            />
                                            Searching cities...
                                        </div>
                                    ),
                                    NoOptionsMessage: () => (
                                        <div className="flex items-center justify-center py-4 text-white/70">
                                            <FiMapPin className="mr-2" />
                                            No cities found. Try a different search term.
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        {isLoading && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            />
                        )}
                    </div>
                </div>
            </div>
           
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${20 + i * 12}%`,
                            top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default CitySearch;