function addMessage(text, type) {
    const chat = document.getElementById("chat");

    const message = document.createElement("div");
    message.className = "message " + type;
    message.textContent = text;

    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function sendText() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();

    if (text === "") return;

    addMessage("Du: " + text, "user-message");

    input.value = "";

    const answer = jarvisReply(text);

    addMessage("JARVIS: " + answer, "jarvis-message");

    speak(answer);
}
        
