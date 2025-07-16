export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available");
  console.log(hours);

  hours.forEach((available) => {
    available.addEventListener("click", (selected) => {
      // Remove a classe hour-selected de todas as li não selecionadas.
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected");
      });

      // Adiciona a classe na li clciada.
      selected.target.classList.add("hour-selected");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos do DOM necessários
  const timePickerContainer = document.querySelector(".time-picker-container");
  const customTimeInput = document.querySelector(".custom-time-input");
  const hoursList = document.getElementById("hours");
  const displayTime = document.getElementById("display-time");

  // Verifica se todos os elementos existem antes de prosseguir
  if (!timePickerContainer || !customTimeInput || !hoursList || !displayTime) {
    return;
  }

  // Evento de clique no campo de horário personalizado
  customTimeInput.addEventListener("click", (event) => {
    // Evita que o clique se propague para outros elementos
    event.stopPropagation();

    // Verifica se a lista de horários está expandida
    const isExpanded = customTimeInput.getAttribute("aria-expanded") === "true";

    // Alterna a visibilidade da lista de horários
    hoursList.classList.toggle("visible");

    // Atualiza o atributo aria-expanded para refletir o novo estado
    customTimeInput.setAttribute("aria-expanded", !isExpanded);
  });

  // Evento de clique na lista de horários
  hoursList.addEventListener("click", (event) => {

    // Verifica se o elemento clicado é um horário (e não uma área vazia da lista)
    const targetHour = event.target.closest(".hour");

    // Se for um horário válido e disponível
    if (targetHour && !targetHour.classList.contains("hour-unavailable")) {

      // Remove a seleção anterior, se houver
      const currentlySelected = hoursList.querySelector(".hour-selected");
      if (currentlySelected) {
        currentlySelected.classList.remove("hour-selected");
      }

      // Adiciona a classe "hour-selected" ao novo horário selecionado
      targetHour.classList.add("hour-selected");

      // Obtém o valor do horário selecionado (pode ser do atributo ou do texto)
      const selectedTime =
        targetHour.getAttribute("value") || targetHour.textContent.trim();

      // Exibe o horário selecionado no campo de exibição
      displayTime.textContent = selectedTime;

      // Oculta a lista de horários após a seleção
      hoursList.classList.remove("visible");
      customTimeInput.setAttribute("aria-expanded", "false");
    }
  });

  // Evento global para fechar a lista de horários ao clicar fora dela
  document.addEventListener("click", (event) => {
    // Se o clique ocorreu fora do container e a lista está visível
    if (
      !timePickerContainer.contains(event.target) &&
      hoursList.classList.contains("visible")
    ) {
      // Oculta a lista de horários
      hoursList.classList.remove("visible");
      customTimeInput.setAttribute("aria-expanded", "false");
    }
  });
});
