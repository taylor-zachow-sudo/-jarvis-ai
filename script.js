const status = document.getElementById("status");

let recognition = null;

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
        alert("Dein Browser unterstützt keine Spracherkennung.");
        return;
    }

    recognition = new Recognition();

    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    status.innerHTML = "🎤 JARVIS HÖRT ZU...";

    recognition.onresult = function(event) {

        const text =
            event.results[0][0].transcript;

        status.innerHTML = "Du: " + text;

        const input =
            document.getElementById("userInput");

        if (input) {
            input.value = text;
            sendText();
        }
    };

    recognition.onerror = function(event) {

        console.log("Spracherkennung Fehler:", event.error);

        status.innerHTML =
            "Mikrofonfehler: " + event.error;
    };

    recognition.onend = function() {
        console.log("Spracherkennung beendet");
    };

    try {
        recognition.start();
    } catch (error) {
        console.log(error);
    }
}
