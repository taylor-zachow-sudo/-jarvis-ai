async function processMessage(text) {

    const lower = text.toLowerCase();

    if (
        lower.includes("wetter") ||
        lower.includes("temperatur")
    ) {

        let city = "Berlin";

        const match = text.match(
            /(?:in|für)\s+([a-zA-ZäöüÄÖÜß -]+)/i
        );

        if (match) {
            city = match[1].trim();
        }

        addMessage("JARVIS: Ich prüfe das Wetter...", "jarvis-message");

        const answer = await getWeather(city);

        addMessage("JARVIS: " + answer, "jarvis-message");

        if (typeof speak === "function") {
            speak(answer);
        }

        return true;
    }

    return false;
}

function jarvisReply(text) {

    const originalText = text;
    text = text.toLowerCase();

    // Namen speichern
    if (text.includes("mein name ist ")) {

        const name = originalText
            .substring(originalText.toLowerCase().indexOf("mein name ist ") + 13)
            .trim();

        if (name) {
            saveMemory("name", name);
            return "Verstanden. Ich werde mir deinen Namen merken.";
        }
    }

    // Namen abrufen
    if (
        text.includes("wie heiße ich") ||
        text.includes("kennst du meinen namen")
    ) {
        const name = getMemory("name");

        if (name) {
            return "Du heißt " + name + ".";
        }

        return "Du hast mir deinen Namen noch nicht gesagt.";
    }

    if (text.includes("vergiss meinen namen")) {
        deleteMemory("name");
        return "Verstanden. Ich habe deinen Namen vergessen.";
    }

    if (text.includes("hallo") || text.includes("hi")) {
        const name = getMemory("name");

        if (name) {
            return "Hallo " + name + ".";
        }

        return "Hallo. Ich bin JARVIS.";
    }

    if (text.includes("wie heißt du")) {
        return "Ich bin JARVIS, dein persönlicher Assistent.";
    }

    if (text.includes("wie geht es dir")) {
        return "Alle Systeme funktionieren einwandfrei.";
    }

    if (text.includes("wie spät") || text.includes("uhr")) {

        const jetzt = new Date();

        return "Es ist " +
            jetzt.getHours() +
            " Uhr " +
            String(jetzt.getMinutes()).padStart(2, "0") +
            ".";
    }

    if (text.includes("datum")) {
        return "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            ".";
    }

    if (text.includes("danke")) {
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

    if (text === "") return;

    addMessage("Du: " + text, "user-message");

    input.value = "";

    const answer = jarvisReply(text);

    addMessage("JARVIS: " + answer, "jarvis-message");

    if (typeof speak === "function") {
        speak(answer);
    }
}
