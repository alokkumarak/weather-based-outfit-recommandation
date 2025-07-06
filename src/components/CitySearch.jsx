import React from "react";
import { fetchGeoData } from "../utils/api";
import { AsyncPaginate } from "react-select-async-paginate";

const CitySearch = ({ onCitySearch }) => {
    const [city, setCity] = React.useState("");

    const handleCityChange = (cityData) => {
        setCity(cityData.label);
        onCitySearch(cityData.label);
    };

    return (
        <div>
            <AsyncPaginate
                placeholder="Enter city name"
                value={city}
                debounceTimeout={600}
                onChange={handleCityChange}
                loadOptions={fetchGeoData}
                className="cursor-pointer w-[500px]"
            />
        </div>
    );
};

export default CitySearch;
