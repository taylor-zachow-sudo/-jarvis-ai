```javascript
// ==========================================
// JARVIS CHAT.JS
// Apps + Wetter + Erinnerungen + Name
// ==========================================


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

    const isWeather =
        lower.includes("wetter") ||
        lower.includes("temperatur") ||
        lower.includes("regnet es") ||
        lower.includes("wie warm") ||
        lower.includes("wie kalt");

    if (!isWeather) {
        return null;
    }

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

    // Keine Stadt angegeben
    return "Berlin";
}


// ==========================================
// ERINNERUNG ERSTELLEN
// ==========================================

function createReminderFromText(text) {

    const lower =
        text.toLowerCase();


    // ------------------------------------------
    // "IN 10 MINUTEN"
    // ------------------------------------------

    const minutesMatch =
        lower.match(
            /in\s+(\d+)\s+min(?:ute|uten)?/
        );


    if (minutesMatch) {

        const minutes =
            parseInt(minutesMatch[1]);


        let reminderText =
            text;


        const anIndex =
            lower.indexOf("an ");


        if (anIndex !== -1) {

            reminderText =
                text.substring(
                    anIndex + 3
                ).trim();
        }


        if (!reminderText) {

            reminderText =
                "deine Erinnerung";
        }


        const time =
            Date.now() +
            minutes * 60 * 1000;


        saveReminder(
            reminderText,
            time
        );


        return (
            "Verstanden. Ich erinnere dich in " +
            minutes +
            " Minuten an " +
            reminderText +
            "."
        );
    }


    // ------------------------------------------
    // "UM 18 UHR"
    // ------------------------------------------

    const hourMatch =
        lower.match(
            /um\s+(\d{1,2})(?::(\d{2}))?\s*uhr/
        );


    if (hourMatch) {

        const hour =
            parseInt(hourMatch[1]);


        const minute =
            hourMatch[2]
                ? parseInt(hourMatch[2])
                : 0;


        const time =
            new Date();


        time.setHours(
            hour,
            minute,
            0,
            0
        );


        // Wenn die Uhrzeit heute schon vorbei ist,
        // wird die Erinnerung für morgen gesetzt.

        if (
            time.getTime() <= Date.now()
        ) {

            time.setDate(
                time.getDate() + 1
            );
        }


        let reminderText =
            text;


        const anIndex =
            lower.indexOf("an ");


        if (anIndex !== -1) {

            reminderText =
                text.substring(
                    anIndex + 3
                ).trim();
        }


        if (!reminderText) {

            reminderText =
                "deine Erinnerung";
        }


        saveReminder(
            reminderText,
            time.getTime()
        );


        return (
            "Verstanden. Ich erinnere dich um " +
            hour +
            " Uhr an " +
            reminderText +
            "."
        );
    }


    return (
        "Ich brauche noch eine Zeitangabe. " +
        "Zum Beispiel: Erinnere mich in 10 Minuten an den Müll."
    );
}


// ==========================================
// JARVIS ANTWORTEN
// ==========================================

function jarvisReply(text) {

    const originalText =
        text;

    const lower =
        text.toLowerCase();


    // ==========================================
    // APPS
    // ==========================================

    if (
        lower.includes("öffne youtube") ||
        lower.includes("starte youtube")
    ) {

        openApp(
            "https://youtube.com"
        );

        return "Ich öffne YouTube.";
    }


    if (
        lower.includes("öffne whatsapp") ||
        lower.includes("starte whatsapp")
    ) {

        openApp(
            "https://wa.me/"
        );

        return "Ich öffne WhatsApp.";
    }


    if (
        lower.includes("öffne spotify") ||
        lower.includes("starte spotify")
    ) {

        openApp(
            "https://open.spotify.com"
        );

        return "Ich öffne Spotify.";
    }


    if (
        lower.includes("öffne instagram") ||
        lower.includes("starte instagram")
    ) {

        openApp(
            "https://instagram.com"
        );

        return "Ich öffne Instagram.";
    }


    if (
        lower.includes("öffne tiktok") ||
        lower.includes("starte tiktok")
    ) {

        openApp(
            "https://tiktok.com"
        );

        return "Ich öffne TikTok.";
    }


    // ==========================================
    // NAMEN SPEICHERN
    // ==========================================

    if (
        lower.includes("mein name ist ")
    ) {

        const start =
            lower.indexOf("mein name ist ") + 14;


        const name =
            originalText
                .substring(start)
                .trim();


        if (name) {

            saveMemory(
                "name",
                name
            );


            return (
                "Verstanden. " +
                "Ich werde mir deinen Namen merken."
            );
        }
    }


    // ==========================================
    // NAMEN ABRUFEN
    // ==========================================

    if (
        lower.includes("wie heiße ich") ||
        lower.includes("kennst du meinen namen")
    ) {

        const name =
            getMemory("name");


        if (name) {

            return (
                "Du heißt " +
                name +
                "."
            );
        }


        return (
            "Du hast mir deinen Namen " +
            "noch nicht gesagt."
        );
    }


    // ==========================================
    // NAMEN VERGESSEN
    // ==========================================

    if (
        lower.includes("vergiss meinen namen")
    ) {

        deleteMemory("name");


        return (
            "Verstanden. " +
            "Ich habe deinen Namen vergessen."
        );
    }


    // ==========================================
    // BEGRÜSSUNG
    // ==========================================

    if (
        lower.includes("hallo") ||
        lower.includes("hi") ||
        lower.includes("hey")
    ) {

        const name =
            getMemory("name");


        if (name) {

            return (
                "Hallo " +
                name +
                "."
            );
        }


        return (
            "Hallo. " +
            "Ich bin JARVIS."
        );
    }


    // ==========================================
    // WER BIST DU?
    // ==========================================

    if (
        lower.includes("wie heißt du") ||
        lower.includes("wer bist du")
    ) {

        return (
            "Ich bin JARVIS, " +
            "dein persönlicher Assistent."
        );
    }


    // ==========================================
    // WIE GEHT ES DIR?
    // ==========================================

    if (
        lower.includes("wie geht es dir") ||
        lower.includes("wie geht's dir")
    ) {

        return (
            "Alle Systeme funktionieren einwandfrei."
        );
    }


    // ==========================================
    // UHRZEIT
    // ==========================================

    if (
        lower.includes("wie spät") ||
        lower.includes("wie viel uhr") ||
        lower.includes("uhrzeit")
    ) {

        const jetzt =
            new Date();


        const stunden =
            String(
                jetzt.getHours()
            ).padStart(2, "0");


        const minuten =
            String(
                jetzt.getMinutes()
            ).padStart(2, "0");


        return (
            "Es ist " +
            stunden +
            " Uhr " +
            minuten +
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
            new Date().toLocaleDateString(
                "de-DE"
            ) +
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

    return (
        "Diese Funktion muss ich noch lernen."
    );
}


// ==========================================
// CHAT NACHRICHT HINZUFÜGEN
// ==========================================

function addMessage(
    text,
    type
) {

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


    chat.appendChild(
        message
    );


    chat.scrollTop =
        chat.scrollHeight;
}


// ==========================================
// NACHRICHT SENDEN
// ==========================================

async function sendText() {

    const input =
        document.getElementById(
            "userInput"
        );


    if (!input) {
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
    // ERINNERUNG
    // ==========================================

    if (
        lower.includes("erinnere mich") ||
        lower.includes("erinner mich")
    ) {

        if (
            typeof saveReminder !==
            "function"
        ) {

            const error =
                "Das Erinnerungssystem ist nicht geladen.";

            addMessage(
                "JARVIS: " + error,
                "jarvis-message"
            );

            speak(error);

            return;
        }


        const answer =
            createReminderFromText(
                text
            );


        addMessage(
            "JARVIS: " + answer,
            "jarvis-message"
        );


        speak(answer);


        if (
            typeof enableNotifications ===
            "function"
        ) {

            enableNotifications();
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


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            speak(answer);

        } else {

            const answer =
                "Das Erinnerungssystem ist nicht geladen.";


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            speak(answer);
        }


        return;
    }


    // ==========================================
    // ERINNERUNGEN LÖSCHEN
    // ==========================================

    if (
        lower.includes(
            "lösche alle erinnerungen"
        ) ||
        lower.includes(
            "vergiss alle erinnerungen"
        )
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
                "Das Erinnerungssystem ist nicht geladen.";


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            speak(answer);
        }


        return;
    }


    // ==========================================
    // WETTER
    // ==========================================

    const weatherCity =
        getWeatherCity(text);


    if (weatherCity) {

        const loadingText =
            "Einen Moment. " +
            "Ich rufe die Wetterdaten für " +
            weatherCity +
            " ab.";


        addMessage(
            "JARVIS: " + loadingText,
            "jarvis-message"
        );


        speak(
            loadingText
        );


        if (
            typeof getWeather !==
            "function"
        ) {

            const errorText =
                "Das Wettersystem ist nicht geladen.";


            addMessage(
                "JARVIS: " + errorText,
                "jarvis-message"
            );


            speak(errorText);

            return;
        }


        try {

            const answer =
                await getWeather(
                    weatherCity
                );


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
                "Ich konnte die Wetterdaten " +
                "gerade nicht abrufen.";


            addMessage(
                "JARVIS: " + errorText,
                "jarvis-message"
            );


            speak(errorText);
        }


        return;
    }


    // ==========================================
    // NORMALE JARVIS ANTWORT
    // ==========================================

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
}
```
