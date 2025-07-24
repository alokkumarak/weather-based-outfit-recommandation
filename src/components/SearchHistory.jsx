import React, { useState } from "react";
import {  FiX, FiMapPin, FiClock } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const SearchHistory = ({ history, onSearch }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const recentHistory = history.slice(-5);

    const drawerVariants = {
        closed: { x: "100%", opacity: 0 },
        open: { 
            x: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 300
            }
        })
    };

    return (
        <>
         
            <AnimatePresence>
                {recentHistory.length > 0 && (
                    <motion.div
                        className="hidden lg:fixed lg:top-8 lg:right-8 lg:z-40 lg:block"
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 50 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300,
                            delay: 0.5 
                        }}
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden max-w-xs">
                      
                            <div className="bg-white/10 border-b border-white/20 p-4">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="bg-white/20 rounded-lg p-2"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <FaHistory className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <h3 className="text-white font-semibold text-lg">
                                        Recent Searches
                                    </h3>
                                </div>
                            </div>

                         
                            <div className="p-2">
                                {recentHistory.map((city, index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="group"
                                    >
                                        <motion.button
                                            onClick={() => onSearch(city)}
                                            className="w-full p-3 rounded-xl text-left text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center gap-3"
                                            whileHover={{ 
                                                scale: 1.02,
                                                x: 5 
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="bg-white/20 rounded-lg p-2 group-hover:bg-white/30 transition-colors">
                                                <FiMapPin className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{city}</div>
                                                <div className="text-white/60 text-sm">
                                                    Click to search again
                                                </div>
                                            </div>
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-white/5 border-t border-white/20 p-3">
                                <div className="flex items-center gap-2 text-white/60 text-sm">
                                    <FiClock className="w-4 h-4" />
                                    <span>Last {recentHistory.length} searches</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

      
            <AnimatePresence>
                {recentHistory.length > 0 && (
                    <motion.div
                        className="lg:hidden fixed top-6 right-6 z-50"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300,
                            delay: 0.5 
                        }}
                    >
                        <motion.button
                            onClick={toggleDrawer}
                            className="bg-white/20 backdrop-blur-lg text-white p-4 rounded-2xl shadow-lg border border-white/20"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 5,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle Search History"
                        >
                            <motion.div
                                animate={{ rotate: isDrawerOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaHistory className="w-6 h-6" />
                            </motion.div>
                        </motion.button>

                 
                        <motion.div
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white/20"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7, type: "spring", stiffness: 400 }}
                        >
                            {recentHistory.length}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

      
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                  
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleDrawer}
                        />

                        <motion.div
                            className="fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 lg:hidden"
                            variants={drawerVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                           
                            <div className="bg-white/10 border-b border-white/20 p-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="bg-white/20 rounded-xl p-3"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <FaHistory className="w-6 h-6 text-white" />
                                        </motion.div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">
                                                Search History
                                            </h2>
                                            <p className="text-white/60 text-sm">
                                                Your recent searches
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={toggleDrawer}
                                        className="bg-white/20 text-white rounded-xl p-3 hover:bg-white/30 transition-colors"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiX className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>

                         
                            <div className="p-4 space-y-2 overflow-y-auto flex-1">
                                {recentHistory.map((city, index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="group"
                                    >
                                        <motion.button
                                            onClick={() => {
                                                onSearch(city);
                                                setIsDrawerOpen(false);
                                            }}
                                            className="w-full p-4 rounded-2xl text-left text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                                            whileHover={{ 
                                                scale: 1.02,
                                                x: 5 
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white/20 rounded-xl p-3 group-hover:bg-white/30 transition-colors">
                                                    <FiMapPin className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-lg">{city}</div>
                                                    <div className="text-white/60 text-sm">
                                                        Tap to search again
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-white/5 border-t border-white/20 p-4">
                                <div className="flex items-center justify-center gap-2 text-white/60">
                                    <FiClock className="w-4 h-4" />
                                    <span className="text-sm">
                                        {recentHistory.length} recent searches stored
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default SearchHistory;