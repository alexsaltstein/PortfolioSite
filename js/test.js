const removeHover = () => {
  const marqueeElems = document.getElementsByClassName("marquee");
  for (let x = 0; x < marqueeElems.length; x++) {
    marqueeElems[x].classList.remove("hover");
  }
};

const addHover = () => {
  const marqueeElems = document.getElementsByClassName("marquee");
  for (let x = 0; x < marqueeElems.length; x++) {
    marqueeElems[x].classList.add("hover");
  }
};

const addScaleCursor = () => {
  const cursor = document.getElementById("cursor");
  cursor.classList.add("scale-cursor");
};

const removeScaleCursor = () => {
  const cursor = document.getElementById("cursor");
  cursor.classList.remove("scale-cursor");
};

const toggleRotate = (e) => {
  const classList = e.classList;
  const hasRotate = classList?.contains("rotate");
  if (hasRotate === true) {
    removeHover();
    classList.add("moving");
    classList.remove("rotate");
  } else {
    addHover();
    classList.remove("moving");
    classList.add("rotate");
  }
};

const editCursor = (e) => {
  const cursor = document.getElementById("cursor");
  const { clientX: x, clientY: y } = e;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
};

const info = [
  { text: "test", back: "this is the back" },
  { text: "artichoke", back: "another back" },
  { text: "banana", back: "anotha one" },
];

window.onload = function () {
  window.addEventListener("mousemove", editCursor);

  const childs = [];
  for (let i = 0; i < info.length; i++) {
    const d = document.createElement("buton");
    d.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
        ${info[i].text}
        </div>
        <div class="flip-card-back">
        ${info[i].back}
        </div>
      </div>
    `;

    d.classList.add("flip-card");
    d.classList.add("hover-this");
    d.classList.add("moving");

    const val = Math.random() * 20;
    d.style.setProperty("margin-top", `${val - 10}px`);

    const options = [
      {
        text: "var(--primary)",
        background: "var(--surface)",
      },
      {
        text: "var(--negative)",
        background: "var(--inverted)",
      },
      {
        text: "var(--inverted)",
        background: "var(--surface)",
      },
      {
        text: "var(--surface)",
        background: "var(--negative)",
      },
      {
        text: "var(--surface)",
        background: "var(--primary)",
      },
    ];
    const opt = options[Math.floor(Math.random() * options.length)];
    d.style.setProperty("background", opt.background);
    d.style.setProperty("color", opt.text);
    d.style.setProperty("animation-delay", `${Math.random() * 2}s`);
    d.setAttribute("onclick", "toggleRotate(this)");
    childs.push(d);
  }

  const elems = document.getElementsByClassName("marquee");
  for (let i = 0; i < elems.length; i++) {
    // elems[i].addEventListener("mouseover", addHover);
    // elems[i].addEventListener("mouseout", removeHover);
    childs.forEach((e) => {
      const l = e.cloneNode(true);
      elems[i].appendChild(l);
    });
  }

  const hoverElems = document.getElementsByClassName("hover-this");

  for (let i = 0; i < hoverElems.length; i++) {
    hoverElems[i].addEventListener("mousemove", addScaleCursor);
    hoverElems[i].addEventListener("mouseleave", removeScaleCursor);
  }
};
