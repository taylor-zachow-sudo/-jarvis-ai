```javascript
// ==========================================
// JARVIS WETTER
// Open-Meteo - kostenlos
// ==========================================

async function getWeather(city) {

    try {

        // ==========================================
        // STADT SUCHEN
        // ==========================================

        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search" +
            "?name=" + encodeURIComponent(city) +
            "&count=1" +
            "&language=de" +
            "&format=json"
        );

        if (!geoResponse.ok) {
            throw new Error("Geocoding fehlgeschlagen");
        }

        const geoData = await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            return "Ich konnte die Stadt " +
                city +
                " nicht finden.";
        }


        const location =
            geoData.results[0];


        // ==========================================
        // WETTER ABRUFEN
        // ==========================================

        const weatherResponse = await fetch(

            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + location.latitude +
            "&longitude=" + location.longitude +
            "&current=temperature_2m,weather_code,wind_speed_10m" +
            "&timezone=auto"

        );


        if (!weatherResponse.ok) {
            throw new Error("Wetterdaten konnten nicht geladen werden");
        }


        const weather =
            await weatherResponse.json();


        if (!weather.current) {
            throw new Error("Keine aktuellen Wetterdaten");
        }


        const temperature =
            Math.round(weather.current.temperature_2m);

        const wind =
            Math.round(weather.current.wind_speed_10m);

        const code =
            weather.current.weather_code;


        // ==========================================
        // WETTERBESCHREIBUNG
        // ==========================================

        let description = "unbekannt";


        if (code === 0) {
            description = "klar";
        }

        else if (code === 1) {
            description = "überwiegend klar";
        }

        else if (code === 2) {
            description = "teilweise bewölkt";
        }

        else if (code === 3) {
            description = "bedeckt";
        }

        else if (
            code === 45 ||
            code === 48
        ) {
            description = "neblig";
        }

        else if (
            code >= 51 &&
            code <= 57
        ) {
            description = "Nieselregen";
        }

        else if (
            code >= 61 &&
            code <= 67
        ) {
            description = "Regen";
        }

        else if (
            code >= 71 &&
            code <= 77
        ) {
            description = "Schnee";
        }

        else if (
            code >= 80 &&
            code <= 82
        ) {
            description = "Regenschauer";
        }

        else if (
            code >= 85 &&
            code <= 86
        ) {
            description = "Schneeschauer";
        }

        else if (
            code >= 95 &&
            code <= 99
        ) {
            description = "Gewitter";
        }


        // ==========================================
        // ANTWORT
        // ==========================================

        return (
            "In " +
            location.name +
            " sind es aktuell " +
            temperature +
            " Grad. " +
            "Der Himmel ist " +
            description +
            ". " +
            "Die Windgeschwindigkeit beträgt " +
            wind +
            " Kilometer pro Stunde."
        );


    } catch (error) {

        console.error(
            "Wetterfehler:",
            error
        );

        return (
            "Ich konnte die Wetterdaten " +
            "gerade nicht abrufen."
        );
    }
}
```
