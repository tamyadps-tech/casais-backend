// Gera um feed .ics assinável (via "Adicionar por URL" no Google Agenda,
// Apple Calendar ou Outlook). Foi a opção mais simples aqui porque não
// exige configurar OAuth do Google para a conta de cada um — Tamyris e
// Saulo só colam a URL do próprio feed (/api/calendar/:id.ics) no app de
// calendário deles e pronto, os lembretes de dica aparecem automaticamente.

function escapeIcsText(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function toIcsDate(dateStr, hour) {
  return `${dateStr.replace(/-/g, '')}T${String(hour).padStart(2, '0')}0000`;
}

function buildIcsFeed({ calendarName, timezone = 'America/Sao_Paulo', events }) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Casais App//Dicas de Relacionamento//PT-BR',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
    `X-WR-TIMEZONE:${timezone}`
  ];

  events.forEach((event) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.id}@casais-app`,
      `DTSTAMP:${toIcsDate(event.date, 0)}Z`,
      `DTSTART;TZID=${timezone}:${toIcsDate(event.date, event.hour || 9)}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
      `DESCRIPTION:${escapeIcsText(event.description || '')}`,
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

module.exports = { buildIcsFeed };
