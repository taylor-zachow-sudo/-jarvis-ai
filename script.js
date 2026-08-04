// ==========================================
// JARVIS - STIMME & SPRACHSTEUERUNG
// ==========================================

const status = document.getElementById("status");


// ==========================================
// JARVIS SPRICHT
// ==========================================

function speak(text) {

    console.log("JARVIS spricht:", text);

    if (!window.speechSynthesis) {
        console.error("Sprachausgabe wird nicht unterstützt.");
        return;
    }

    // Vorherige Sprachausgabe stoppen
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(text);

    // Sprache
    message.lang = "de-DE";

    // JARVIS-Stil
    message.rate = 0.78;
    message.pitch = 0.35;
    message.volume = 1.0;


    // ==========================================
    // STIMMEN SUCHEN
    // ==========================================

    const voices = window.speechSynthesis.getVoices();

    console.log("Verfügbare Stimmen:", voices);

    // Deutsche Stimmen
    const germanVoices = voices.filter(voice =>
        voice.lang &&
        voice.lang.toLowerCase().startsWith("de")
    );


    // Eine deutsche Stimme auswählen
    const selectedVoice =
        germanVoices.find(voice =>
            voice.name.toLowerCase().includes("male")
        ) ||
        germanVoices.find(voice =>
            voice.name.toLowerCase().includes("mann")
        ) ||
        germanVoices.find(voice =>
            voice.lang.toLowerCase() === "de-de"
        ) ||
        germanVoices[0];


    if (selectedVoice) {

        message.voice = selectedVoice;

        console.log(
            "JARVIS Stimme:",
            selectedVoice.name,
            selectedVoice.lang
        );
    }


    // ==========================================
    // SPRACHSTATUS
    // ==========================================

    message.onstart = function() {

        console.log("JARVIS beginnt zu sprechen.");

        if (status) {
            status.innerHTML = "🔊 JARVIS SPRICHT...";
        }
    };


    message.onend = function() {

        console.log("JARVIS ist fertig.");

        if (status) {
            status.innerHTML = "SYSTEM ONLINE";
        }
    };


    message.onerror = function(event) {

        console.error(
            "Sprachfehler:",
            event.error
        );

        if (status) {
            status.innerHTML = "SYSTEM ONLINE";
        }
    };


    // Sprechen
    window.speechSynthesis.speak(message);
}


// ==========================================
// STIMMEN NACHLADEN
// ==========================================

if ("speechSynthesis" in window) {

    window.speechSynthesis.onvoiceschanged = function() {

        const voices =
            window.speechSynthesis.getVoices();

        console.log(
            "Stimmen geladen:",
            voices
        );
    };
}


// ==========================================
// MIKROFON / JARVIS AKTIVIEREN
// ==========================================

function startJarvis() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    // Browser unterstützt Mikrofon nicht
    if (!SpeechRecognition) {

        alert(
            "Die Spracherkennung wird von deinem Browser nicht unterstützt."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    // ==========================================
    // SPRACHEINSTELLUNGEN
    // ==========================================

    recognition.lang = "de-DE";

    recognition.interimResults = false;

    recognition.continuous = false;


    // ==========================================
    // JARVIS HÖRT ZU
    // ==========================================

    recognition.onstart = function() {

        console.log(
            "JARVIS hört zu."
        );

        if (status) {
            status.innerHTML =
                "🎤 JARVIS HÖRT ZU...";
        }
    };


    // ==========================================
    // SPRACHE ERKANNT
    // ==========================================

    recognition.onresult = function(event) {

        const text =
            event.results[0][0].transcript;


        console.log(
            "Du hast gesagt:",
            text
        );


        const input =
            document.getElementById("userInput");


        if (!input) {
            console.error(
                "userInput wurde nicht gefunden."
            );
            return;
        }


        // Erkannte Sprache ins Eingabefeld
        input.value = text;


        // Nachricht automatisch senden
        if (typeof sendText === "function") {

            sendText();

        } else {

            console.error(
                "sendText() wurde nicht gefunden."
            );
        }
    };


    // ==========================================
    // MIKROFONFEHLER
    // ==========================================

    recognition.onerror = function(event) {

        console.error(
            "Mikrofonfehler:",
            event.error
        );


        if (status) {

            status.innerHTML =
                "Mikrofonfehler: " +
                event.error;
        }
    };


    // ==========================================
    // MIKROFON BEENDET
    // ==========================================

    recognition.onend = function() {

        console.log(
            "JARVIS hört nicht mehr zu."
        );
    };


    // Mikrofon starten
    recognition.start();
}
