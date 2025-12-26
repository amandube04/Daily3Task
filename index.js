const checBoxList = document.querySelectorAll(".custom_checkbox");
const error_msg = document.querySelector(".error_goal");
const progressUpdate = document.querySelector(".progress_Value");
const goalContainers = document.querySelectorAll(".goal_container");

const InputField = document.querySelectorAll(".input_todo");

const allGoals = JSON.parse(localStorage.getItem("getAllGoals")) || {};

const qoutes = [];

const updateProgress = () => {
  const complete = document.querySelectorAll(
    ".goal_container.completed"
  ).length;
  const total = goalContainers.length;
  const percent = (complete / total) * 100;

  progressUpdate.style.width = `${percent}%`;
  progressUpdate.textContent = `${complete}/${total} Completed`;
};

checBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const InputField = checkBox.nextElementSibling;
    const hasValue = InputField.value.trim() !== "";
    if (!hasValue) {
      error_msg.style.display = "block";
      return;
    }
    error_msg.style.display = "none";
    checkBox.parentElement.classList.toggle("completed");
    const inputId = checkBox.nextElementSibling.id;
    if (!allGoals[inputId]) {
      allGoals[inputId] = {
        goal: checkBox.nextElementSibling.value,
        complete: false,
      };
    }
    allGoals[inputId].complete = !allGoals[inputId].complete;
    localStorage.setItem("getAllGoals", JSON.stringify(allGoals));
    updateProgress();
  });
});

InputField.forEach((input) => {
  input.value = allGoals[input.id]?.goal || "";
  if (allGoals[input.id]?.complete) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "") {
      error_msg.style.display = "none";
    }
  });
  input.addEventListener("input", (e) => {
    if (input.value.trim() !== "") {
      error_msg.style.display = "none";
    }
    if (allGoals[input.id]?.complete) {
      e.target.value = allGoals[input.id].goal;
      return;
    }
    allGoals[input.id] = {
      goal: input.value,
      complete: false,
    };
    localStorage.setItem("getAllGoals", JSON.stringify(allGoals));
  });
});

updateProgress();
