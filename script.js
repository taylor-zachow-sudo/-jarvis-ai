const status = document.getElementById("status");

function speak(text) {

    console.log("JARVIS soll sprechen:", text);

    if (status) {
        status.innerHTML = "🔊 JARVIS: " + text;
    }

    if (!window.speechSynthesis) {
        alert("Dein Browser unterstützt keine Sprachausgabe.");
        return;
    }

    // Alte Sprache stoppen
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "de-DE";
    msg.rate = 0.85;
    msg.pitch = 0.6;
    msg.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    console.log("Gefundene Stimmen:", voices);

    const germanVoice =
        voices.find(v => v.lang === "de-DE") ||
        voices.find(v => v.lang.startsWith("de"));

    if (germanVoice) {
        msg.voice = germanVoice;
        console.log("Verwendete Stimme:", germanVoice.name);
    }

    msg.onstart = function() {
        console.log("JARVIS beginnt zu sprechen");
    };

    msg.onend = function() {
        console.log("JARVIS ist fertig");
    };

    msg.onerror = function(event) {
        console.error("Sprachfehler:", event);
        status.innerHTML = "❌ Sprachfehler";
    };

    window.speechSynthesis.speak(msg);
}


// Stimmen nachladen
window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
};


// Mikrofon
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
        console.error("Mikrofonfehler:", event.error);
    };

    recognition.start();
}
