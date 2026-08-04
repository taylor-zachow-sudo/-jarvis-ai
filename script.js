alert("Neue Version geladen");

const status = document.getElementById("status");

function speak(text) {
    status.innerHTML = "JARVIS: " + text;

    if (!("speechSynthesis" in window)) {
        return;
    }

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "de-DE";
    msg.rate = 0.85;
    msg.pitch = 0.65;
    msg.volume = 1;

    const voices = speechSynthesis.getVoices();

    const germanVoice = voices.find(voice =>
        voice.lang.toLowerCase().startsWith("de")
    );

    if (germanVoice) {
        msg.voice = germanVoice;
    }

    speechSynthesis.speak(msg);
}
}

function answer(text){

    text = text.toLowerCase();

    if(text.includes("hallo") || text.includes("hi")){
        speak("Hallo. Schön dich wieder zu sehen.");
    }

    else if(text.includes("wie heißt du")){
        speak("Ich bin Jarvis.");
    }

    else if(text.includes("wie spät")){
        const now = new Date();

        speak("Es ist " + now.getHours() + " Uhr " + now.getMinutes());
    }

    else if(text.includes("welcher tag")){
        const tage=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

        speak("Heute ist " + tage[new Date().getDay()]);
    }

    else if(text.includes("danke")){
        speak("Gern geschehen.");
    }

    else{
        speak("Das kann ich in Version Eins leider noch nicht.");
    }

}

function startJarvis(){

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(!Recognition){
        alert("Dein Browser unterstützt keine Spracheingabe.");
        return;
    }

    const recognition = new Recognition();

    recognition.lang="de-DE";

    recognition.start();

    recognition.onresult=function(event){

        const text = event.results[0][0].transcript;

        status.innerHTML="Du: "+text;

        sendMessage(text);



    };

}
