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
  const timePickerContainer = document.querySelector(".time-picker-container");
  const customTimeInput = document.querySelector(".custom-time-input");
  const hoursList = document.getElementById("hours");
  const displayTime = document.getElementById("display-time");

  if (!timePickerContainer || !customTimeInput || !hoursList || !displayTime) {
    return;
  }

  customTimeInput.addEventListener("click", (event) => {
    event.stopPropagation();
    const isExpanded = customTimeInput.getAttribute("aria-expanded") === "true";

    hoursList.classList.toggle("visible");

    customTimeInput.setAttribute("aria-expanded", !isExpanded);
  });

  hoursList.addEventListener("click", (event) => {
    const targetHour = event.target.closest(".hour");

    if (targetHour && !targetHour.classList.contains("hour-unavailable")) {
      const currentlySelected = hoursList.querySelector(".hour-selected");
      if (currentlySelected) {
        currentlySelected.classList.remove("hour-selected");
      }

      targetHour.classList.add("hour-selected");

      const selectedTime =
        targetHour.getAttribute("value") || targetHour.textContent.trim();

      displayTime.textContent = selectedTime;

      hoursList.classList.remove("visible");
      customTimeInput.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !timePickerContainer.contains(event.target) &&
      hoursList.classList.contains("visible")
    ) {
      hoursList.classList.remove("visible");
      customTimeInput.setAttribute("aria-expanded", "false");
    }
  });
});
