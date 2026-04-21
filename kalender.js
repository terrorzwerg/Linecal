import { generateTimeline, getHeader } from "../lib/schedule.js"

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

  const response = {
    meta: {
      generatedAt: new Date().toISOString(),
      start: startDate.toISOString().split("T")[0],
      days: numDays,
      line: selectedLine
    },
    header: getHeader(),
    timeline
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.status(200).json(response)
}
