const status = document.getElementById("status");

function speak(text) {
    status.innerHTML = "JARVIS: " + text;

    if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "de-DE";
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
    }
}

function startJarvis() {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        speak("Dein Browser unterstützt keine Sprachsteuerung.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "de-DE";
    recognition.start();

    recognition.onresult = (event) => {

        const text = event.results[0][0].transcript.toLowerCase();

        status.innerHTML = "Du: " + text;

        if(text.includes("hallo")){
            speak("Hallo Taylor.");
        }
        else if(text.includes("hörst du")){
            speak("Ja. Ich höre dich.");
        }
        else if(text.includes("wie spät")){
            const now = new Date();
            speak(`Es ist ${now.getHours()} Uhr ${now.getMinutes()}.`);
        }
        else{
            speak("Ich habe verstanden: " + text);
        }

    };
}
