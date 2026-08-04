const status = document.getElementById("status");

function speak(text) {
    status.innerHTML = "JARVIS: " + text;

    if (!("speechSynthesis" in window)) {
        console.log("Sprachausgabe wird nicht unterstützt.");
        return;
    }

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    // JARVIS-Stimme
    msg.rate = 0.78;
    msg.pitch = 0.45;
    msg.volume = 1;
    msg.lang = "de-DE";

    const voices = window.speechSynthesis.getVoices();

    // Deutsche Stimme suchen
    const voice =
        voices.find(v =>
            v.lang && v.lang.toLowerCase() === "de-de"
        ) ||
        voices.find(v =>
            v.lang && v.lang.toLowerCase().startsWith("de")
        );

    if (voice) {
        msg.voice = voice;
        msg.lang = voice.lang;
    }

    window.speechSynthesis.speak(msg);
}


// Stimmen laden
window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
};


// Sprachsteuerung
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

            if (typeof sendText === "function") {
                sendText();
            } else {
                console.error("sendText() wurde nicht gefunden.");
            }
        }
    };

    recognition.onerror = function(event) {
        status.innerHTML = "Mikrofonfehler: " + event.error;
        console.error("Speech Recognition Fehler:", event.error);
    };

    recognition.onend = function() {
        console.log("Spracherkennung beendet.");
    };

    recognition.start();
}
