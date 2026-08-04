const status = document.getElementById("status");

let voiceMode = false;
let recognition = null;

function speak(text, afterSpeak = null) {

    status.innerHTML = "JARVIS: " + text;

    if (!window.speechSynthesis) {
        if (afterSpeak) afterSpeak();
        return;
    }

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "de-DE";
    msg.rate = 0.82;
    msg.pitch = 0.65;
    msg.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const germanVoice = voices.find(v =>
        v.lang && v.lang.toLowerCase().startsWith("de")
    );

    if (germanVoice) {
        msg.voice = germanVoice;
    }

    if (afterSpeak) {
        msg.onend = afterSpeak;
    }

    window.speechSynthesis.speak(msg);
}


function startVoiceMode() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {
        alert("Dein iPhone-Browser unterstützt diesen Sprachmodus nicht.");
        return;
    }

    voiceMode = true;

    recognition = new Recognition();

    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = function() {
        status.innerHTML = "🎤 JARVIS HÖRT ZU...";
    };

    recognition.onresult = function(event) {

        const text =
            event.results[0][0].transcript;

        const input =
            document.getElementById("userInput");

        if (input) {
            input.value = text;
            sendText();
        }
    };

    recognition.onerror = function(event) {

        console.log("Spracherkennung:", event.error);

        if (voiceMode) {
            setTimeout(listenAgain, 1000);
        }
    };

    recognition.onend = function() {

        if (voiceMode) {
            setTimeout(listenAgain, 800);
        }
    };

    listenAgain();
}


function listenAgain() {

    if (!voiceMode || !recognition) return;

    try {
        recognition.start();
    } catch (error) {
        console.log("Mikrofon bereits aktiv");
    }
}


function stopVoiceMode() {

    voiceMode = false;

    if (recognition) {
        recognition.stop();
    }

    status.innerHTML = "SYSTEM ONLINE";
}
