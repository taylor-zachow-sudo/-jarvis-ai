```javascript
// ==========================================
// JARVIS CHAT - STABILE BASIS
// ==========================================

function addMessage(text, type) {

    const chat = document.getElementById("chat");

    if (!chat) {
        console.error("Chat wurde nicht gefunden.");
        return;
    }

    const message = document.createElement("div");

    message.className = "message " + type;
    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}


// ==========================================
// JARVIS ANTWORT
// ==========================================

function jarvisReply(text) {

    const lower = text.toLowerCase();


    // Begrüßung
    if (
        lower === "hallo" ||
        lower === "hi" ||
        lower === "hey"
    ) {

        return "Hallo. Ich bin JARVIS.";

    }


    // Name speichern
    if (lower.startsWith("mein name ist ")) {

        const name =
            text.substring(14).trim();

        if (
            typeof saveMemory === "function"
        ) {

            saveMemory("name", name);

        }

        return "Verstanden. Ich werde mir deinen Namen merken.";

    }


    // Name abrufen
    if (
        lower.includes("wie heiße ich") ||
        lower.includes("was ist mein name")
    ) {

        if (
            typeof getMemory === "function"
        ) {

            const name =
                getMemory("name");

            if (name) {

                return "Du heißt " + name + ".";

            }

        }

        return "Du hast mir deinen Namen noch nicht gesagt.";

    }


    // Name vergessen
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


    // JARVIS
    if (
        lower.includes("wer bist du") ||
        lower.includes("wie heißt du")
    ) {

        return "Ich bin JARVIS, dein persönlicher Assistent.";

    }


    // Uhrzeit
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


    // Datum
    if (
        lower.includes("datum") ||
        lower.includes("welcher tag")
    ) {

        return (
            "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            "."
        );

    }


    // Danke
    if (lower.includes("danke")) {

        return "Gerne.";

    }


    // Standard
    return "Diese Funktion muss ich noch lernen.";

}


// ==========================================
// NACHRICHT SENDEN
// ==========================================

function sendText() {

    console.log("JARVIS sendText gestartet.");

    const input =
        document.getElementById("userInput");

    if (!input) {

        alert("Fehler: Eingabefeld nicht gefunden.");

        return;

    }


    const text =
        input.value.trim();


    if (!text) {

        return;

    }


    // Benutzer anzeigen
    addMessage(
        "Du: " + text,
        "user-message"
    );


    // Eingabe löschen
    input.value = "";


    // Antwort erstellen
    const answer =
        jarvisReply(text);


    // Antwort anzeigen
    addMessage(
        "JARVIS: " + answer,
        "jarvis-message"
    );


    // Stimme
    if (
        typeof speak === "function"
    ) {

        speak(answer);

    }

}


// ==========================================
// TEST
// ==========================================

console.log(
    "JARVIS chat.js erfolgreich geladen."
);
```
