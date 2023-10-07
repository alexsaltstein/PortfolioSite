const clickHandler = (event) => {
  const selectedElems = document.getElementsByClassName("selected");
  for (let x = 0; x < selectedElems.length; x++) {
    selectedElems[x].classList.remove("selected");
  }
  event.target.classList.add("selected");
};

window.onload = function () {
  const elems = document.getElementsByClassName("nav-item");
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", clickHandler);
  }
};
