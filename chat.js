```javascript
// ==========================================
// JARVIS CHAT.JS
// STABILE VERSION
// ==========================================


// ==========================================
// APP ÖFFNEN
// ==========================================

function openApp(url) {
    window.location.href = url;
}


// ==========================================
// NACHRICHT INS CHATFENSTER
// ==========================================

function addMessage(text, type) {

    const chat = document.getElementById("chat");

    if (!chat) {
        console.error("Chatfenster nicht gefunden.");
        return;
    }

    const message = document.createElement("div");

    message.className = "message " + type;
    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}


// ==========================================
// JARVIS ANTWORT + STIMME
// ==========================================

function jarvisSpeak(text) {

    addMessage(
        "JARVIS: " + text,
        "jarvis-message"
    );

    if (typeof speak === "function") {
        speak(text);
    }
}


// ==========================================
// WETTER-STADT ERKENNEN
// ==========================================

function getWeatherCity(text) {

    const lower = text.toLowerCase();

    const patterns = [
        "wetter in ",
        "wetter für ",
        "temperatur in ",
        "temperatur für ",
        "regnet es in ",
        "wie warm ist es in ",
        "wie kalt ist es in "
    ];

    for (const pattern of patterns) {

        const position = lower.indexOf(pattern);

        if (position !== -1) {

            const city = text
                .substring(position + pattern.length)
                .trim();

            if (city) {
                return city;
            }
        }
    }

    // "Wie ist das Wetter?"
    if (
        lower.includes("wetter") ||
        lower.includes("temperatur") ||
        lower.includes("regnet es")
    ) {
        return "Berlin";
    }

    return null;
}


// ==========================================
// JARVIS ANTWORTEN
// ==========================================

function jarvisReply(text) {

    const originalText = text.trim();
    const lower = originalText.toLowerCase();


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
    // NAMEN SPEICHERN
    // ==========================================

    if (lower.includes("mein name ist ")) {

        const start =
            lower.indexOf("mein name ist ") + 14;

        const name =
            originalText.substring(start).trim();

        if (name) {

            if (typeof saveMemory === "function") {
                saveMemory("name", name);
            }

            return "Verstanden. Ich werde mir deinen Namen merken.";
        }
    }


    // ==========================================
    // NAMEN ABRUFEN
    // ==========================================

    if (
        lower.includes("wie heiße ich") ||
        lower.includes("kennst du meinen namen") ||
        lower.includes("was ist mein name")
    ) {

        let name = null;

        if (typeof getMemory === "function") {
            name = getMemory("name");
        }

        if (name) {
            return "Du heißt " + name + ".";
        }

        return "Du hast mir deinen Namen noch nicht gesagt.";
    }


    // ==========================================
    // NAMEN VERGESSEN
    // ==========================================

    if (lower.includes("vergiss meinen namen")) {

        if (typeof deleteMemory === "function") {
            deleteMemory("name");
        }

        return "Verstanden. Ich habe deinen Namen vergessen.";
    }


    // ==========================================
    // BEGRÜSSUNG
    // ==========================================

    if (
        lower === "hallo" ||
        lower === "hi" ||
        lower === "hey" ||
        lower.includes("hallo jarvis") ||
        lower.includes("hi jarvis") ||
        lower.includes("hey jarvis")
    ) {

        let name = null;

        if (typeof getMemory === "function") {
            name = getMemory("name");
        }

        if (name) {
            return "Hallo " + name + ".";
        }

        return "Hallo. Ich bin JARVIS.";
    }


    // ==========================================
    // WER BIST DU?
    // ==========================================

    if (
        lower.includes("wie heißt du") ||
        lower.includes("wer bist du") ||
        lower.includes("was bist du")
    ) {
        return "Ich bin JARVIS, dein persönlicher Assistent.";
    }


    // ==========================================
    // WIE GEHT ES DIR?
    // ==========================================

    if (
        lower.includes("wie geht es dir") ||
        lower.includes("wie geht's dir") ||
        lower.includes("wie gehts dir")
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

        const now = new Date();

        const hours =
            String(now.getHours()).padStart(2, "0");

        const minutes =
            String(now.getMinutes()).padStart(2, "0");

        return (
            "Es ist " +
            hours +
            " Uhr " +
            minutes +
            "."
        );
    }


    // ==========================================
    // DATUM
    // ==========================================

    if (
        lower.includes("datum") ||
        lower.includes("welcher tag ist heute") ||
        lower.includes("welches datum haben wir")
    ) {

        return (
            "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            "."
        );
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
        lower.includes("auf wiedersehen") ||
        lower.includes("bis später")
    ) {
        return "Auf Wiedersehen.";
    }


    // ==========================================
    // STANDARD
    // ==========================================

    return "Diese Funktion muss ich noch lernen.";
}


// ==========================================
// NACHRICHT SENDEN
// ==========================================

async function sendText() {

    console.log("JARVIS: Nachricht wird verarbeitet.");

    const input =
        document.getElementById("userInput");

    if (!input) {
        console.error("userInput nicht gefunden.");
        return;
    }

    const text =
        input.value.trim();

    if (!text) {
        return;
    }


    // ==========================================
    // DEINE NACHRICHT
    // ==========================================

    addMessage(
        "Du: " + text,
        "user-message"
    );

    input.value = "";


    const lower =
        text.toLowerCase();


    // ==========================================
    // ERINNERUNG ERSTELLEN
    // ==========================================

    if (
        lower.includes("erinnere mich") ||
        lower.includes("erinner mich")
    ) {

        if (
            typeof createReminderFromText ===
            "function"
        ) {

            const answer =
                createReminderFromText(text);

            jarvisSpeak(answer);

            if (
                typeof enableNotifications ===
                "function"
            ) {
                enableNotifications();
            }

        } else {

            jarvisSpeak(
                "Das Erinnerungssystem ist noch nicht geladen."
            );
        }

        return;
    }


    // ==========================================
    // ERINNERUNGEN ANZEIGEN
    // ==========================================

    if (
        lower.includes("meine erinnerungen") ||
        lower.includes("welche erinnerungen") ||
        lower.includes("meine termine")
    ) {

        if (
            typeof getReminders ===
            "function"
        ) {

            const answer =
                getReminders();

            jarvisSpeak(answer);

        } else {

            jarvisSpeak(
                "Das Erinnerungssystem ist noch nicht geladen."
            );
        }

        return;
    }


    // ==========================================
    // ERINNERUNGEN LÖSCHEN
    // ==========================================

    if (
        lower.includes("lösche alle erinnerungen") ||
        lower.includes("vergiss alle erinnerungen")
    ) {

        if (
            typeof clearReminders ===
            "function"
        ) {

            const answer =
                clearReminders();

            jarvisSpeak(answer);

        } else {

            jarvisSpeak(
                "Das Erinnerungssystem ist noch nicht geladen."
            );
        }

        return;
    }


    // ==========================================
    // WETTER
    // ==========================================

    const city =
        getWeatherCity(text);


    if (city) {

        if (
            typeof getWeather !==
            "function"
        ) {

            jarvisSpeak(
                "Das Wettersystem ist noch nicht geladen."
            );

            return;
        }


        const loading =
            "Einen Moment. Ich rufe die Wetterdaten ab.";

        jarvisSpeak(loading);


        try {

            const answer =
                await getWeather(city);

            jarvisSpeak(answer);

        } catch (error) {

            console.error(
                "Wetterfehler:",
                error
            );

            jarvisSpeak(
                "Ich konnte die Wetterdaten gerade nicht abrufen."
            );
        }

        return;
    }


    // ==========================================
    // NORMALE ANTWORT
    // ==========================================

    const answer =
        jarvisReply(text);

    jarvisSpeak(answer);
}


// ==========================================
// TEST
// ==========================================

console.log(
    "JARVIS chat.js erfolgreich geladen."
);
```
