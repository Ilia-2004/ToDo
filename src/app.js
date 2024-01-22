//#region Импортирование
// импортирование html-страницы
import "./index.html";
// импортирование scss-страницы
import "./style.scss";
//#endregion

//#region Константы
/* константы из header */
// поиск заметок
const mainHeaderSearch = document.querySelector(".main-header-search");
// строка ввода текста поиска заметок
const searchInputHeader = document.querySelector(".main-header-search-input");
// кнопка очистки поля ввода поиска зметок
const btnCloseSearch = document.querySelector("#btn-close-search");

/* константы из menu */
// меню
const menu = document.querySelector(".menu");
// кнопка меню
const menuBtn = document.querySelector(".btn-menu");
// страницы меню
const menuPages = document.querySelector("#menu-pages");
// кнопка переключения страниц меню
const btnMenuPages = document.querySelectorAll(".btn-menu-pages");
// тект кнопки страниц
const textBtn = document.querySelectorAll(".text-btn");

/* константы из field */
// поля заметок
const fields = document.querySelectorAll(".field");
// поле ввода заметки
const fieldInput = document.querySelector(".main-field-add-input");
// кнопка очистки поля ввода
const btnCloseField = document.querySelector("#btn-close-field");
// кнопка создания заметки
const btnCreateNotes = document.querySelector("#btn-create-notes");

/* константы из notes */
// поле ввода элемента
const inputElement = document.querySelector(".main-field-add-input");
// список заметок
const listElement = document.querySelector("#list");
// блок закреплённых заметок
const mainFieldFixed = document.querySelector("#main-field-fixed");
// список закреплённых заметок
const listElementFixed = document.querySelector("#list-fixed");
// кнопка редактирования заметки
const editBtn = document.querySelectorAll(".edit");
// текст заметки
const text = document.querySelectorAll(".text");
//#endregion

//#region Header
/* кнопка очистки поиска */
searchInputHeader.addEventListener("input", () => {
  // если текст в поле ввода есть
  if (searchInputHeader.value.length !== 0) {
    // изменение display кнопки очистки с none на block
    btnCloseSearch.style.display = "block";
    // установление padding для поиска
    mainHeaderSearch.style.padding = "0 0 0 0";
  }
  // если текста нет
  else {
    // установка display кнопка none
    btnCloseSearch.style.display = "none";
    // установка специального отступа
    mainHeaderSearch.style.padding = "0 54px 0 0";
  }
});

/* кнопки очистки поля ввода поиска */
btnCloseSearch.addEventListener("click", () => {
  // очистка поля ввода
  searchInputHeader.value = "";
  // установка display кнопка none
  btnCloseSearch.style.display = "none";
  // установка специального отступа
  mainHeaderSearch.style.padding = "0 54px 0 0";
});
//#endregion

//#region Menu
/* кноика меню */
menuBtn.addEventListener("click", () => {
  // если ширина кнопки не "100px"
  if (menu.style.width !== "100px")
    // вызываем фунцкию изменения меню с параметрами 1
    changeMenu(100, 70, "efefef", "none");
  // иначе вызываем функцию изменения меню с параметрами 2
  else changeMenu(280, 180, "fff", "block");
});

/* функция изменения меню */
function changeMenu(widthMenu, widthBtn, background, display) {
  // изменение ширины меню
  menu.style.width = `${widthMenu}px`;
  // изменение фонового цвета меню
  menu.style.background = `#${background}`;
  // изменение ширины каждой кнопки из меню
  btnMenuPages.forEach((btn) => (btn.style.width = `${widthBtn}px`));
  // изменение display каждого текста кнопок из меню
  textBtn.forEach((btn) => (btn.style.display = `${display}`));
}

/* переключение между страницами меню */
menuPages.addEventListener("click", (event) => {
  // присваивание родительского элемента кнопки
  const buttonField = event.target.closest("button");

  // если такого нет, то выходим из функции
  if (!buttonField) return;

  // присваивание id перелючателя
  const dataId = +buttonField.dataset.id;

  // проход по каждой кнопке меню
  btnMenuPages.forEach((btn) => {
    // присваивание id кнопки
    const btnId = +btn.dataset.id;
    // если id кнопки совпадает с id переключателя
    if (btnId === dataId)
      // присваивается необходимый фоновый цвет кнопки
      btn.style.background = "#e1e8f1";
    // иначе убираем фоновый цвет
    else btn.style.background = "none";
  });

  // проходим по каждой странице
  fields.forEach((field) => {
    // присваиваем id страницы
    const fieldId = +field.dataset.id;
    // если id страницы совпадает с id кнопки
    if (fieldId === dataId) {
      // отображаем поле на странице
      field.style.display = "block";
    }
    // иначе убираем поле
    else field.style.display = "none";
  });
});
//#endregion

