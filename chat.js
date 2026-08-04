```javascript
// ==========================================
// APPS ÖFFNEN
// ==========================================

function openApp(url) {
    window.location.href = url;
}


// ==========================================
// WETTER ERKENNEN
// ==========================================

function getWeatherCity(text) {

    const lower = text.toLowerCase();

    // Wetter überhaupt gefragt?
    const isWeather =
        lower.includes("wetter") ||
        lower.includes("temperatur") ||
        lower.includes("regnet es") ||
        lower.includes("wie warm") ||
        lower.includes("wie kalt");

    if (!isWeather) {
        return null;
    }

    // Stadt aus der Frage holen
    const patterns = [
        "wetter in ",
        "wetter für ",
        "wetter von ",
        "temperatur in ",
        "temperatur für ",
        "wie warm ist es in ",
        "wie kalt ist es in ",
        "regnet es in "
    ];

    for (const pattern of patterns) {

        const position = lower.indexOf(pattern);

        if (position !== -1) {

            const city =
                text.substring(
                    position + pattern.length
                ).trim();

            if (city) {
                return city;
            }
        }
    }

    // Keine Stadt angegeben
    return "Berlin";
}


// ==========================================
// JARVIS ANTWORTEN
// ==========================================

function jarvisReply(text) {

    const originalText = text;
    const lower = text.toLowerCase();


    // ==========================================
    // APPS
    // ==========================================

    if (
        lower.includes("öffne youtube") ||
        lower.includes("starte youtube")
    ) {
        openApp("https://youtube.com");
        return "Ich öffne YouTube.";
    }

    if (
        lower.includes("öffne whatsapp") ||
        lower.includes("starte whatsapp")
    ) {
        openApp("https://wa.me/");
        return "Ich öffne WhatsApp.";
    }

    if (
        lower.includes("öffne spotify") ||
        lower.includes("starte spotify")
    ) {
        openApp("https://open.spotify.com");
        return "Ich öffne Spotify.";
    }

    if (
        lower.includes("öffne instagram") ||
        lower.includes("starte instagram")
    ) {
        openApp("https://instagram.com");
        return "Ich öffne Instagram.";
    }

    if (
        lower.includes("öffne tiktok") ||
        lower.includes("starte tiktok")
    ) {
        openApp("https://tiktok.com");
        return "Ich öffne TikTok.";
    }


    // ==========================================
    // NAME SPEICHERN
    // ==========================================

    if (lower.includes("mein name ist ")) {

        const start =
            lower.indexOf("mein name ist ") + 14;

        const name =
            originalText.substring(start).trim();

        if (name) {

            saveMemory("name", name);

            return "Verstanden. Ich werde mir deinen Namen merken.";
        }
    }


    // ==========================================
    // NAME ABRUFEN
    // ==========================================

    if (
        lower.includes("wie heiße ich") ||
        lower.includes("kennst du meinen namen")
    ) {

        const name = getMemory("name");

        if (name) {
            return "Du heißt " + name + ".";
        }

        return "Du hast mir deinen Namen noch nicht gesagt.";
    }


    // ==========================================
    // NAME VERGESSEN
    // ==========================================

    if (lower.includes("vergiss meinen namen")) {

        deleteMemory("name");

        return "Verstanden. Ich habe deinen Namen vergessen.";
    }


    // ==========================================
    // BEGRÜSSUNG
    // ==========================================

    if (
        lower.includes("hallo") ||
        lower.includes("hi") ||
        lower.includes("hey")
    ) {

        const name = getMemory("name");

        if (name) {
            return "Hallo " + name + ".";
        }

        return "Hallo. Ich bin JARVIS.";
    }


    // ==========================================
    // JARVIS
    // ==========================================

    if (
        lower.includes("wie heißt du") ||
        lower.includes("wer bist du")
    ) {
        return "Ich bin JARVIS, dein persönlicher Assistent.";
    }


    // ==========================================
    // BEFINDEN
    // ==========================================

    if (
        lower.includes("wie geht es dir") ||
        lower.includes("wie geht's dir")
    ) {
        return "Alle Systeme funktionieren einwandfrei.";
    }


    // ==========================================
    // UHRZEIT
    // ==========================================

    if (
        lower.includes("wie spät") ||
        lower.includes("wie viel uhr") ||
        lower.includes("uhrzeit")
    ) {

        const jetzt = new Date();

        return "Es ist " +
            String(jetzt.getHours()).padStart(2, "0") +
            " Uhr " +
            String(jetzt.getMinutes()).padStart(2, "0") +
            ".";
    }


    // ==========================================
    // DATUM
    // ==========================================

    if (
        lower.includes("datum") ||
        lower.includes("welcher tag ist heute")
    ) {

        return "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            ".";
    }


    // ==========================================
    // DANKE
    // ==========================================

    if (
        lower.includes("danke") ||
        lower.includes("dankeschön")
    ) {
        return "Gerne.";
    }


    // ==========================================
    // TSCHÜSS
    // ==========================================

    if (
        lower.includes("tschüss") ||
        lower.includes("auf wiedersehen")
    ) {
        return "Auf Wiedersehen.";
    }


    // ==========================================
    // STANDARD
    // ==========================================

    return "Diese Funktion muss ich noch lernen.";
}


// ==========================================
// NACHRICHT HINZUFÜGEN
// ==========================================

function addMessage(text, type) {

    const chat =
        document.getElementById("chat");

    if (!chat) return;

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;
}


// ==========================================
// NACHRICHT SENDEN
// ==========================================

async function sendText() {

    const input =
        document.getElementById("userInput");

    if (!input) return;

    const text =
        input.value.trim();

    if (!text) return;


    // Deine Nachricht anzeigen
    addMessage(
        "Du: " + text,
        "user-message"
    );


    // Eingabefeld leeren
    input.value = "";


    // ==========================================
    // WETTER PRÜFEN
    // ==========================================

    const weatherCity =
        getWeatherCity(text);


    if (weatherCity) {

        const loadingText =
            "Einen Moment. Ich rufe die Wetterdaten für " +
            weatherCity +
            " ab.";

        addMessage(
            "JARVIS: " + loadingText,
            "jarvis-message"
        );

        speak(loadingText);


        try {

            const answer =
                await getWeather(weatherCity);


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );

            speak(answer);


        } catch (error) {

            console.error(
                "Wetterfehler:",
                error
            );

            const errorText =
                "Ich konnte die Wetterdaten gerade nicht abrufen.";

            addMessage(
                "JARVIS: " + errorText,
                "jarvis-message"
            );

            speak(errorText);
        }

        return;
    }


    // ==========================================
    // NORMALE ANTWORT
    // ==========================================

    const answer =
        jarvisReply(text);


    addMessage(
        "JARVIS: " + answer,
        "jarvis-message"
    );


    if (typeof speak === "function") {
        speak(answer);
    }
}
```
