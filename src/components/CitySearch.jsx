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
            <h2 className="text-2xl font-semibold mb-4 text-center">
                <p className="text-gray-600">
                    Please enter a city name to get started!!
                </p>
            </h2>
            <AsyncPaginate
                placeholder="Enter city name"
                value={city}
                debounceTimeout={600}
                onChange={handleCityChange}
                loadOptions={fetchGeoData}
                className="cursor-pointer "
                styles={{
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: "#ffffff",
                        zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                            ? "#537575"
                            : "#ffffff",
                        color: "#000000",
                        padding: 10,
                        cursor: "pointer",
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: "#000000",
                    }),
                    input: (provided) => ({
                        ...provided,
                        color: "#000000",
                    }),
                }}
            />
        </div>
    );
};

export default CitySearch;
