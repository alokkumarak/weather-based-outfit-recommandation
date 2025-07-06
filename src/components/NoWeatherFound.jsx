import Image from "next/image";
import React from "react";

const NoWeatherFound = () => {
    return (
        <div
            className="mt-10 flex flex-col items-center justify-center  rounded-md cursor-pointer text-white bg-gray-500 p-2 hover:scale-105 transition-all duration-300"
            style={{
                boxShadow: "10px -2px 20px 2px rgb(0 0 0 / 30%)",
            }}
        >
            <Image
                alt="weather"
                src={`/weather-not-found.gif`}
                width={200}
                height={200}
            />
            <p className="text-center text-white">No weather data available.</p>
            <div className="text-center text-white flex items-center">
                Kindly choose the other city
                <Image
                    alt="weather"
                    src={`/sad-emoji.gif`}
                    width={50}
                    height={50}
                />
            </div>
        </div>
    );
};

export default NoWeatherFound;
