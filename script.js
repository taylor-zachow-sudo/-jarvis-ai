const status = document.getElementById("status");

function speak(text) {

    status.innerHTML = "JARVIS: " + text;

    if (!("speechSynthesis" in window)) {
        alert("Dein Browser unterstützt keine Sprachausgabe.");
        return;
    }

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "de-DE";
    msg.rate = 0.85;
    msg.pitch = 0.65;
    msg.volume = 1;

    speechSynthesis.speak(msg);
}


function startJarvis() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {
        alert("Dein Browser unterstützt keine Spracheingabe.");
        return;
    }

    const recognition = new Recognition();

    recognition.lang = "de-DE";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function(event) {

        const text = event.results[0][0].transcript;

        status.innerHTML = "Du: " + text;

        if (typeof sendText === "function") {

            const input = document.getElementById("userInput");

            if (input) {
                input.value = text;
                sendText();
            }

        } else {

            answer(text);

        }
    };
}
