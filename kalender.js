import { generateTimeline, getHeader } from "../schedule.js"

export default function handler(req, res) {
  const { start, days, line } = req.query

  const startDate = start ? new Date(start) : new Date()
  const numDays = days ? parseInt(days) : 7
  const selectedLine = line || "A"

  const timeline = generateTimeline({
    start: startDate,
    days: numDays,
    line: selectedLine
  })

  const today = new Date().toISOString().split("T")[0] // Aktuelles Datum im Format 'YYYY-MM-DD'

  // Transformation der Timeline für Highlighting
  const formattedTimeline = timeline.map(entry => {
    const date = new Date(entry.date) // Erwarte 'date' ist in timeline enthalten
    const weekdayShort = date.toLocaleDateString('de-DE', { weekday: 'short' }) // Wochentag (Kurzform: "Mo", "Di")
    const dayNum = date.getDate() // Hol nur die Tageszahl
    const isToday = entry.date === today // Vergleiche mit aktuellem Datum
    return {
      tag: weekdayShort,
      datum: dayNum,
      highlight: isToday // Markiere aktuelle Tage
    }
  })

  const response = {
    meta: {
      generatedAt: new Date().toISOString(),
      start: startDate.toISOString().split("T")[0],
      days: numDays,
      line: selectedLine
    },
    header: getHeader(),
    timeline: formattedTimeline // Veränderte Timeline hinzufügen
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.status(200).json(response)
}