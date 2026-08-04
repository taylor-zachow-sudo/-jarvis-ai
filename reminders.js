// ==========================================
// JARVIS ERINNERUNGEN
// ==========================================

let reminders =
    JSON.parse(localStorage.getItem("jarvisReminders") || "[]");


// ==========================================
// ERINNERUNG SPEICHERN
// ==========================================

function saveReminder(text, time) {

    const reminder = {
        id: Date.now(),
        text: text,
        time: time
    };

    reminders.push(reminder);

    localStorage.setItem(
        "jarvisReminders",
        JSON.stringify(reminders)
    );

    return reminder;
}


// ==========================================
// ERINNERUNGEN ABRUFEN
// ==========================================

function getReminders() {

    if (reminders.length === 0) {
        return "Du hast keine Erinnerungen.";
    }

    let result = "Deine Erinnerungen: ";

    reminders.forEach((reminder, index) => {

        const date =
            new Date(reminder.time);

        result +=
            (index + 1) +
            ". " +
            reminder.text +
            " um " +
            date.toLocaleString("de-DE") +
            ". ";
    });

    return result;
}


// ==========================================
// ALLE ERINNERUNGEN LÖSCHEN
// ==========================================

function clearReminders() {

    reminders = [];

    localStorage.setItem(
        "jarvisReminders",
        JSON.stringify(reminders)
    );

    return "Alle Erinnerungen wurden gelöscht.";
}


// ==========================================
// ERINNERUNGEN PRÜFEN
// ==========================================

function checkReminders() {

    const now = Date.now();

    reminders.forEach(function(reminder) {

        if (
            !reminder.done &&
            now >= reminder.time
        ) {

            reminder.done = true;

            localStorage.setItem(
                "jarvisReminders",
                JSON.stringify(reminders)
            );

            const message =
                "Erinnerung: " +
                reminder.text;

            addMessage(
                "JARVIS: ⏰ " + message,
                "jarvis-message"
            );

            if (typeof speak === "function") {
                speak(message);
            }

            // Browser-Benachrichtigung
            if (
                "Notification" in window &&
                Notification.permission === "granted"
            ) {

                new Notification("JARVIS", {
                    body: message
                });
            }
        }
    });
}


// Jede Sekunde überprüfen
setInterval(
    checkReminders,
    1000
);


// ==========================================
// BENACHRICHTIGUNGEN ERLAUBEN
// ==========================================

function enableNotifications() {

    if (
        "Notification" in window &&
        Notification.permission !== "granted"
    ) {

        Notification.requestPermission();
    }
}
