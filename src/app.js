/* import's */
import "./index.html";
import "./style.scss";

/* const's */
// const form header
const mainHeaderSearch = document.querySelector(".main-header-search");
const searchInputHeader = document.querySelector(".main-header-search-input");
const btnCloseSearch = document.querySelector("#btn-close-search");
// const from menu
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".btn-menu");
const menuPages = document.querySelector("#menu-pages");
const btnMenuPages = document.querySelectorAll(".btn-menu-pages");
const textBtn = document.querySelectorAll(".text-btn");
// const from field
const fields = document.querySelectorAll(".field");
const fieldInput = document.querySelector(".main-field-add-input");
const btnCloseField = document.querySelector("#btn-close-field");
const btnCreateNotes = document.querySelector("#btn-create-notes");
// const from notes
// const hint = document.querySelector(".hint");
const inputElement = document.querySelector(".main-field-add-input");
const listElement = document.querySelector("#list");
const mainFieldFixed = document.querySelector("#main-field-fixed");
const listElementFixed = document.querySelector("#list-fixed");

/* header */
// add button close on search
searchInputHeader.addEventListener("input", () => {
  if (searchInputHeader.value.length !== 0) {
    btnCloseSearch.style.display = "block";
    mainHeaderSearch.style.padding = "0 0 0 0";
  } else {
    btnCloseSearch.style.display = "none";
    mainHeaderSearch.style.padding = "0 54px 0 0";
  }
});

// button close
btnCloseSearch.addEventListener("click", () => {
  searchInputHeader.value = "";
  btnCloseSearch.style.display = "none";
  mainHeaderSearch.style.padding = "0 54px 0 0";
});

/* menu */
// button menu
menuBtn.addEventListener("click", () => {
  if (menu.style.width !== "100px") changeMenu(100, 70, "efefef", "none");
  else changeMenu(280, 180, "fff", "block");
});

function changeMenu(widthMenu, widthBtn, background, display) {
  menu.style.width = `${widthMenu}px`;
  menu.style.background = `#${background}`;
  btnMenuPages.forEach((btn) => {
    btn.style.width = `${widthBtn}px`;
  });
  textBtn.forEach((btn) => {
    btn.style.display = `${display}`;
  });
}

// switch between pages
menuPages.addEventListener("click", (event) => {
  const buttonField = event.target.closest("button");
  if (!buttonField) return;

  const dataId = +buttonField.dataset.id;

  btnMenuPages.forEach((btn) => {
    const btnId = +btn.dataset.id;
    if (btnId === dataId) {
      console.log(btnId);
      btn.style.background = "#e1e8f1";
    } else btn.style.background = "none";
  });

  fields.forEach((f) => {
    const fieldId = +f.dataset.id;
    if (fieldId === dataId) {
      console.log(fieldId);
      f.style.display = "block";
    } else f.style.display = "none";
  });
});

/* field */
btnCloseField.addEventListener("click", () => {
  fieldInput.value = "";
});

// arrays from notes
const notesArray = [];
const notesArrayFixed = [];

// function for render notes
function render() {
  listElement.innerHTML = "";
  listElementFixed.innerHTML = "";
  if (notesArrayFixed.length !== 0) {
    mainFieldFixed.style.display = "block";
  }
  if (notesArray.length === 0) {
    listElement.innerHTML = `
          <span id="hint">
            <img src="./img/main_icon_page.svg" alt="hint-icon" />
            <p>Здесь будут ваши заметки</p>
          </span>
    `;
  }
  for (let i = 0; i < notesArray.length; i++)
    listElement.insertAdjacentHTML("beforeend", createNotes(notesArray[i], i));

  for (let i = 0; i < notesArrayFixed.length; i++)
    listElementFixed.insertAdjacentHTML(
      "beforeend",
      createNotes(notesArrayFixed[i], i),
    );
}
render();

// button of create note
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

// event of buttons for note
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
      notesArray.splice(index, 1);
    } else if (type === "edit") {
      notesArray[index].edit = !notesArray[index].edit;
    }
  }
  render();
});

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

// supported method for create note
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
       }" class="text" ${note.edit ? "contentEditable" : ""}>${note.title}</p>
       <div class="notes-btns">
         <button class="edit notes-btns-secure" data-type="edit" data-index="${index}">
           <img src="./img/border_color.svg" alt="edit" data-type="edit" data-index="${index}"/>
         </button>
         <button class="notes-btns-secure" data-type="remove" data-index="${index}">
           <img src="./img/cancel.svg" alt="remove" data-type="remove" data-index="${index}" />
         </button>
       </div>
     </li>`;
}
