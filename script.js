/*=====
DARKMODE
=====*/
const toggleTheme = document.getElementById("theme-toggle");

toggleTheme.addEventListener("click", () => {
  const active = document.body.classList.toggle("darkmode");
  localStorage.setItem("dark", active ? "active" : "null");
});

if (localStorage.getItem("dark") === "active") {
  document.body.classList.add("darkmode");
}

/*=====
COUNTER
=====*/

const minusBtn = document.getElementById("minus");
const minus5Btn = document.getElementById("minus-5");
const plusBtn = document.getElementById("plus");
const plus5Btn = document.getElementById("plus-5");
const resetBtn = document.getElementById("reset");
const displayNumber = document.getElementById("display-number");

let count = 0;

function updateDisplay() {
  displayNumber.textContent = count;

  displayNumber.classList.remove("green", "red");
  if (count > 0) {
    displayNumber.classList.add("green");
  } else if (count < 0) {
    displayNumber.classList.add("red");
  }

  if (count <= 0) {
    minusBtn.classList.add("inactive");
    minus5Btn.classList.add("inactive");
    minusBtn.disabled = true;
    minus5Btn.disabled = true;
  } else {
    minusBtn.classList.remove("inactive");
    minus5Btn.classList.remove("inactive");
    minusBtn.disabled = false;
    minus5Btn.disabled = false;
  }
}

updateDisplay();

plusBtn.addEventListener("click", () => {
  count += 1;
  updateDisplay();
});

plus5Btn.addEventListener("click", () => {
  count += 5;
  updateDisplay();
});

minusBtn.addEventListener("click", () => {
  count -= 1;
  updateDisplay();
});

minus5Btn.addEventListener("click", () => {
  count -= 5;
  updateDisplay();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});

/*======
COLOUR PICKER
=====*/

const colourDiv = document.getElementById("colour-con");
const colourBtn = document.getElementById("colour-pick");
const hexDiv = document.getElementById("hex-div");
const copyBtn = document.getElementById("copy");
const copyMsg = document.getElementById("copy-msg");
const historyDiv = document.getElementById("colour-history");
let hex = "#";
let colourChar = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
let colourHistory = [];
let uniHexCode = "";

colourBtn.addEventListener("click", () => {
  let newColourChar = "";

  for (let i = 0; i < 6; i++) {
    const arrayIndex = Math.floor(Math.random() * colourChar.length);
    const hexNum = colourChar[arrayIndex];
    newColourChar += hexNum;
  }
  const hexColour = hex + newColourChar;
  uniHexCode = hexColour;
  colourDiv.style.backgroundColor = hexColour;
  hexDiv.textContent = hexColour;

  colourHistory.push(hexColour);
  if (colourHistory.length > 5) {
    colourHistory.shift();
  }

  historyDiv.textContent = "";

  colourHistory.forEach((savedColour) => {
    const historyBox = document.createElement("div");
    historyBox.classList.add("history_box");
    historyBox.style.backgroundColor = savedColour;

    historyDiv.appendChild(historyBox);
  });
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(uniHexCode);
  copyMsg.classList.add("show");
  setTimeout(() => {
    copyMsg.classList.remove("show");
  }, 1500);
});

/*=====
FORM
=====*/

const form = document.getElementById("form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-button");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const successMsg = document.getElementById("success-msg");
const listCon = document.getElementById("list-con");
const inputFields = document.querySelectorAll("form_inputs");

function uploadForm() {
  let nameValue = nameInput.value.trim();
  let emailValue = emailInput.value.trim();
  let passwordValue = passwordInput.value.trim();

  const passwordLength = passwordValue.length;
  const hash = "*".repeat(passwordLength);

  const listBox = document.createElement("div");
  listBox.classList.add("list_box");

  const h3One = document.createElement("h3");
  h3One.textContent = "NAME";
  listBox.appendChild(h3One);
  const pOne = document.createElement("p");
  pOne.textContent = `${nameValue}`;
  listBox.appendChild(pOne);

  const h3Two = document.createElement("h3");
  h3Two.textContent = "EMAIL";
  listBox.appendChild(h3Two);
  const pTwo = document.createElement("p");
  pTwo.textContent = `${emailValue}`;
  listBox.appendChild(pTwo);

  const h3Three = document.createElement("h3");
  h3Three.textContent = "PASSWORD";
  listBox.appendChild(h3Three);
  const pThree = document.createElement("p");
  pThree.textContent = `${hash}`;
  listBox.appendChild(pThree);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "<i class='ph ph-x'></i>";
  listBox.appendChild(deleteBtn);

  listCon.appendChild(listBox);

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  successMsg.textContent = "Success!";
  successMsg.classList.add("show");
  setTimeout(() => {
    successMsg.classList.remove("show");
  }, 2000);

  deleteBtn.addEventListener("click", () => {
    listBox.remove();
  });
}

function errorMessages() {
  if (nameInput.value === "") {
    nameError.textContent = `Name Required `;
    nameError.classList.add("show");
    setTimeout(() => {
      nameError.classList.remove("show");
    }, 1500);
    return;
  } else if (emailInput.value === "") {
    emailError.textContent = `Email Required`;
    emailError.classList.add("show");
    setTimeout(() => {
      emailError.classList.remove("show");
    }, 1500);
    return;
  } else if (
    !emailInput.value.includes("@") ||
    !emailInput.value.includes(".")
  ) {
    emailError.textContent = "Email must include '@' and '.'";
    emailError.classList.add("show");
    setTimeout(() => {
      emailError.classList.remove("show");
    }, 1500);
    return;
  } else if (passwordInput.value === "") {
    passwordError.textContent = `Password Required`;
    passwordError.classList.add("show");
    setTimeout(() => {
      passwordError.classList.remove("show");
    }, 1500);
    return;
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be 8 Characters";
    passwordError.classList.add("show");
    setTimeout(() => {
      passwordError.classList.remove("show");
    }, 1500);
    return;
  } else {
    uploadForm();
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  errorMessages();
});

/*=====
TODO APP v_1.0
=====*/

const inputField = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

function addTodo() {
  const inputData = inputField.value.trim();

  inputItem = document.createElement("li");
  inputItem.classList.add("input_item");
  inputItem.textContent = inputData;

  const inputDelete = document.createElement('button')
  inputDelete.classList.add("todo_delete)");
  inputDelete.textContent = "X";

  todoList.appendChild(inputItem);
  todoList.appendChild(inputDelete)

  inputField.value = "";
}

addBtn.addEventListener("click", () => {
  addTodo();
});

inputField.addEventListener("keypress", (e) => {
  if(e.key === 'Enter'){
    addTodo()
  }
});