//#region Field
/* кнопка очистки строки ввода */
btnCloseField.addEventListener("click", () => (fieldInput.value = ""));

/* массивы для заметок */
// массив заметок
const notesArray = [];
// массив закреплённых заметок
const notesArrayFixed = [];

/* функция обновления массивов и страницы заметок */
function render() {
  // очистка html-списка заметок
  listElement.innerHTML = "";
  // очистка html-списка закреплённых заметок
  listElementFixed.innerHTML = "";

  // если длина массива закреплёных заметок не равна 0
  if (notesArrayFixed.length !== 0)
    // отображаем блок закреплённых заметок
    mainFieldFixed.style.display = "block";

  if (notesArray.length === 0) {
    listElement.innerHTML = `
          <span id="hint">
            <img src="./img/main_icon_page.svg" alt="hint-icon" />
            <p>Здесь будут ваши заметки</p>
          </span>
    `;
  }
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i].fix) continue;
    listElement.insertAdjacentHTML("beforeend", createNotes(notesArray[i], i));
  }

  for (let i = 0; i < notesArrayFixed.length; i++)
    listElementFixed.insertAdjacentHTML(
      "beforeend",
      createNotes(notesArrayFixed[i], i),
    );
}
render();

// кнопка создания заметки
btnCreateNotes.addEventListener("click", () => {
  if (inputElement.value.length === 0) return;
  const newNote = {
    title: `${inputElement.value}`,
    completed: false,
    fix: false,
    edit: false,
  };
  notesArray.push(newNote);
  render();
  inputElement.value = "";
});

// обработка собития кнопок заметки
listElement.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    const index = +e.target.dataset.index;
    const type = e.target.dataset.type;

    if (type === "toggle")
      notesArray[index].completed = !notesArray[index].completed;
    else if (type === "remove") notesArray.splice(index, 1);
    else if (type === "fixed") {
      notesArray[index].fix = true;
      notesArrayFixed.push(notesArray[index]);
    } else if (type === "edit") {
      notesArray[index].edit = true;

      for (let i = 0; i < editBtn.length; i++) {
        let editMode = false;

        editBtn[i].addEventListener("click", () => {
          if (editMode) {
            text[i].removeAttribute("contentEditable");
          } else {
            text[i].setAttribute("contentEditable", true);
            text[i].focus();
          }

          editMode = !editMode;
        });
      }
    }
  }
  render();
});

// обработка собития кнопок закреплённой заметки
listElementFixed.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    const index = +e.target.dataset.index;
    const type = e.target.dataset.type;

    if (type === "toggle")
      notesArrayFixed[index].completed = !notesArrayFixed[index].completed;
    else if (type === "remove") {
      notesArrayFixed.splice(index, 1);
      notesArray.splice(index, 1);
      mainFieldFixed.style.display = "none";
    }
    if (type === "fixed") {
      notesArray[index].fix = false;
      notesArrayFixed.splice(index, 1);
      mainFieldFixed.style.display = "none";
    } else if (type === "edit") {
      notesArrayFixed[index].edit = true;
    }
  }
  render();
});

// функция создания заметки
function createNotes(note, index) {
  return `<li class="notes">
       <div class="notes-check-btns">
         <label class="notes-check-btns-checkbox">
           <input type="checkbox" ${note.completed ? "checked" : ""}/>
           <span class="custom-checkbox material-symbols-outlined" data-type="toggle" data-index="${index}"></span>
         </label>
         <label class="notes-check-btns-radio">
           <input type="checkbox" ${note.fix ? "checked" : ""}/>
           <span class="custom-radio" data-type="fixed" data-index="${index}"></span>
         </label>
       </div>
       <p style="${
         note.completed ? "text-decoration: line-through;" : ""
       }" class="text"  >${note.title}</p>
       <div class="notes-btns">
         <button class="edit notes-btns-secure" data-type="edit" data-index="${index}">
           <img src="./img/border_color.svg" class="edit" alt="edit" data-type="edit" data-index="${index}"/>
         </button>
         <button class="notes-btns-secure" data-type="remove" data-index="${index}">
           <img src="./img/cancel.svg" alt="remove" data-type="remove" data-index="${index}" />
         </button>
       </div>
     </li>`;
}

// // edit btn
// for (let i = 0; i < editBtn.length; i++) {
//   let editMode = false;
//
//   editBtn[i].addEventListener("click", () => {
//     if (editMode) {
//       text[i].removeAttribute("contentEditable");
//     } else {
//       text[i].setAttribute("contentEditable", true);
//       text[i].focus();
//     }
//
//     editMode = !editMode;
//   });
// }

//#endregion
