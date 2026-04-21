import { writeFileSync } from "node:fs";
import { generateTimeline } from "./schedule.js";

function getMonday(date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
}

function buildCalendarPayload(line = "A") {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const startDate = getMonday(now);
  const timeline = generateTimeline({
    start: startDate,
    days: 7,
    line: String(line).toUpperCase()
  });

  return {
    meta: {
      generatedAt: now.toISOString(),
      start: startDate.toISOString().split("T")[0],
      days: 7,
      line: String(line).toUpperCase()
    },
    timeline: timeline.map((entry) => ({
      tag: entry.day,
      datum: entry.dayNumber,
      date: entry.date,
      shift: entry.shift,
      highlight: entry.date === today
    }))
  };
}

function toTwoLineJson(payload) {
  const compact = JSON.stringify(payload);
  return compact.replace(",\"timeline\":", ",\n\"timeline\":");
}

const lineArg = process.argv[2] || "A";
const payload = buildCalendarPayload(lineArg);
writeFileSync("linienkalender.json", `${toTwoLineJson(payload)}\n`, "utf8");

console.log(`linienkalender.json aktualisiert (line=${String(lineArg).toUpperCase()})`);
