let API = "http://localhost:8000/contactbook";

let name = document.querySelector("#name");
let surname = document.querySelector("#surname");
let number = document.querySelector("#number");
let email = document.querySelector("#email");
let image = document.querySelector("#image");
let btnAdd = document.querySelector("#btn-add");
console.log(name, surname, number, email, image, btnAdd);
let list = document.querySelector(".list");
getContacts();

btnAdd.addEventListener("click", async function () {
  let obj = {
    name: name.value,
    surname: surname.value,
    number: number.value,
    email: email.value,
    image: image.value,
  };
  // проверка на заполненность
  if (
    !obj.name.trim() ||
    !obj.surname.trim() ||
    !obj.number.trim() ||
    !obj.email.trim() ||
    !obj.image.trim()
  ) {
    alert("заполните все поля");
    return;
  }
  //   отправляем post запрос
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  // очищаем инпуты после добавления
  name.value = "";
  surname.value = "";
  number.value = "";
  email.value = "";
  image.value = " ";
});
async function getContacts() {
  try {
    // получаем данные с бека
    let res = await fetch(API);
    // обрабатываем ответ от сервера
    let contacts = await res.json();
    // вызываем функцию для отображения
    console.log(contacts);
    render(contacts);
  } catch (error) {
    console.log(error);
  }
}

function render(data) {
  list.innerHTML = "";

  data.forEach((item) => {
    list.innerHTML += `<li class="list-group-item d-flex align-items column ">
    <p>${item.name}</p>
    <p>${item.surname}</p>
    <p>${item.number}</p>
    <p>${item.email}</p>
    <img src=${item.image}  image.height = 156;
    image.width = 156;
    <div>
    <button onclick="deleteTodo()" class="btn btn-danger">delete</button>
    <button onclick = "editTodo()"class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button></div>
    </li> `;
  });
}
getContacts();

async function deletegetContacts(id) {
  try {
    await fetch(`${API}/${id}`, { method: "Delete" });
    getTodos();
  } catch (error) {
    console.log(error);
  }
}
// редактирование todo
let inpEdit = document.querySelector(".inp-edit");
let saveBtn = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");
// console.log(inpEdit, saveBtn, editModal);

let editedObj = {};

inpEdit.addEventListener("input", (e) => {
  editedObj = { todo: e.target.value };
  console.log(editedObj);
});

async function editTodo(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();
    inpEdit.value = objToEdit.todo;
    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}

// save changes
saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  // console.log(e.target);
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset = utf-8",
      },
      body: JSON.stringify(editedObj),
    });
  } catch (error) {
    console.log(error);
  }
  getTodos(); //ЧТОБЫ ОТОБРАЗИЛСЯ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide;
});
