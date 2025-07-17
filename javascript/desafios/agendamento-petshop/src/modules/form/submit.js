import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";
import { inputToday } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const clientPet = document.getElementById("pet");
const clientPhone = document.getElementById("phone");
const clientDescription = document.getElementById("description");
const selectedDate = document.getElementById("date");

// Carrega a data atual dentro do formulário e define a data mínima como sendo a atual.
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de carregar a página.
  event.preventDefault();

  try {
    // Recuperando o nome do cliente.
    const name = clientName.value.trim();

    if (!name) {
      return alert("Informe o nome do cliente.");
    }

    // Recuperando o nome do pet do cliente.
    const pet = clientPet.value.trim();

    if (!pet) {
      return alert("Informe o nome do pet do cliente.");
    }

    // Recuperando o telefone do cliente.
    const phoneRaw = clientPhone.value.trim();
    const phone = phoneRaw.replace(/\s/g, "");
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!phone || !phone.match(phoneRegex)) {
      return alert(
        "Informe um número de telefone válido com DDD. Apenas números são permitidos, ex: 11912345678."
      );
    }

    // Recuperando a descrição do serviço.
    const description = clientDescription.value.trim();

    if (!description) {
      return alert("Informe a descrição do serviço");
    }

    // Recupera o horário selecionado.
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      return alert("Selecione um horário.");
    }

    // Recupera somente a hora.
    const [hour] = hourSelected.innerText.split(":");

    // Insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour");

    // Gera um ID
    const id = new Date().getTime();

    // Faz o agendamento.
    await scheduleNew({
      id,
      name,
      pet,
      phone,
      description,
      when,
    });

    // Recarrega os agendamentos.
    await schedulesDay();

    // Limpa os inputs
    clientName.value = "";
    clientPet.value = "";
    clientPhone.value = "";
    clientDescription.value = "";

    // Remove seleção de horário
    hourSelected.classList.remove("hour-selected");

    // Fecha o modal
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.classList.remove("show");

    // Volta para o topo suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });
    
  } catch (error) {
    alert("Não foi possível realizar o agendamento.");
    console.log(error);
  }
};
