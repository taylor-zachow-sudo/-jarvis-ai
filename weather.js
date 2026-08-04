async function getWeather(city) {
    try {
        // Stadt in Koordinaten umwandeln
        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=de&format=json"
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            return "Ich konnte diese Stadt nicht finden.";
        }

        const location = geoData.results[0];

        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            location.latitude +
            "&longitude=" +
            location.longitude +
            "&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto"
        );

        const weather = await weatherResponse.json();

        const temperature = weather.current.temperature_2m;
        const wind = weather.current.wind_speed_10m;
        const code = weather.current.weather_code;

        let description = "unbekannt";

        if (code === 0) description = "klar";
        else if (code <= 3) description = "teilweise bewölkt";
        else if (code <= 48) description = "neblig";
        else if (code <= 67) description = "regnerisch";
        else if (code <= 77) description = "verschneit";
        else if (code >= 95) description = "Gewitter";

        return "In " + location.name +
            " sind es aktuell " + temperature +
            " Grad. Der Himmel ist " +
            description +
            ". Die Windgeschwindigkeit beträgt " +
            wind + " Kilometer pro Stunde.";

    } catch (error) {
        return "Ich konnte die Wetterdaten gerade nicht abrufen.";
    }
}
