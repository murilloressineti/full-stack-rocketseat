export const MORNING_TIMES = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
];

export const AFTERNOON_TIMES = [
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export const NIGHT_TIMES = ["19:00", "20:00", "21:00", "22:00", "23:00"];

export const ALL_TIMES = [...MORNING_TIMES, ...AFTERNOON_TIMES, ...NIGHT_TIMES];

export const SCHEDULE_SECTIONS = [
  { label: "MANHÃ", times: MORNING_TIMES },
  { label: "TARDE", times: AFTERNOON_TIMES },
  { label: "NOITE", times: NIGHT_TIMES },
];
