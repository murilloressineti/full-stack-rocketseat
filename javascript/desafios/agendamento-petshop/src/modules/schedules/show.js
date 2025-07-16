import dayjs from "dayjs";

// Seleciona as sessões manhã, tarde e noite.
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function schedulesShow({ dailySchedules }) {
  try {
    // Limpa as listas.
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    // Renderiza os agendamentos por período.
    dailySchedules.forEach((schedule) => {
      // Cria o elemento li para cada agendamento.
      const item = document.createElement("li");

      // Define a estrutura interna do elemento li.
      item.innerHTML = `
        <strong>${dayjs(schedule.when).format("HH:mm")}</strong>
        <span><b>${schedule.name}</b> / ${schedule.pet}</span>
        <span>${schedule.description}</span>
        <p>Remover agendamento</p>
      `;

      // Adiciona o id do agendamento como um atributo de data.
      item.setAttribute("data-id", schedule.id);

      // Obtém somente a hora do agendamento.
      const hour = dayjs(schedule.when).hour();

      // Renderiza o agendamento na sessão (manhã, tarde ou noite).
      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    alert("Não foi possível exibir os agendamentos.");
    console.error(error);
  }
}
