function jarvisReply(text) {
    text = text.toLowerCase();

    if (text.includes("hallo") || text.includes("hi")) {
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

    return "Das muss ich noch lernen.";
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
