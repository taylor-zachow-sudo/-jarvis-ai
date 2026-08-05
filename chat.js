// ==========================================
// JARVIS AI - CHAT SYSTEM
// ==========================================


// ==========================================
// APP / WEBSEITE ÖFFNEN
// ==========================================

function openApp(url) {
    window.location.href = url;
}


// ==========================================
// WETTER ERKENNEN
// ==========================================

function getWeatherCity(text) {

    const lower = text.toLowerCase();

    if (
        !lower.includes("wetter") &&
        !lower.includes("temperatur") &&
        !lower.includes("regnet") &&
        !lower.includes("warm") &&
        !lower.includes("kalt")
    ) {
        return null;
    }

    const patterns = [
        "wetter in ",
        "wetter für ",
        "temperatur in ",
        "temperatur für ",
        "regnet es in ",
        "wie warm ist es in ",
        "wie kalt ist es in "
    ];

    for (const pattern of patterns) {

        const position = lower.indexOf(pattern);

        if (position !== -1) {

            const city =
                text.substring(
                    position + pattern.length
                ).trim();

            if (city) {
                return city;
            }
        }
    }

    return "Berlin";
}


// ==========================================
// RECHNEN
// ==========================================

function calculateMath(text) {

    let expression = text
        .toLowerCase()
        .replace(/rechne/g, "")
        .replace(/berechne/g, "")
        .replace(/was ist/g, "")
        .replace(/wie viel ist/g, "")
        .replace(/gleich/g, "")
        .trim();

    expression = expression
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/mal/g, "*")
        .replace(/geteilt durch/g, "/")
        .replace(/geteilt/g, "/")
        .replace(/durch/g, "/");

    // Nur einfache Zahlen und Rechenzeichen erlauben
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        return null;
    }

    try {

        const result = Function(
            '"use strict"; return (' +
            expression +
            ')'
        )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {
            return null;
        }

        return result;

    } catch (error) {

        return null;
    }
}


// ==========================================
// NOTIZEN
// ==========================================

function saveJarvisNote(note) {

    let notes = JSON.parse(
        localStorage.getItem("jarvisNotes") || "[]"
    );

    notes.push({
        text: note,
        time: new Date().toISOString()
    });

    localStorage.setItem(
        "jarvisNotes",
        JSON.stringify(notes)
    );
}


function getJarvisNotes() {

    const notes = JSON.parse(
        localStorage.getItem("jarvisNotes") || "[]"
    );

    if (notes.length === 0) {
        return "Du hast keine gespeicherten Notizen.";
    }

    let result = "Deine Notizen: ";

    notes.forEach(function(note, index) {

        result +=
            (index + 1) +
            ". " +
            note.text +
            ". ";

    });

    return result;
}


function clearJarvisNotes() {

    localStorage.removeItem("jarvisNotes");

    return "Alle Notizen wurden gelöscht.";
}


// ==========================================
// JARVIS ANTWORT
// ==========================================

