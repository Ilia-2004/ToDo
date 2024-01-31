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

  // если в массиве заметок нет элементов
  if (notesArray.length === 0) {
    // вывести элемент пустого поля
    listElement.innerHTML = `
          <span id="hint">
            <img src="./img/main_icon_page.svg" alt="hint-icon" />
            <p>Здесь будут ваши заметки</p>
          </span>
    `;
  }

  // вывод заметок из массива на страницу
  for (let i = 0; i < notesArray.length; i++) {
    // если заметка имеет закреплена, то пропустить её
    if (notesArray[i].fix) continue;
    // вызов функции создания кода для заметки
    listElement.insertAdjacentHTML("beforeend", createNotes(notesArray[i], i));
  }

  // вывод закреплённых заметок на страницу
  for (let i = 0; i < notesArrayFixed.length; i++)
    // доабавление элемента заметки на страницу
    listElementFixed.insertAdjacentHTML(
      "beforeend",
      createNotes(notesArrayFixed[i], i),
    );
}
// обновление поля для заметок
render();

// кнопка создания заметки
btnCreateNotes.addEventListener("click", () => {
  // если поле ввода пустое, то выходим из функции
  if (inputElement.value.length === 0) return;
  // создаём структуру новой заметки
  const newNote = {
    // параметр названия заметки
    title: `${inputElement.value}`,
    // параметр статуса "выполнить"
    completed: false,
    // параметр фиксации
    fix: false,
    // параметр редактированиф
    edit: false,
  };
  // добавляем заметку в массив
  notesArray.push(newNote);
  // обновление поле заметок
  render();
  // чистим поле ввода
  inputElement.value = "";
});

// обработка собития кнопок заметки
listElement.addEventListener("click", (e) => {
  let renderFlag = false;
  // если у элемента есть индекс
  if (e.target.dataset.index) {
    renderFlag = true;
    // присваивание индекса элемента
    const index = +e.target.dataset.index;
    // присваивание тип элемента
    const type = e.target.dataset.type;

    // если тип "toggle"
    if (type === "toggle")
      // делаем заметку выполненной
      notesArray[index].completed = !notesArray[index].completed;
    // если тип "remove"
    else if (type === "remove")
      // удаляем заметку из массива
      notesArray.splice(index, 1);
    // если тип "fixed"
    else if (type === "fixed") {
      // ставим fix на true
      notesArray[index].fix = true;
      // добавляем заметку в массив закреплённых
      notesArrayFixed.push(notesArray[index]);
    }
    // если тип "edit"
    else if (type === "edit") {
      // меняем значения параметра "edit"
      notesArray[index].edit = !notesArray[index].edit;
      // если значение false
      if (!notesArray[index].edit)
        // присваеваем новый текст заметки
        notesArray[index].title =
          listElement.children[index].querySelector(".text > input").value;
    }
  }
  // обновляем страницу заметок
  if (renderFlag) render();
});

// обработка события кнопок закреплённой заметки
listElementFixed.addEventListener("click", (e) => {
  let renderFlag = false;
  // если у элемента есть индекс
  if (e.target.dataset.index) {
    renderFlag = true;
    // присваиваение индекса
    const index = +e.target.dataset.index;
    // присваиваение типа
    const type = e.target.dataset.type;

    // если тип равен "toggle"
    if (type === "toggle")
      // ставим заметку выполненной
      notesArrayFixed[index].completed = !notesArrayFixed[index].completed;
    // если тип равен "remove"
    else if (type === "remove") {
      // удаляем заметку из массива зафиксированных
      notesArrayFixed.splice(index, 1);
      // удаляем заметку из массива
      notesArray.splice(index, 1);
      // скрываем блок фиксированных заметок
      mainFieldFixed.style.display = "none";
    }
    // если тип "fixed"
    else if (type === "fixed") {
      // ставим fix - false
      notesArray[index].fix = false;
      // удаляем заметку из массива зафиксированных
      notesArrayFixed.splice(index, 1);
      // скрываем блок фиксированных заметок
      mainFieldFixed.style.display = "none";
    }
    // если тип равен "edit"
    else if (type === "edit") {
      // меняем значения параметра "edit"
      notesArray[index].edit = !notesArray[index].edit;
      // если значение false
      if (!notesArray[index].edit)
        // присваеваем новый текст заметки
        notesArray[index].title =
          listElementFixed.children[index].querySelector(".text > input").value;
    }
  }
  // обновляем страницу заметок
  if (renderFlag) render();
});

// функция создания заметки
function createNotes(note, index) {
  // возвращаем структуру заметки
  return `<li class="notes" data-index="${index}">
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
       ${
         note.edit
           ? `<p style="${
               note.completed ? "text-decoration: line-through;" : ""
             }" class="text"><input class="noteInput" type="text" value="${
               note.title
             }"></p>`
           : `<p style="${
               note.completed ? "text-decoration: line-through;" : ""
             }" class="text">${note.title}</p>`
       }
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
//#endregion
