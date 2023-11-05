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
    classList.remove("rotate");
    const rotatedElems = document.getElementsByClassName("rotate");
    if (rotatedElems.length === 0) {
      removeHover();
    }
    classList.add("moving");
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
  {
    image: `<img class="card-image"  alt="forkist logo"
    src="./assets/images/portfolio_logos/textLogo@3x_red.png">`,
    back: "this is the back",
    frontBackgroundColor: "#fff",
    frontTextColor: "#e84637",
  },
  {
    image: `<img class="card-image" alt="drunkful logo"
    src="./assets/images/portfolio_logos/logo_yellow.png">`,
    back: "this is the back",
    frontBackgroundColor: "#FDCB45",
    frontTextColor: "#C56211",
  },
  {
    image: `<img class="card-image"  alt="scholastic logo"
    src="./assets/images/portfolio_logos/scholasti-logo.png">`,
    back: "this is the back",
    frontBackgroundColor: "#ec1d25",
    frontTextColor: "#fff",
  },
  {
    image: `<img class="card-image"  alt="north of normal cbd logo"
    src="./assets/images/portfolio_logos/North-of-Normal-CBD(transparent).png">`,
    back: "this is the back",
    frontBackgroundColor: "#3D8E27",
    frontTextColor: "#fff",
  },
];

window.onload = function () {
  window.addEventListener("mousemove", editCursor);

  const childs = [];
  for (let i = 0; i < info.length; i++) {
    const d = document.createElement("div");
    d.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front" style="background:${info[i].frontBackgroundColor}; color:${info[i].frontTextColor}">
        <div class="flip-front-align">
        ${info[i].image}
        </div>
        <div class="learn-more">learn more</div>
        </div>
        <div class="flip-card-back">
        <div class="flip-back-align">
        <div class="back-button">go back</div>
        ${info[i].back}
        </div>
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
