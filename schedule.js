const rotation = ["A", "B", "C", "D", "OFF"]
const baseDate = new Date("2026-01-01")

const daysShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

export function getShiftForDate(date) {
  const diffDays = Math.floor(
    (date - baseDate) / (1000 * 60 * 60 * 24)
  )

  const index = ((diffDays % rotation.length) + rotation.length) % rotation.length
  return rotation[index]
}

export function generateTimeline({ start, days, line }) {
  const result = []

  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)

    const shift = getShiftForDate(d)

    result.push({
      date: d.toISOString().split("T")[0],
      day: daysShort[d.getDay()],
      dayNumber: d.getDate(),
      shift,
      active: shift === line
    })
  }

  return result
}

export function getHeader() {
  return daysShort
}
