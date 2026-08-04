```javascript
function sendText() {

    console.log("SENDTEXT WIRD AUSGEFÜHRT");

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    if (!input || !chat) {
        alert("Eingabefeld oder Chat wurde nicht gefunden.");
        return;
    }

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    // Deine Nachricht
    const userMessage = document.createElement("div");

    userMessage.className = "message user-message";
    userMessage.textContent = "Du: " + text;

    chat.appendChild(userMessage);

    // Eingabe löschen
    input.value = "";

    // JARVIS Antwort
    const jarvisMessage = document.createElement("div");

    jarvisMessage.className = "message jarvis-message";
    jarvisMessage.textContent =
        "JARVIS: Hallo. Ich kann dich wieder hören.";

    chat.appendChild(jarvisMessage);

    // Nach unten scrollen
    chat.scrollTop = chat.scrollHeight;

    // Stimme
    if (typeof speak === "function") {
        speak("Hallo. Ich kann dich wieder hören.");
    }
}

console.log("CHAT.JS ERFOLGREICH GELADEN");
```
