import { schedulesDay } from "../schedule/load"

// Seleciona o input de data.
const selectedDate = document.getElementById("date")

// Recarrega a lista de horários quando o input de data mudar.
selectedDate.onchange = () => schedulesDay()