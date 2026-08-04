const status = document.getElementById("status");


function speak(text) {

    status.innerHTML = "JARVIS: " + text;

    if (!window.speechSynthesis) {
        alert("Dein Browser unterstützt keine Sprachausgabe.");
        return;
    }

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "de-DE";
    msg.rate = 0.85;
    msg.pitch = 0.7;
    msg.volume = 1;

    // Stimmen laden
    let voices = window.speechSynthesis.getVoices();

    let voice = voices.find(function(v) {
        return v.lang && v.lang.toLowerCase().startsWith("de");
    });

    if (voice) {
        msg.voice = voice;
    }

    window.speechSynthesis.speak(msg);
}


// iPhone/Safari lädt Stimmen manchmal erst später
window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
};


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

        const text =
            event.results[0][0].transcript;

        status.innerHTML = "Du: " + text;

        const input =
            document.getElementById("userInput");

        if (input) {

            input.value = text;

            sendText();

        } else {

            const answer = jarvisReply(text);

            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );

            speak(answer);
        }
    };
}
