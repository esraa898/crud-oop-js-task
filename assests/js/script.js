const form = document.getElementById("form-input");
const addName = document.getElementById("name");
const addEmail = document.getElementById("email");
const addPhone = document.getElementById("phone");
const submit = document.getElementById("change");
const tableBody = document.querySelector(".table-body");
const idEdit = document.querySelector(".idedit");

class Todo {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  showTodo() {
    Todo.showHtml(this.id, this.name, this.email, this.phone);
    return this;
  }

  // store data in local storage
  storeToDo() {
    const allData = JSON.parse(localStorage.getItem("tasks")) ?? [];
    allData.push({
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
    localStorage.setItem("tasks", JSON.stringify(allData));
  }
  // show alldata from localstorage
  static showAllData() {
    if (localStorage.getItem("tasks")) {
      JSON.parse(localStorage.getItem("tasks")).forEach((item) => {
        Todo.showHtml(item.id, item.name, item.email, item.phone);
      });
    }
  }
  // updating data after edit
  updateTodo(id) {
    const newItem = {
      id: id,
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
    const updateData = JSON.parse(localStorage.getItem("tasks")).map((item) => {
      if ((item.id = id)) {
        return newItem;
      }
      return item;
    });
    localStorage.setItem("tasks", JSON.stringify(updateData));
    console.log(newItem);
  }
  // creating html data
  static showHtml(id, name, email, phone) {
    const trElment = document.createElement("tr");
    trElment.innerHTML = `
           <tr>
                <td>${name}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>
                <button class="del" data-id=${id}> Delete</button>
                <button class="edit"  data-id=${id}> Edit </button> 
                </td
           </tr>
           `;
    tableBody.appendChild(trElment);
  }
}

// calling all data from local storage
Todo.showAllData();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!idEdit.value) {
    let id = Math.floor(Math.random() * 10000);
    const newTodo = new Todo(id, addName.value, addEmail.value, addPhone.value);
    newTodo.showTodo().storeToDo();
  } else {
    const id = idEdit.value;
    const newedit = new Todo(id, addName.value, addEmail.value, addPhone.value);
    newedit.updateTodo(id);
    submit.innerHTML = ` <button type="submit" id="add"> Submit</button>`;
    tableBody.innerHTML = "";
    Todo.showAllData();
  }
  addName.value = "";
  addEmail.value = "";
  addPhone.value = "";
});

// delete empolyee
tableBody.addEventListener("click", (e) => {
  if (e.target.classList == "del") {
    // remove from localstorage
    let id = e.target.getAttribute("data-id");
    let emps = JSON.parse(localStorage.getItem("tasks"));
    let newData = emps.filter((item) => item.id != id);
    localStorage.setItem("tasks", JSON.stringify(newData));
    //  remove from Html
    e.target.parentElement.parentElement.remove();
  }
});

// edit data off empolyee
tableBody.addEventListener("click", (e) => {
  if (e.target.classList == "edit") {
    let id = e.target.getAttribute("data-id");
    let edit = JSON.parse(localStorage.getItem("tasks")).find(
      (item) => item.id == id
    );
    idEdit.value = id;
    addName.value = edit.name;
    addEmail.value = edit.email;
    addPhone.value = edit.phone;
    submit.innerHTML = ` <span><button class="edit"  data-id=${id}> Edit </button> <span>`;
  }
});
