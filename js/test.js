const removeHover = () => {
  const marqueeElems = document.getElementsByClassName("marquee");
  for (let x = 0; x < marqueeElems.length; x++) {
    marqueeElems[x].classList.remove("hover");
  }
};

let movingLeft = true;
const moveTitle = () => {
  const currTitle = document.title;
  if (movingLeft) {
    document.title = `${currTitle.substring(1)}${currTitle.charAt(0)}`;
    movingLeft = document.title.charAt(0) === "-";
  } else {
    document.title = `${currTitle.charAt(
      currTitle.length - 1
    )}${currTitle.substring(0, currTitle.length - 1)}`;
    if (document.title.charAt(document.title.length - 1) === "-") {
      movingLeft = false;
    } else {
      movingLeft = true;
    }
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
    image: `<img class="card-image" alt="drunkful logo"
    src="./assets/images/portfolio_logos/logo_yellow.png">`,
    back: "this is the back",
    frontBackgroundColor: "#FDCB45",
    frontTextColor: "#C56211",
  },
  {
    image: `<img class="card-image"  alt="artblocks logo"
    src="./assets/images/portfolio_logos/artblocks.svg">`,
    back: `<div>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM68.67,208A64.36,64.36,0,0,1,87.8,182.2a64,64,0,0,1,80.4,0A64.36,64.36,0,0,1,187.33,208ZM208,208h-3.67a79.9,79.9,0,0,0-46.68-50.29,48,48,0,1,0-59.3,0A79.9,79.9,0,0,0,51.67,208H48V48H208V208Z"></path></svg>
    <div>Core Software Engineer</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>
    <div>1/6/23->present</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M169.64,134.33l44.77-19.46A16,16,0,0,0,213,85.07L52.92,32.8A16,16,0,0,0,32.8,52.92L85.07,213a15.83,15.83,0,0,0,14.41,11l.79,0a15.83,15.83,0,0,0,14.6-9.59h0l19.46-44.77L184,219.31a16,16,0,0,0,22.63,0l12.68-12.68a16,16,0,0,0,0-22.63Zm-69.48,73.76.06-.05Zm95.15-.09-49.66-49.67a16,16,0,0,0-26,4.94l-19.42,44.65L48,48l159.87,52.21-44.64,19.41a16,16,0,0,0-4.94,26L208,195.31ZM88,24V16a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0ZM8,96a8,8,0,0,1,8-8h8a8,8,0,0,1,0,16H16A8,8,0,0,1,8,96ZM120.85,28.42l8-16a8,8,0,0,1,14.31,7.16l-8,16a8,8,0,1,1-14.31-7.16Zm-81.69,96a8,8,0,0,1-3.58,10.74l-16,8a8,8,0,0,1-7.16-14.31l16-8A8,8,0,0,1,39.16,124.42Z"></path></svg>
    <a href="https://www.artblocks.io"  target="_blank" rel="noreferrer">artblocks.io</a>
    </div>`,
    frontBackgroundColor: "#000",
    frontTextColor: "#fff",
  },
  {
    image: `<img class="card-image"  alt="hudsonhapps logo"
    src="./assets/images/portfolio_logos/hudsonhapps.svg">`,
    back: "this is the back",
    frontBackgroundColor: "#0068E9",
    frontTextColor: "#fff",
  },
  {
    image: `<img class="card-image"  alt="forkist logo"
    src="./assets/images/portfolio_logos/textLogo@3x_red.png">`,
    back: "this is the back",
    frontBackgroundColor: "#fff",
    frontTextColor: "#e84637",
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
