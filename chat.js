const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3.2";

let conversation = [
    {
        role: "system",
        content:
            "Du bist JARVIS, ein intelligenter persönlicher Assistent. " +
            "Antworte auf Deutsch. Sei ruhig, höflich, intelligent und präzise. " +
            "Antworte natürlich wie in einem echten Gespräch. " +
            "Nenne dich selbst JARVIS."
    }
];


// ==================================================
// NACHRICHT INS CHATFENSTER
// ==================================================

function addMessage(text, type) {

    const chat = document.getElementById("chat");

    if (!chat) return;

    const message = document.createElement("div");

    message.className = "message " + type;
    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}


// ==================================================
// NACHRICHT SENDEN
// ==================================================

async function sendText() {

    const input =
        document.getElementById("userInput");

    if (!input) return;

    const text =
        input.value.trim();

    if (!text) return;

    // Benutzer-Nachricht anzeigen
    addMessage(
        "Du: " + text,
        "user-message"
    );

    input.value = "";

    // Gespräch speichern
    conversation.push({
        role: "user",
        content: text
    });


    // Status
    const status =
        document.getElementById("status");

    if (status) {
        status.innerHTML =
            "🧠 JARVIS DENKT...";
    }


    try {

        // Anfrage an Ollama
        const response =
            await fetch(OLLAMA_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    model: MODEL,

                    messages:
                        conversation,

                    stream: false
                })
            });


        if (!response.ok) {

            throw new Error(
                "Ollama Fehler: " +
                response.status
            );
        }


        const data =
            await response.json();


        const answer =
            data.message?.content;


        if (!answer) {

            throw new Error(
                "JARVIS hat keine Antwort erhalten."
            );
        }


        // Antwort speichern
        conversation.push({

            role: "assistant",

            content: answer
        });


        // Antwort anzeigen
        addMessage(
            "JARVIS: " + answer,
            "jarvis-message"
        );


        // Antwort sprechen
        speak(answer);


    } catch (error) {

        console.error(
            "KI Fehler:",
            error
        );


        const errorMessage =
            "Ich kann momentan keine Verbindung zu meinem KI-System herstellen.";


        addMessage(
            "JARVIS: " + errorMessage,
            "jarvis-message"
        );


        if (status) {

            status.innerHTML =
                "❌ KI nicht erreichbar";
        }
    }
}
