document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.querySelector(".button-schedule");
  const closeButton = document.querySelector(".close-button");
  const modalOverlay = document.querySelector(".modal-overlay");

  openButton.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
  });

  closeButton.addEventListener("click", (event) => {
    modalOverlay.classList.add("hidden");
  });
});