function jarvisReply(text) {

    const originalText = text;

    const lower = text.toLowerCase().trim();


    // ==========================================
    // ERSTELLER
    // ==========================================

    if (
        lower.includes("wer hat dich erstellt") ||
        lower.includes("wer hat dich gemacht") ||
        lower.includes("wer hat dich programmiert") ||
        lower.includes("wer ist dein ersteller") ||
        lower.includes("wer ist dein entwickler")
    ) {

        return "Ich wurde von Taylor erstellt und programmiert.";
    }


    // ==========================================
    // NAME
    // ==========================================

    if (lower.includes("mein name ist ")) {

        const start =
            lower.indexOf("mein name ist ") + 14;

        const name =
            originalText.substring(start).trim();

        if (
            name &&
            typeof saveMemory === "function"
        ) {

            saveMemory("name", name);

            return (
                "Verstanden. " +
                name +
                ". Ich werde mir deinen Namen merken."
            );
        }
    }


    // ==========================================
    // NAME ABRUFEN
    // ==========================================

    if (
        lower.includes("wie heiße ich") ||
        lower.includes("kennst du meinen namen") ||
        lower.includes("was ist mein name")
    ) {

        if (typeof getMemory === "function") {

            const name =
                getMemory("name");

            if (name) {
                return "Du heißt " + name + ".";
            }
        }

        return "Du hast mir deinen Namen noch nicht mitgeteilt.";
    }


    // ==========================================
    // NAME VERGESSEN
    // ==========================================

    if (
        lower.includes("vergiss meinen namen") ||
        lower.includes("lösche meinen namen")
    ) {

        if (typeof deleteMemory === "function") {

            deleteMemory("name");
        }

        return "Verstanden. Dein Name wurde aus meinem Speicher gelöscht.";
    }


    // ==========================================
    // BEGRÜSSUNG
    // ==========================================

    if (
        lower === "hallo" ||
        lower === "hi" ||
        lower === "hey" ||
        lower.includes("guten morgen") ||
        lower.includes("guten abend")
    ) {

        let name = null;

        if (typeof getMemory === "function") {

            name = getMemory("name");
        }

        if (name) {

            return (
                "Guten Tag, " +
                name +
                ". Alle Systeme sind online."
            );
        }

        return (
            "Guten Tag. " +
            "Ich bin JARVIS. " +
            "Alle Systeme sind online."
        );
    }


    // ==========================================
    // WER BIST DU
    // ==========================================

    if (
        lower.includes("wie heißt du") ||
        lower.includes("wer bist du") ||
        lower.includes("was bist du")
    ) {

        return (
            "Ich bin JARVIS, " +
            "dein persönlicher digitaler Assistent."
        );
    }


    // ==========================================
    // SYSTEMSTATUS
    // ==========================================

    if (
        lower.includes("systemstatus") ||
        lower.includes("system status") ||
        lower.includes("wie ist der systemstatus") ||
        lower.includes("statusbericht")
    ) {

        return (
            "Systemdiagnose abgeschlossen. " +
            "Kernsysteme online. " +
            "Sprachmodul bereit. " +
            "Speicher aktiv. " +
            "Wettermodul bereit. " +
            "Alle wichtigen Systeme funktionieren."
        );
    }


    // ==========================================
    // SYSTEMDIAGNOSE
    // ==========================================

    if (
        lower.includes("diagnose") ||
        lower.includes("systemdiagnose")
    ) {

        return (
            "Ich führe eine Systemdiagnose durch. " +
            "Speicher: online. " +
            "Sprachausgabe: online. " +
            "Kommunikationssystem: online. " +
            "Wetterdaten: online. " +
            "Erinnerungssystem: online."
        );
    }


    // ==========================================
    // WIE GEHT ES DIR
    // ==========================================

    if (
        lower.includes("wie geht es dir") ||
        lower.includes("wie geht's dir")
    ) {

        return (
            "Alle Systeme funktionieren einwandfrei. " +
            "Danke der Nachfrage."
        );
    }


    // ==========================================
    // UHRZEIT
    // ==========================================

    if (
        lower.includes("wie spät") ||
        lower.includes("wie viel uhr") ||
        lower.includes("uhrzeit")
    ) {

        const now = new Date();

        return (
            "Es ist " +
            String(now.getHours()).padStart(2, "0") +
            " Uhr " +
            String(now.getMinutes()).padStart(2, "0") +
            "."
        );
    }


    // ==========================================
    // DATUM
    // ==========================================

    if (
        lower.includes("welches datum") ||
        lower.includes("welcher tag") ||
        lower === "datum" ||
        lower.includes("heutiges datum")
    ) {

        return (
            "Heute ist der " +
            new Date().toLocaleDateString("de-DE") +
            "."
        );
    }


    // ==========================================
    // APPS
    // ==========================================

    if (
        lower.includes("öffne youtube") ||
        lower.includes("starte youtube")
    ) {

        openApp("https://youtube.com");

        return "Ich öffne YouTube.";
    }


    if (
        lower.includes("öffne whatsapp") ||
        lower.includes("starte whatsapp")
    ) {

        openApp("https://wa.me/");

        return "Ich öffne WhatsApp.";
    }


    if (
        lower.includes("öffne spotify") ||
        lower.includes("starte spotify")
    ) {

        openApp("https://open.spotify.com");

        return "Ich öffne Spotify.";
    }


    if (
        lower.includes("öffne instagram") ||
        lower.includes("starte instagram")
    ) {

        openApp("https://instagram.com");

        return "Ich öffne Instagram.";
    }


    if (
        lower.includes("öffne tiktok") ||
        lower.includes("starte tiktok")
    ) {

        openApp("https://tiktok.com");

        return "Ich öffne TikTok.";
    }


    if (
        lower.includes("öffne google") ||
        lower.includes("starte google")
    ) {

        openApp("https://google.com");

        return "Ich öffne Google.";
    }


    // ==========================================
    // INTERNET SUCHE
    // ==========================================

    if (
        lower.startsWith("suche nach ") ||
        lower.startsWith("suche ")
    ) {

        let searchText = "";

        if (lower.startsWith("suche nach ")) {

            searchText =
                originalText.substring(11).trim();

        } else {

            searchText =
                originalText.substring(6).trim();
        }


        if (searchText) {

            openApp(
                "https://www.google.com/search?q=" +
                encodeURIComponent(searchText)
            );

            return (
                "Ich starte eine Internetsuche nach " +
                searchText +
                "."
            );
        }
    }


    // ==========================================
    // NOTIZ SPEICHERN
    // ==========================================

    if (
        lower.startsWith("notiere ") ||
        lower.startsWith("merke dir ")
    ) {

        let note = "";

        if (lower.startsWith("notiere ")) {

            note =
                originalText.substring(8).trim();

        } else {

            note =
                originalText.substring(10).trim();
        }


        if (note) {

            saveJarvisNote(note);

            return (
                "Verstanden. Ich habe mir notiert: " +
                note
            );
        }
    }


    // ==========================================
    // NOTIZEN ABRUFEN
    // ==========================================

    if (
        lower.includes("meine notizen") ||
        lower.includes("was hast du dir notiert") ||
        lower.includes("was hast du dir gemerkt")
    ) {

        return getJarvisNotes();
    }


    // ==========================================
    // NOTIZEN LÖSCHEN
    // ==========================================

    if (
        lower.includes("lösche meine notizen") ||
        lower.includes("vergiss meine notizen")
    ) {

        return clearJarvisNotes();
    }


    // ==========================================
    // CHAT LÖSCHEN
    // ==========================================

    if (
        lower.includes("lösche den chat") ||
        lower.includes("chat löschen") ||
        lower.includes("lösche alles")
    ) {

        const chat =
            document.getElementById("chat");

        if (chat) {
            chat.innerHTML = "";
        }

        return "Der Chat wurde gelöscht.";
    }


    // ==========================================
    // RECHNEN
    // ==========================================

    if (
        lower.includes("rechne") ||
        lower.includes("berechne") ||
        lower.includes("was ist ")
    ) {

        const result =
            calculateMath(text);

        if (result !== null) {

            return (
                "Das Ergebnis ist " +
                result +
                "."
            );
        }
    }


    // ==========================================
    // DANKE
    // ==========================================

    if (
        lower.includes("danke") ||
        lower.includes("dankeschön")
    ) {

        return "Sehr gerne.";
    }


    // ==========================================
    // TSCHÜSS
    // ==========================================

    if (
        lower.includes("tschüss") ||
        lower.includes("auf wiedersehen")
    ) {

        return "Auf Wiedersehen. Ich bleibe in Bereitschaft.";
    }


    // ==========================================
    // JARVIS AKTIV
    // ==========================================

    if (
        lower.includes("bist du da") ||
        lower.includes("jarvis bist du da")
    ) {

        return "Natürlich. Ich bin jederzeit für dich verfügbar.";
    }


    // ==========================================
    // BEREITSCHAFT
    // ==========================================

    if (
        lower.includes("bleib bereit") ||
        lower.includes("warte auf mich")
    ) {

        return "Verstanden. Ich bleibe in Bereitschaft.";
    }


    // ==========================================
    // STANDARD
    // ==========================================

    return (
        "Ich habe deine Anfrage verstanden. " +
        "Diese Funktion befindet sich noch in meiner Entwicklungsphase."
    );
}


