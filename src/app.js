import "./index.html";
import "./style.scss";
import "./scripts/consts";

// header
// for hover on search
mainHeaderSearch.addEventListener("mouseover", () => {
  hintSearch.style.transition = "opacity 0.3s ease-out";
  hintSearch.style.opacity = "1";
});
mainHeaderSearch.addEventListener("mouseout", () => {
  removeHint();
});

// hint from click input
searchInputHeader.addEventListener("click", () => {
  removeHint();
});

// add button close on search
searchInputHeader.addEventListener("input", () => {
  if (searchInputHeader.value.length !== 0) {
    btnCloseSearch.style.display = "block";
    mainHeaderSearch.style.padding = "0 0 0 0";
    removeHint();
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

// menu
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

// helpers functions
function removeHint() {
  hintSearch.style.transition = "none";
  hintSearch.style.opacity = "0";
}

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
