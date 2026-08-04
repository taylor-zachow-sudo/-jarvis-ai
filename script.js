const status = document.getElementById("status");


function speak(text) {

    status.innerHTML = "JARVIS: " + text;

    if (!window.speechSynthesis) {
        return;
    }

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.rate = 0.82;
    msg.pitch = 0.65;
    msg.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    // Bevorzugt eine englische/britische Stimme
    const voice =
        voices.find(v => v.lang === "en-GB") ||
        voices.find(v => v.lang.startsWith("en-GB")) ||
        voices.find(v => v.lang.startsWith("en"));

    if (voice) {
        msg.voice = voice;
    }

    // Für britische Stimme
    msg.lang = "en-GB";

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
