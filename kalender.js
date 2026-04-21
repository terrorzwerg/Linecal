import { generateTimeline } from "./schedule.js";

function getMonday(date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
}

export default function handler(req, res) {
  const startDate = getMonday(new Date());
  const line = String(req.query?.line || "A").toUpperCase();
  const timeline = generateTimeline({
    start: startDate,
    days: 7,
    line
  });

  const response = {
    meta: {
      generatedAt: new Date().toISOString(),
      start: startDate.toISOString().split("T")[0],
      days: 7,
      line
    },
    timeline: timeline.map((entry) => ({
      tag: entry.day,
      datum: entry.dayNumber,
      date: entry.date,
      shift: entry.shift,
      highlight: entry.date === new Date().toISOString().split("T")[0]
    }))
  };

  res.status(200).json(response);
}