document.addEventListener("DOMContentLoaded", () => {
  const itemList = document.getElementById("item-list");
  const alertBox = document.getElementById("alert");
  const closeAlertBtn = document.getElementById("close-alert");
  const addItemForm = document.getElementById("add-item-form");
  const itemInput = document.getElementById("item-input");

  // 1. Marcar/desmarcar item
  itemList.addEventListener("change", (event) => {
    if (event.target.classList.contains("custom-checkbox")) {
      const item = event.target.closest("li");
      const text = item.querySelector(".item-text");

      const isChecked = event.target.checked;
      text.style.textDecoration = isChecked ? "line-through" : "none";
      text.style.opacity = isChecked ? "0.6" : "1";
    }
  });

  // 2. Remover item e mostrar alerta
  itemList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
      const item = deleteBtn.closest("li");
      item.remove();
      showAlert();
    }
  });

  // 3. Adicionar novo item
  addItemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = itemInput.value.trim();
    if (text !== "") {
      const newItem = createItem(text);
      itemList.appendChild(newItem);
      itemInput.value = "";
    }
  });

  // 4. Fechar alerta manualmente
  closeAlertBtn.addEventListener("click", hideAlert);

  // Função: mostra o alerta com animação
  function showAlert() {
    alertBox.classList.remove("hidden");

    // Força reflow para reiniciar a animação
    void alertBox.offsetWidth;

    alertBox.classList.add("show");

    // Autoesconde depois de 3 segundos
    setTimeout(() => {
      hideAlert();
    }, 3000);
  }

  // Função: oculta o alerta com delay da transição
  function hideAlert() {
    alertBox.classList.remove("show");

    // Espera a animação terminar para esconder de fato
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 300); // mesmo tempo que o `transition` no CSS
  }

  // Cria novo item <li> com checkbox e label associada
  function createItem(text) {
    const li = document.createElement("li");

    const checkboxId = `checkbox-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    li.innerHTML = `
      <div class="item-wrapper">
        <input type="checkbox" class="custom-checkbox" id="${checkboxId}" />
        <label for="${checkboxId}" class="item-text">${text}</label>
      </div>
      <button class="delete-btn">
        <img src="assets/icons/bin.svg" alt="Ícone de lixeira" />
      </button>
    `;

    return li;
  }
});
