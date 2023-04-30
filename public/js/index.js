const trs = document.querySelectorAll("tbody tr");

const form = document.getElementById("form");
const submit = document.getElementById("submit");

[...trs].forEach((tr) => {
  tr.addEventListener("click", (e) => {
    if (tr.id === e.target.dataset.id);

    submit.innerText = "Update";
    form.action = "/updateTask";
    console.log(form.action);
    [...tr.children].forEach((td) => {
      if (td.className === "taskname") {
        form[0].value = td.innerText;
      }
      if (td.className === "priority") {
        form[1].selectedIndex =
          td.innerText === "high"
            ? 1
            : td.innerText === "medium"
            ? 2
            : td.innerText === "low"
            ? 3
            : 0;
      }
      if (td.className === "date") {
        form[2].value = new Date(td.innerText).toISOString().slice(0, 10);
      }
      form[3].value = tr.id;
    });
  });
});
