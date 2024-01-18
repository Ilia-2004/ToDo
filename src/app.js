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
const fieldNotes = document.querySelector("#main-field-notes");
// const from notes 
const hint = document.querySelector(".hint");
const notes = document.querySelectorAll(".notes");
const text = document.querySelectorAll(".text");
const editBtn = document.querySelectorAll(".edit");

/* header */
// for hover on search
// mainHeaderSearch.addEventListener("mouseover", () => {
//   hintSearch.style.transition = "opacity 0.3s ease-out";
//   hintSearch.style.opacity = "1";
// });
// mainHeaderSearch.addEventListener("mouseout", () => {
//   removeHint();
// });

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
// button close
btnCloseField.addEventListener("click", () => {
  fieldInput.value = "";
});


/* edit btn */
for (let i = 0; i < editBtn.length; i++) {
  let editMode = false;
  
  editBtn[i].addEventListener("click", () => {
    if (editMode) {
      text[i].removeAttribute('contentEditable');
    }
    else {
      text[i].setAttribute('contentEditable', true);
      text[i].focus();
    }
    
    editMode = !editMode;
  });
}

btnCreateNotes.addEventListener("click", () => {
  let note = document.createElement('div');
  note.className = 'notes';
  note.innerHTMLS = createNotes();
  fieldNotes.appendChild(note);
})

notes.forEach((e) => {
  if (e.offsetParent !== null)
    hint.style.display = "none";
})

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

function createNotes() {
  return `<div class="notes-check-btns">
  <label class="notes-check-btns-checkbox">
    <input type="checkbox" />
    <span class="custom-checkbox material-symbols-outlined"></span>
  </label>
  <label class="notes-check-btns-radio">
    <input type="checkbox" />
    <span class="custom-radio"></span>
  </label>
  </div>
  <p class="text"></p>
  <div class="notes-btns">
    <button class="edit notes-btns-secure">
      <img src="./img/border_color.svg" alt="edit" />
    </button>
    <button class="notes-btns-secure">
      <img src="./img/cancel.svg" alt="cancel" />
    </button>
  </div>`
}