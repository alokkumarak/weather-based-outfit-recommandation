export const weatherThemes = {
    Clear: {
        bg: "bg-gradient-to-r from-yellow-100 via-yellow-300 to-orange-400",
        icon: "☀️",
    },
    Rain: {
        bg: "bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600",
        icon: "🌧️",
    },
    Snow: {
        bg: "bg-gradient-to-r from-white via-gray-200 to-blue-100",
        icon: "❄️",
    },
    Clouds: {
        bg: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600",
        icon: "☁️",
    },
    Thunderstorm: {
        bg: "bg-gradient-to-r from-gray-700 via-purple-600 to-purple-800",
        icon: "⛈️",
    },
    Drizzle: {
        bg: "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500",
        icon: "🌦️",
    },
    Mist: {
        bg: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400",
        icon: "🌫️",
    },
    Haze: {
        bg: "bg-gradient-to-r from-yellow-100 via-yellow-200 to-gray-300",
        icon: "🌁",
    },
    default: {
        bg: "bg-gradient-to-r from-teal-300 via-green-400 to-lime-400",
        icon: "🌤️",
    },
};
export const getOutfitRecommendation = (weather) => {
    if (!weather) return "";

    const temperature = weather.main.temp;
    const condition = weather.weather[0].main;

    let message = "";

    if (temperature < 10) {
        if (condition === "Rain") {
            message =
                "🌧️ It's cold and rainy today. 🧥 Wear a heavy coat, 🧤 gloves, and a 🧣 scarf. ☔ Don't forget your umbrella and wear waterproof 🥾 boots.";
        } else if (condition === "Sunny") {
            message =
                "☀️ It's sunny but chilly. 🧥 A warm coat, 🧤 gloves, and maybe some 🕶️ sunglasses would be smart.";
        } else if (condition === "Snow") {
            message =
                "❄️ It's freezing and snowy! 🧥 Bundle up with a heavy coat, 🧤 gloves, 🧣 scarf, and wear 🥾 snow boots.";
        } else if (condition === "Clouds") {
            message =
                "☁️ It's cold and cloudy. 🧥 Wear a heavy coat and consider layering. 🧤 Gloves will help too.";
        } else if (condition === "Thunderstorm") {
            message =
                "⛈️ Cold with a thunderstorm. 🧥 Stay warm, and try to stay indoors if you can. ☔ If you go out, bring an umbrella and wear waterproof gear.";
        } else {
            message =
                "🧥 It's very cold today. Bundle up with a heavy coat, gloves, and a scarf.";
        }
    } else if (temperature < 20) {
        if (condition === "Rain") {
            message =
                "🌧️ It's cool and rainy. 🧥 A light jacket with ☂️ an umbrella is a good combo. 👖 Long pants and waterproof shoes recommended.";
        } else if (condition === "Sunny") {
            message =
                "☀️ Nice and cool with sunshine. 🧥 A light jacket or sweater is perfect. 🕶️ Sunglasses might come in handy!";
        } else if (condition === "Clouds") {
            message =
                "☁️ Cool and cloudy. 🧥 A sweater or light jacket will keep you comfy. 👖 Jeans work well.";
        } else if (condition === "Snow") {
            message =
                "❄️ Cool with a chance of snow. 🧥 Layer up with a jacket and gloves. ❄️ Be cautious with shoes!";
        } else if (condition === "Thunderstorm") {
            message =
                "⛈️ A bit cool and stormy. Wear a jacket and bring ☔ an umbrella. Stay safe and avoid open areas.";
        } else {
            message =
                "🧥 A light jacket or sweater would be just right. 👖 Consider wearing long pants.";
        }
    } else if (temperature < 30) {
        if (condition === "Rain") {
            message =
                "🌦️ Warm but rainy. 👕 Light clothes are fine, but bring ☔ an umbrella and wear water-resistant shoes.";
        } else if (condition === "Sunny") {
            message =
                "☀️ It's warm and sunny. 👕 A t-shirt, 🩳 shorts, and 🕶️ sunglasses are perfect. Don't forget sunscreen!";
        } else if (condition === "Clouds") {
            message =
                "☁️ Warm and cloudy. 👕 Light clothes will keep you comfy. A light layer in case it cools later.";
        } else if (condition === "Thunderstorm") {
            message =
                "⛈️ Warm but stormy. 👕 Light clothes are fine, but wear something water-resistant and avoid metal accessories.";
        } else {
            message =
                "👕 It's pleasantly warm. Light clothing and 👖 breathable fabrics are perfect.";
        }
    } else {
        if (condition === "Rain") {
            message =
                "🌧️ Hot and rainy! Wear 👕 breathable clothes and 🩳 shorts. ☔ Take an umbrella and wear sandals or waterproof shoes.";
        } else if (condition === "Sunny") {
            message =
                "🔥 It's hot and sunny. 👕 Wear light, breathable clothes. 🕶️ Sunglasses, 🧴 sunscreen, and hydration are key!";
        } else if (condition === "Clouds") {
            message =
                "☁️ It's hot with clouds. 👕 Light clothing and 🩳 shorts are good. Stay cool and hydrated.";
        } else if (condition === "Thunderstorm") {
            message =
                "⛈️ Hot with thunderstorms. 👕 Wear light clothes, but be cautious. ☔ Bring an umbrella and avoid open fields.";
        } else {
            message =
                "🔥 It's very hot. 👕 Dress in the lightest, most breathable clothes you have. 🧴 Sunscreen and 🧢 a hat can help.";
        }
    }

    return message;
};
