```javascript
// ==========================================
// JARVIS CHAT
// ==========================================


// ==========================================
// APP ÖFFNEN
// ==========================================

function openApp(url) {
    window.location.href = url;
}


// ==========================================
// WETTER FRAGE ERKENNEN
// ==========================================

function getWeatherCity(text) {

    const lower = text.toLowerCase();

    if (
        !lower.includes("wetter") &&
        !lower.includes("temperatur") &&
        !lower.includes("regnet") &&
        !lower.includes("warm") &&
        !lower.includes("kalt")
    ) {
        return null;
    }

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

        const position =
            lower.indexOf(pattern);

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

    return "Berlin";
}


// ==========================================
// JARVIS ANTWORT
// ==========================================

function jarvisReply(text) {

    const lower =
        text.toLowerCase();

    const originalText =
        text;


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

        if (
            name &&
            typeof saveMemory === "function"
        ) {

            saveMemory("name", name);

            return "Verstanden. Ich werde mir deinen Namen merken.";
        }
    }


    // ==========================================
    // NAMEN ABRUFEN
    // ==========================================

    if (
        lower.includes("wie heiße ich") ||
        lower.includes("kennst du meinen namen")
    ) {

        if (typeof getMemory === "function") {

            const name =
                getMemory("name");

            if (name) {
                return "Du heißt " + name + ".";
            }
        }

        return "Du hast mir deinen Namen noch nicht gesagt.";
    }


    // ==========================================
    // NAMEN VERGESSEN
    // ==========================================

    if (
        lower.includes("vergiss meinen namen")
    ) {

        if (
            typeof deleteMemory === "function"
        ) {
            deleteMemory("name");
        }

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

        let name = null;

        if (
            typeof getMemory === "function"
        ) {
            name = getMemory("name");
        }

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
    // WIE GEHT ES DIR
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

        const now =
            new Date();

        return (
            "Es ist " +
            String(now.getHours()).padStart(2, "0") +
            " Uhr " +
            String(now.getMinutes()).padStart(2, "0") +
            "."
        );
    }


    // ==========================================
    // DATUM
    // ==========================================

    if (
        lower.includes("datum") ||
        lower.includes("welcher tag ist heute")
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
// CHAT NACHRICHT
// ==========================================

function addMessage(text, type) {

    const chat =
        document.getElementById("chat");

    if (!chat) {
        return;
    }

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    message.textContent =
        text;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;
}


// ==========================================
// NACHRICHT SENDEN
// ==========================================

async function sendText() {

    try {

        const input =
            document.getElementById("userInput");

        if (!input) {
            console.error("userInput fehlt.");
            return;
        }


        const text =
            input.value.trim();

        if (!text) {
            return;
        }


        // Deine Nachricht
        addMessage(
            "Du: " + text,
            "user-message"
        );


        input.value = "";


        const lower =
            text.toLowerCase();


        // ======================================
        // ERINNERUNG
        // ======================================

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

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                if (
                    typeof speak ===
                    "function"
                ) {
                    speak(answer);
                }

                if (
                    typeof enableNotifications ===
                    "function"
                ) {
                    enableNotifications();
                }

            } else {

                const answer =
                    "Das Erinnerungssystem ist noch nicht geladen.";

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                if (
                    typeof speak ===
                    "function"
                ) {
                    speak(answer);
                }
            }

            return;
        }


        // ======================================
        // ERINNERUNGEN ANZEIGEN
        // ======================================

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

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                speak(answer);

            } else {

                const answer =
                    "Das Erinnerungssystem ist noch nicht geladen.";

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                speak(answer);
            }

            return;
        }


        // ======================================
        // ERINNERUNGEN LÖSCHEN
        // ======================================

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

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                speak(answer);

            } else {

                const answer =
                    "Das Erinnerungssystem ist noch nicht geladen.";

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                speak(answer);
            }

            return;
        }


        // ======================================
        // WETTER
        // ======================================

        const city =
            getWeatherCity(text);


        if (city) {

            if (
                typeof getWeather !==
                "function"
            ) {

                const answer =
                    "Das Wettersystem ist noch nicht geladen.";

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                speak(answer);

                return;
            }


            const loading =
                "Einen Moment. Ich rufe die Wetterdaten ab.";


            addMessage(
                "JARVIS: " + loading,
                "jarvis-message"
            );


            speak(loading);


            const answer =
                await getWeather(city);


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            speak(answer);

            return;
        }


        // ======================================
        // NORMALE ANTWORT
        // ======================================

        const answer =
            jarvisReply(text);


        addMessage(
            "JARVIS: " + answer,
            "jarvis-message"
        );


        if (
            typeof speak ===
            "function"
        ) {
            speak(answer);
        }

    } catch (error) {

        console.error(
            "JARVIS FEHLER:",
            error
        );


        const message =
            "Entschuldigung, dabei ist ein Fehler aufgetreten.";


        addMessage(
            "JARVIS: " + message,
            "jarvis-message"
        );


        if (
            typeof speak ===
            "function"
        ) {
            speak(message);
        }
    }
}
```
