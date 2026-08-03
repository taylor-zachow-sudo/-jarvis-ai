const status = document.getElementById("status");

function speak(text){
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "de-DE";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

function startJarvis(){

    status.innerHTML = "🎤 Ich höre zu...";

    const recognition =
        new(window.SpeechRecognition ||
             window.webkitSpeechRecognition)();

    recognition.lang = "de-DE";

    recognition.start();

    recognition.onresult = function(event){

        const text = event.results[0][0].transcript;

        status.innerHTML = "Du: " + text;

        if(text.includes("hallo")){
            speak("Hallo. Schön dich zu sehen.");
        }

        else if(text.includes("wie spät")){
            const now = new Date();
            speak("Es ist " +
                now.getHours() +
                " Uhr " +
                now.getMinutes());
        }

        else if(text.includes("wie heißt du")){
            speak("Ich bin Jarvis.");
        }

        else{
            speak("Das habe ich verstanden: " + text);
        }

    };

    recognition.onerror = function(){
        speak("Ich konnte dich leider nicht verstehen.");
    };

}
