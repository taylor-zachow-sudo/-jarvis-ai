function sendText() {

    const input = document.getElementById("userInput");

    if (!input) {
        alert("userInput nicht gefunden!");
        return;
    }

    const text = input.value.trim();

    if (!text) {
        return;
    }

    const chat = document.getElementById("chat");

    chat.innerHTML +=
        '<div class="message user-message">Du: ' +
        text +
        '</div>';

    input.value = "";

    chat.innerHTML +=
        '<div class="message jarvis-message">JARVIS: Hallo. Ich funktioniere wieder.</div>';

    chat.scrollTop = chat.scrollHeight;

    console.log("sendText funktioniert!");
}
