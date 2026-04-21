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