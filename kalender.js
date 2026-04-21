
function getMonday(date) {
    const day = date.getDay(); // Wochentag (0 = Sonntag, 1 = Montag, ...)
    const diff = day === 0 ? -6 : 1 - day; // Montag als Referenz (bei Sonntag -6 Tage)
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday; // Gibt den Montag der aktuellen Woche zurück
}

const startDate = getMonday(new Date()); // Woche mit Montag starten
const today = new Date().toISOString().split("T")[0]; // Aktuelles Datum

// Generiere die Woche (Montag - Sonntag)
const timeline = generateTimeline({
    start: startDate,
    days: 7,
    line
});

// Unterscheide zwischen Highlights (heutiger Tag) und normalen Tagen
const highlights = timeline.filter(entry => entry.date === today);
const normalDays = timeline.filter(entry => entry.date !== today);

// Antwortstruktur anpassen
const response = {
    meta: {
        generatedAt: new Date().toISOString(),
        start: startDate.toISOString().split("T")[0],
        days: 7,
        line
    },
    highlights: highlights.map(entry => ({
        tag: entry.day,
        datum: entry.dayNumber
    })),
    normalDays: normalDays.map(entry => ({
        tag: entry.day,
        datum: entry.dayNumber
    }))
};
res.status(200).json(response);