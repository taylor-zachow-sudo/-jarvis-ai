const status = document.getElementById("status");

function speak(text) {
    status.innerHTML = "JARVIS: " + text;

    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    // JARVIS-Stil
    msg.rate = 0.82;
    msg.pitch = 0.55;
    msg.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    // Bevorzugt eine britische männliche Stimme
    const voice =
        voices.find(v =>
            v.name.toLowerCase().includes("daniel")
        ) ||
        voices.find(v =>
            v.lang && v.lang.toLowerCase() === "en-gb"
        ) ||
        voices.find(v =>
            v.lang && v.lang.toLowerCase().startsWith("en")
        );

    if (voice) {
        msg.voice = voice;
    }

    msg.lang = voice ? voice.lang : "en-GB";

    window.speechSynthesis.speak(msg);
}v


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
