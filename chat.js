const chatHistory = [];

function jarvisReply(message) {

    message = message.toLowerCase();

    if (message.includes("hallo")) {
        return "Hallo! Schön, dass du da bist.";
    }

    if (message.includes("wie geht")) {
        return "Mir geht es hervorragend. Ich bin bereit, dir zu helfen.";
    }

    if (message.includes("wie heißt du")) {
        return "Ich bin JARVIS.";
    }

    if (message.includes("wer hat dich gebaut")) {
        return "Ich werde gerade von Taylor und ChatGPT entwickelt.";
    }

    if (message.includes("uhr")) {
        const d = new Date();
        return "Es ist " + d.getHours() + ":" +
        String(d.getMinutes()).padStart(2,"0");
    }

    if (message.includes("datum")) {
        return new Date().toLocaleDateString("de-DE");
    }

    return "Das weiß ich noch nicht. Aber ich lerne ständig dazu.";
}

function sendMessage(text){

    const answer = jarvisReply(text);

    speak(answer);

    chatHistory.push({
        user:text,
        jarvis:answer
    });

}
