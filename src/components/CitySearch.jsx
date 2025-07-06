import React, { useState } from "react";
import { fetchGeoData } from "../utils/api";
import { AsyncPaginate } from "react-select-async-paginate";

const CitySearch = ({ onCitySearch }) => {
    const [city, setCity] = useState("");

    const handleCityChange = (cityData) => {
        setCity(cityData.label);
        onCitySearch(cityData.label);
    };

    return (
        <div className="mb-4">
            {/* <h2 className="text-2xl font-semibold mb-4 text-center">
                <p className="text-gray-600">
                    Please enter a city name to get started!!
                </p>
            </h2> */}
            <AsyncPaginate
                placeholder="Enter city name"
                value={city}
                debounceTimeout={600}
                onChange={handleCityChange}
                loadOptions={fetchGeoData}
                className="cursor-pointer "
                styles={{
                    control: (provided) => ({
                        ...provided,
                        minHeight: "56px",
                        height: "56px",
                        borderRadius: "5px",
                        padding: "0 12px",
                        backgroundColor: "#1f2937",
                        color: "#000000",
                        border: "1px solid #444",
                        boxShadow: "none",
                    }),
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: "#ffffff",
                        zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                            ? "#4b5563"
                            : "#ffffff",
                        color: "#000000",
                        padding: 10,
                        cursor: "pointer",
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                    }),
                    input: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: "#9ca3af",
                    }),
                }}
            />
        </div>
    );
};

export default CitySearch;
