const status = document.getElementById("status");

function speak(text) {
    status.innerHTML = "JARVIS: " + text;

    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "de-DE";
    msg.rate = 0.85;
    msg.pitch = 0.7;
    msg.volume = 1;

    window.speechSynthesis.speak(msg);
}


function startJarvis() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {
        alert("Spracherkennung wird nicht unterstützt.");
        return;
    }

    const recognition = new Recognition();

    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = function() {
        status.innerHTML = "🎤 JARVIS HÖRT ZU...";
    };

    recognition.onresult = function(event) {

        const text = event.results[0][0].transcript;

        const input = document.getElementById("userInput");

        if (input) {
            input.value = text;
            sendText();
        }
    };

    recognition.onerror = function(event) {
        status.innerHTML = "Mikrofonfehler: " + event.error;
    };

    recognition.start();
}
