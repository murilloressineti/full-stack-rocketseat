const amountInput = document.getElementById("amount");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const noRepeatCheckbox = document.getElementById("noRepeat");
const drawButton = document.getElementById("btn-draw");
const resultSection = document.getElementById("result");
const formSection = document.getElementById("form");
const numbersDisplay = document.querySelector(".numbers");
const drawAgainButton = document.getElementById("btn-again");

const LIMITS = {
  min: 1,
  max: 100,
  amount: 10,
};

[amountInput, minInput, maxInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
});

drawButton.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const min = Number(minInput.value);
  const max = Number(maxInput.value);
  const noRepeat = noRepeatCheckbox.checked;

  const errorMessage = validateInputs(amount, min, max, noRepeat);
  if (errorMessage) {
    alert(errorMessage);
    return;
  }

  const drawnNumbers = drawNumber(min, max, amount, noRepeat);
  renderNumbers(drawnNumbers);

  formSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const totalDelay = (drawnNumbers.length - 1) * 0.4;
  setTimeout(() => {
    drawAgainButton.classList.remove("hidden");
  }, totalDelay * 1000);
});

drawAgainButton.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  formSection.classList.remove("hidden");

  amountInput.value = "2";
  minInput.value = "1";
  maxInput.value = "100";
  noRepeatCheckbox.checked = false;
});

function validateInputs(amount, min, max, noRepeat) {
  if (!amountInput.value || !minInput.value || !maxInput.value)
    return "Preencha todos os campos corretamente.";

  if (isNaN(amount) || isNaN(min) || isNaN(max))
    return "Digite apenas números válidos.";

  if (min < LIMITS.min)
    return `O valor mínimo precisa ser pelo menos ${LIMITS.min}.`;

  if (max > LIMITS.max)
    return `O valor máximo não pode ultrapassar ${LIMITS.max}.`;

  if (amount > LIMITS.amount)
    return `Você pode sortear no máximo ${LIMITS.amount} números por vez.`;

  if (min >= max) return "O valor mínimo deve ser menor que o valor máximo.";

  if (amount < 1) return "Você precisa sortear pelo menos 1 número.";

  if (noRepeat && amount > max - min + 1)
    return "Quantidade de números maior do que o intervalo disponível sem repetições.";

  return null;
}

function drawNumber(min, max, amount, noRepeat) {
  const result = [];

  while (result.length < amount) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    if (noRepeat) {
      if (!result.includes(number)) result.push(number);
    } else {
      result.push(number);
    }
  }

  return result;
}

function renderNumbers(numbers) {
  numbersDisplay.innerHTML = "";
  drawAgainButton.classList.add("hidden");

  numbers.forEach((number, index) => {
    const span = document.createElement("span");
    span.classList.add("number");
    span.textContent = number;

    const delay = 0.5 + index * 0.5;
    span.style.animation = `popIn 0.6s ease-out forwards`;
    span.style.animationDelay = `${delay}s`;

    numbersDisplay.appendChild(span);
  });
}
