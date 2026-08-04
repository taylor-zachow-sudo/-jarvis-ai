const status = document.getElementById("status");


// ==================================================
// JARVIS SPRACHAUSGABE
// ==================================================

function speak(text) {

    console.log("JARVIS spricht:", text);

    if (status) {
        status.innerHTML = "🔊 JARVIS: " + text;
    }

    // Prüfen, ob der Browser Sprache unterstützt
    if (!("speechSynthesis" in window)) {
        alert("Dein Browser unterstützt keine Sprachausgabe.");
        return;
    }

    // Vorherige Sprache stoppen
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);


    // ==================================================
    // JARVIS STIMME EINSTELLUNGEN
    // ==================================================

    // Deutsch
    msg.lang = "de-DE";

    // Langsam und kontrolliert
    msg.rate = 0.78;

    // Sehr tief
    msg.pitch = 0.20;

    // Maximale Lautstärke
    msg.volume = 1.0;


    // ==================================================
    // DEUTSCHE STIMME AUSWÄHLEN
    // ==================================================

    const voices = window.speechSynthesis.getVoices();

    console.log("Verfügbare Stimmen:", voices);


    // Erst deutsche Stimmen suchen
    let germanVoices = voices.filter(v =>
        v.lang &&
        v.lang.toLowerCase().startsWith("de")
    );


    // Bevorzugte tiefe Stimmen
    const preferredVoice =
        germanVoices.find(v =>
            v.name.toLowerCase().includes("david")
        ) ||
        germanVoices.find(v =>
            v.name.toLowerCase().includes("markus")
        ) ||
        germanVoices.find(v =>
            v.name.toLowerCase().includes("male")
        ) ||
        germanVoices.find(v =>
            v.name.toLowerCase().includes("mann")
        ) ||
        germanVoices[0];


    if (preferredVoice) {

        msg.voice = preferredVoice;

        msg.lang = preferredVoice.lang;

        console.log(
            "JARVIS verwendet Stimme:",
            preferredVoice.name,
            preferredVoice.lang
        );
    }


    // ==================================================
    // SPRECHSTATUS
    // ==================================================

    msg.onstart = function() {

        console.log("JARVIS beginnt zu sprechen.");

        if (status) {
            status.innerHTML = "🔊 JARVIS SPRICHT...";
        }
    };


    msg.onend = function() {

        console.log("JARVIS ist fertig.");

        if (status) {
            status.innerHTML = "SYSTEM ONLINE";
        }
    };


    msg.onerror = function(event) {

        console.error(
            "JARVIS Sprachfehler:",
            event
        );

        if (status) {
            status.innerHTML = "❌ Sprachfehler";
        }
    };


    // ==================================================
    // JARVIS SPRECHEN
    // ==================================================

    window.speechSynthesis.speak(msg);
}



// ==================================================
// STIMMEN NACHLADEN
// ==================================================

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



// ==================================================
// JARVIS SPRACHSTEUERUNG
// ==================================================

function startJarvis() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    // Prüfen, ob Mikrofon unterstützt wird
    if (!Recognition) {

        alert(
            "Spracherkennung wird von diesem Browser nicht unterstützt."
        );

        return;
    }


    const recognition =
        new Recognition();


    // ==================================================
    // SPRACHEINSTELLUNGEN
    // ==================================================

    recognition.lang = "de-DE";

    recognition.interimResults = false;

    recognition.continuous = false;


    // ==================================================
    // JARVIS HÖRT ZU
    // ==================================================

    recognition.onstart = function() {

        console.log(
            "JARVIS hört zu..."
        );

        if (status) {

            status.innerHTML =
                "🎤 JARVIS HÖRT ZU...";
        }
    };


    // ==================================================
    // SPRACHE ERKANNT
    // ==================================================

    recognition.onresult = function(event) {

        const text =
            event.results[0][0].transcript;


        console.log(
            "Erkannt:",
            text
        );


        const input =
            document.getElementById(
                "userInput"
            );


        if (input) {

            input.value = text;


            // Nachricht automatisch senden
            if (typeof sendText === "function") {

                sendText();

            } else {

                console.error(
                    "sendText() wurde nicht gefunden."
                );
            }
        }
    };


    // ==================================================
    // MIKROFONFEHLER
    // ==================================================

    recognition.onerror = function(event) {

        console.error(
            "Mikrofonfehler:",
            event.error
        );


        if (status) {

            status.innerHTML =
                "❌ Mikrofonfehler: " +
                event.error;
        }
    };


    // ==================================================
    // SPRACHERKENNUNG BEENDET
    // ==================================================

    recognition.onend = function() {

        console.log(
            "Spracherkennung beendet."
        );
    };


    // ==================================================
    // MIKROFON STARTEN
    // ==================================================

    recognition.start();
}