// ==========================================
// NACHRICHT ANZEIGEN
// ==========================================

function addMessage(text, type) {

    const chat =
        document.getElementById("chat");

    if (!chat) {
        return;
    }

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    message.textContent =
        text;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;
}


// ==========================================
// NACHRICHT SENDEN
// ==========================================

async function sendText() {

    try {

        const input =
            document.getElementById("userInput");


        if (!input) {

            console.error(
                "JARVIS: userInput nicht gefunden."
            );

            return;
        }


        const text =
            input.value.trim();


        if (!text) {
            return;
        }


        // ======================================
        // USER NACHRICHT
        // ======================================

        addMessage(
            "Du: " + text,
            "user-message"
        );


        input.value = "";


        const lower =
            text.toLowerCase();


        // ======================================
        // ERINNERUNGEN
        // ======================================

        if (
            lower.includes("erinnere mich") ||
            lower.includes("erinner mich")
        ) {

            if (
                typeof createReminderFromText ===
                "function"
            ) {

                const answer =
                    createReminderFromText(text);

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                if (
                    typeof speak ===
                    "function"
                ) {
                    speak(answer);
                }

                if (
                    typeof enableNotifications ===
                    "function"
                ) {
                    enableNotifications();
                }

            } else {

                const answer =
                    "Das Erinnerungssystem ist nicht verfügbar.";

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                if (
                    typeof speak ===
                    "function"
                ) {
                    speak(answer);
                }
            }

            return;
        }


        // ======================================
        // ERINNERUNGEN ANZEIGEN
        // ======================================

        if (
            lower.includes("meine erinnerungen") ||
            lower.includes("welche erinnerungen") ||
            lower.includes("meine termine")
        ) {

            let answer;

            if (
                typeof getReminders ===
                "function"
            ) {

                answer =
                    getReminders();

            } else {

                answer =
                    "Das Erinnerungssystem ist nicht verfügbar.";
            }


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            if (
                typeof speak ===
                "function"
            ) {
                speak(answer);
            }

            return;
        }


        // ======================================
        // ERINNERUNGEN LÖSCHEN
        // ======================================

        if (
            lower.includes("lösche alle erinnerungen") ||
            lower.includes("vergiss alle erinnerungen")
        ) {

            let answer;

            if (
                typeof clearReminders ===
                "function"
            ) {

                answer =
                    clearReminders();

            } else {

                answer =
                    "Das Erinnerungssystem ist nicht verfügbar.";
            }


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            if (
                typeof speak ===
                "function"
            ) {
                speak(answer);
            }

            return;
        }


        // ======================================
        // WETTER
        // ======================================

        const city =
            getWeatherCity(text);


        if (city) {

            if (
                typeof getWeather !==
                "function"
            ) {

                const answer =
                    "Das Wettersystem ist nicht verfügbar.";

                addMessage(
                    "JARVIS: " + answer,
                    "jarvis-message"
                );

                if (
                    typeof speak ===
                    "function"
                ) {
                    speak(answer);
                }

                return;
            }


            const loading =
                "Einen Moment. Ich rufe die Wetterdaten ab.";


            addMessage(
                "JARVIS: " + loading,
                "jarvis-message"
            );


            if (
                typeof speak ===
                "function"
            ) {
                speak(loading);
            }


            const answer =
                await getWeather(city);


            addMessage(
                "JARVIS: " + answer,
                "jarvis-message"
            );


            if (
                typeof speak ===
                "function"
            ) {
                speak(answer);
            }

            return;
        }


        // ======================================
        // NORMALE JARVIS ANTWORT
        // ======================================

        const answer =
            jarvisReply(text);


        addMessage(
            "JARVIS: " + answer,
            "jarvis-message"
        );


        if (
            typeof speak ===
            "function"
        ) {

            speak(answer);
        }


    } catch (error) {

        console.error(
            "JARVIS Fehler:",
            error
        );


        const answer =
            "Es ist ein interner Systemfehler aufgetreten.";


        addMessage(
            "JARVIS: " + answer,
            "jarvis-message"
        );


        if (
            typeof speak ===
            "function"
        ) {

            speak(answer);
        }

    }
}


// ==========================================
// JARVIS BEREIT
// ==========================================

console.log(
    "JARVIS chat.js erfolgreich geladen."
);
