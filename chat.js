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
    if (lower.includes("hallo") || lower.includes("hi")) {

        const name = getMemory("name");

        if (name) {
            return "Hallo " + name + ".";
        }

        return "Hallo. Ich bin JARVIS.";
    }

    if (lower.includes("wie heißt du")) {
        return "Ich bin JARVIS, dein persönlicher Assistent.";
    }

    if (lower.includes("wie geht es dir")) {
        return "Alle Systeme funktionieren einwandfrei.";
    }

    if (lower.includes("wie spät") || lower.includes("uhr")) {

        const jetzt = new Date();

        return "Es ist " +
            jetzt.getHours() +
            " Uhr " +
            String(jetzt.getMinutes()).padStart(2, "0") +
            ".";
    }

    if (lower.includes("datum")) {
        return "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            ".";
    }

    if (lower.includes("danke")) {
        return "Gerne.";
    }

    return "Diese Funktion muss ich noch lernen.";
}


function addMessage(text, type) {

    const chat = document.getElementById("chat");

    if (!chat) return;

    const message = document.createElement("div");

    message.className = "message " + type;
    message.textContent = text;

    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}


function sendText() {

    const input = document.getElementById("userInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    addMessage("Du: " + text, "user-message");

    input.value = "";

    const answer = jarvisReply(text);

    addMessage("JARVIS: " + answer, "jarvis-message");

    speak(answer);
}
