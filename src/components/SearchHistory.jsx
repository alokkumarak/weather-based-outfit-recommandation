import React, { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const SearchHistory = ({ history, onSearch }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const recentHistory = history.slice(-5);

    return (
        <>
            {recentHistory.length > 0 && (
                <div className="hidden lg:fixed lg:top-2 lg:right-5 lg:z-50 lg:block">
                    <div
                        className="rounded-md cursor-pointer text-white bg-gray-800 mt-5 pt-0 pb-5 pl-5 pr-5 hover:scale-105 transition-all duration-300 flex flex-col w-[300px]"
                        style={{
                            boxShadow: "10px -2px 20px 2px rgb(0 0 0 / 30%)",
                        }}
                    >
                        <h2 className="text-xl font-bold p-2 text-center">
                            Search History
                        </h2>
                        <ul className="flex flex-col">
                            {recentHistory.map((city, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-600"
                                    onClick={() => onSearch(city)}
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="lg:hidden fixed top-4 right-4 z-50">
                {recentHistory.length > 0 && (
                    <button
                        onClick={toggleDrawer}
                        className="bg-gray-700 text-white p-3 rounded-full shadow-md hover:scale-110 transition cursor-pointer"
                        aria-label="Toggle Search History"
                    >
                        <FaHistory className="w-6 h-6" />
                    </button>
                )}
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 z-50 ${
                    isDrawerOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Search History</h2>
                    <button
                        onClick={toggleDrawer}
                        className="text-white text-2xl cursor-pointer"
                    >
                        <MdClose />
                    </button>
                </div>
                <ul className="flex flex-col p-4">
                    {recentHistory.map((city, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-600 rounded transition"
                            onClick={() => {
                                onSearch(city);
                                setIsDrawerOpen(false);
                            }}
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SearchHistory;
