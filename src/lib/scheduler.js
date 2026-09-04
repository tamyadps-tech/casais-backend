// Calendário de entregas: duas vezes por semana (segunda e quinta),
// começando hoje e indo até o fim de janeiro de 2027.

const START_DATE = process.env.TIPS_START_DATE || new Date().toISOString().slice(0, 10);
const END_DATE = process.env.TIPS_END_DATE || '2027-01-31';
const DELIVERY_WEEKDAYS = [1, 4]; // 1 = segunda, 4 = quinta (getDay())
const DELIVERY_HOUR = Number(process.env.TIPS_DELIVERY_HOUR || 9);

function toDateOnly(d) {
  return new Date(`${d}T00:00:00Z`);
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function generateScheduleDates(startDate = START_DATE, endDate = END_DATE) {
  const dates = [];
  const cursor = toDateOnly(startDate);
  const end = toDateOnly(endDate);

  while (cursor <= end) {
    if (DELIVERY_WEEKDAYS.includes(cursor.getUTCDay())) {
      dates.push(formatDate(cursor));
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

function nextPendingDate(deliveredDates, allDates = generateScheduleDates()) {
  const delivered = new Set(deliveredDates);
  const today = formatDate(new Date());
  return allDates.find((d) => d >= today.slice(0, 10) && !delivered.has(d)) || null;
}

function isDueToday(deliveredDates) {
  const today = formatDate(new Date());
  const dates = generateScheduleDates();
  return dates.includes(today) && !deliveredDates.includes(today);
}

module.exports = {
  START_DATE,
  END_DATE,
  DELIVERY_WEEKDAYS,
  DELIVERY_HOUR,
  generateScheduleDates,
  nextPendingDate,
  isDueToday
};
