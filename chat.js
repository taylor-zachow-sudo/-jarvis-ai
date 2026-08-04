```javascript
function jarvisReply(text) {

    const originalText = text;
    const lower = text.toLowerCase();

    // Namen speichern
    if (lower.includes("mein name ist ")) {

        const start = lower.indexOf("mein name ist ") + 14;
        const name = originalText.substring(start).trim();

        if (name) {
            saveMemory("name", name);
            return "Verstanden. Ich werde mir deinen Namen merken.";
        }
    }

    // Namen abrufen
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

    // Namen vergessen
    if (lower.includes("vergiss meinen namen")) {
        deleteMemory("name");
        return "Verstanden. Ich habe deinen Namen vergessen.";
    }

    // Begrüßung
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

    // Wer bist du?
    if (
        lower.includes("wie heißt du") ||
        lower.includes("wer bist du")
    ) {
        return "Ich bin JARVIS, dein persönlicher Assistent.";
    }

    // Befinden
    if (
        lower.includes("wie geht es dir") ||
        lower.includes("wie geht's dir")
    ) {
        return "Alle Systeme funktionieren einwandfrei.";
    }

    // Uhrzeit
    if (
        lower.includes("wie spät") ||
        lower.includes("wie viel uhr") ||
        lower.includes("uhrzeit")
    ) {

        const jetzt = new Date();

        return "Es ist " +
            jetzt.getHours() +
            " Uhr " +
            String(jetzt.getMinutes()).padStart(2, "0") +
            ".";
    }

    // Datum
    if (
        lower.includes("datum") ||
        lower.includes("welcher tag ist heute")
    ) {

        return "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            ".";
    }

    // Danke
    if (
        lower.includes("danke") ||
        lower.includes("dankeschön")
    ) {
        return "Gerne.";
    }

    // Auf Wiedersehen
    if (
        lower.includes("tschüss") ||
        lower.includes("auf wiedersehen")
    ) {
        return "Auf Wiedersehen.";
    }

    // Standardantwort
    return "Diese Funktion muss ich noch lernen.";
}


// ==================================================
// CHAT NACHRICHT HINZUFÜGEN
// ==================================================

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


// ==================================================
// TEXT SENDEN
// ==================================================

function sendText() {

    const input =
        document.getElementById("userInput");

    if (!input) return;

    const text =
        input.value.trim();

    if (!text) return;


    // Benutzer-Nachricht
    addMessage(
        "Du: " + text,
        "user-message"
    );


    // Eingabefeld leeren
    input.value = "";


    // JARVIS Antwort
    const answer =
        jarvisReply(text);


    // Antwort anzeigen
    addMessage(
        "JARVIS: " + answer,
        "jarvis-message"
    );


    // Antwort sprechen
    speak(answer);
}
```

