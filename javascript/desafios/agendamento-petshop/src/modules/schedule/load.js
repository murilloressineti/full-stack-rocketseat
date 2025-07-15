import dayjs from "dayjs";
import { hoursLoad } from "../form/hours-load.js";

const selectedDateSchedule = document.getElementById("date-schedule");

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual dentro dos agendamentos.
selectedDateSchedule.value = inputToday;

// Seleciona o input de data.
const selectedDate = document.getElementById("date");

export function schedulesDay() {
  // Obtém a data do input
  const date = selectedDate.value;

  // Renderiza as horas disponíveis.

  hoursLoad({ date });
}

// Exporta a data atual para ser usada no formulário
export { inputToday };
