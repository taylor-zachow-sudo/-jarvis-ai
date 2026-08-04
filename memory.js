function saveMemory(key, value) {
    localStorage.setItem("jarvis_" + key, value);
}

function getMemory(key) {
    return localStorage.getItem("jarvis_" + key);
}

function deleteMemory(key) {
    localStorage.removeItem("jarvis_" + key);
}
