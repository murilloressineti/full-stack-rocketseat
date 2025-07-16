import dayjs from "dayjs";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js"
import { hoursLoad } from "../form/hours-load.js";

const selectedDateSchedule = document.getElementById("date-schedule");

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual dentro dos agendamentos.
selectedDateSchedule.value = inputToday;

// Seleciona o input de data.
const selectedDate = document.getElementById("date");

export async function schedulesDay() {
  // Obtém a data do input.
  const date = selectedDate.value;

  // Busca na API os agendamentos.
  const dailySchedules = await scheduleFetchByDay({ date });
  
  // Exibe os agendamentos.
  schedulesShow( { dailySchedules })

  // Renderiza as horas disponíveis.
  hoursLoad({ date, dailySchedules });
}

// Exporta a data atual para ser usada no formulário
export { inputToday };
