import dayjs from "dayjs";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";

const selectedDateSchedule = document.getElementById("date-schedule");
const selectedDate = document.getElementById("date");

// Data atual formatada para inputs tipo `date`
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Define valor inicial
selectedDateSchedule.value = inputToday;

// Listener para quando o usuário alterar a data no calendário da agenda lateral
selectedDateSchedule.addEventListener("change", async () => {
  const date = selectedDateSchedule.value;

  // Atualiza também o input do formulário para manter sincronizado
  if (selectedDate) {
    selectedDate.value = date;
  }

  // Busca os agendamentos do dia escolhido
  const dailySchedules = await scheduleFetchByDay({ date });

  // Mostra os agendamentos
  schedulesShow({ dailySchedules });

  // Carrega os horários disponíveis
  hoursLoad({ date, dailySchedules });
});

// Essa função é usada no submit.js e quando a página carrega inicialmente
export async function schedulesDay() {
  const date = selectedDate.value;

  const dailySchedules = await scheduleFetchByDay({ date });

  schedulesShow({ dailySchedules });
  hoursLoad({ date, dailySchedules });
}

export { inputToday };
