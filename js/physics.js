const THICKNESS = 60;

const elems = [];
let engine;

// disable scroll cause it makes the effect super weird
function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
}

const BOX_OPTIONS = [
  {
    width: 100,
    height: 100,
    body: `<a href="https://github.com/alexsaltstein" target="_blank" rel="noreferrer" ontouchend="window.open('https://github.com/alexsaltstein', '_blank').focus()">
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#fff" viewBox="0 0 256 256"><title>Visit my Github!</title><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path></svg>
</a>`,
    bg: "#B140D3",
  },
  {
    width: 100,
    height: 100,
    body: `<a href="https://www.linkedin.com/in/alex-saltstein/" target="_blank" rel="noreferrer" ontouchend="window.open('https://www.linkedin.com/in/alex-saltstein-1aa02a163', '_blank').focus()">
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#fff" viewBox="0 0 256 256"><title>Visit my LinkedIn!</title><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
</a>`,
    bg: "#F58F19",
  },
  {
    width: 125,
    height: 75,
    body: `<a title="Visit my Resume!" class="box-text" href="./assets/pdfs/Saltstein_Resume.pdf" target="_blank" rel="noreferrer" ontouchend="window.open('./assets/pdfs/Saltstein_Resume.pdf', '_blank').focus()">
    <h2>Resume</h2>
</a>`,
    bg: "#1c8d2a",
  },
  {
    width: 100,
    height: 100,
    body: `
    <img src="assets/images/profile_pic.jpg" alt="Profile Pic" id="profilePic">`,
    bg: "#5f74b8",
  },
];

let currIndex = 0;

// set the new boxes somewhere within the width of the canvas
const createBox = (render) => {
  currBox = BOX_OPTIONS[currIndex % BOX_OPTIONS.length];
  const div = document.createElement("div");

  div.innerHTML = currBox.body;
  div.classList.add("box");
  div.style = `width:${currBox.width}px;height:${currBox.height}px;background:${currBox.bg}`;

  document.body.appendChild(div);

  const width = currBox.width;
  const height = currBox.height;
  const box = {
    w: width,
    h: height,
    body: Matter.Bodies.rectangle(
      (render.canvas.width - width / 2) * Math.random() + width / 2,
      height / 2,
      width,
      height
    ),
    elem: div,
    render() {
      const { x, y } = this.body.position;
      this.elem.style.top = `${y - this.h / 2}px`;
      this.elem.style.left = `${x - this.w / 2}px`;
      this.elem.style.transform = `rotate(${this.body.angle}rad)`;
    },
  };

  Matter.Composite.add(engine.world, [box.body]);

  currIndex++;
  elems.push(box);
};

const handleResize = (
  matterContainer,
  render,
  ground,
  ceiling,
  leftWall,
  rightWall
) => {
  // resize canvas
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  // resize the walls
  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICKNESS / 2
    )
  );

  Matter.Body.setPosition(
    ceiling,
    Matter.Vector.create(matterContainer.clientWidth / 2, 0 - THICKNESS / 2)
  );

  Matter.Body.setPosition(
    leftWall,
    Matter.Vector.create(0 - THICKNESS / 2, matterContainer.clientHeight / 2)
  );

  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      matterContainer.clientWidth + THICKNESS / 2,
      matterContainer.clientHeight / 2
    )
  );
};

window.onload = () => {
  const matterContainer = document.getElementById("container");

  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  // create an engine
  engine = Engine.create();

  // create a renderer
  const render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
      width: matterContainer.clientWidth,
      height: matterContainer.clientHeight,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: true,
    },
  });

  // setup the walls
  const ground = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICKNESS / 2,
    matterContainer.clientWidth * 10,
    THICKNESS,
    { isStatic: true }
  );

  const ceiling = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    0 - THICKNESS / 2,
    matterContainer.clientWidth * 10,
    THICKNESS,
    { isStatic: true }
  );

  const leftWall = Bodies.rectangle(
    0 - THICKNESS / 2,
    matterContainer.clientHeight / 2,
    THICKNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
  );

  const rightWall = Bodies.rectangle(
    matterContainer.clientWidth + THICKNESS / 2,
    matterContainer.clientHeight / 2,
    THICKNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
  );

  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: document.body,
  });

  Composite.add(engine.world, [
    ground,
    rightWall,
    leftWall,
    ceiling,
    mouseConstraint,
  ]);

  document
    .getElementById("add-box-button")
    .addEventListener("click", () => createBox(render));
  document
    .getElementById("add-box-button")
    .addEventListener("touchend", () => createBox(render));

  window.addEventListener("resize", () =>
    handleResize(matterContainer, render, ground, ceiling, leftWall, rightWall)
  );
  disableScroll();

  (function rerender() {
    elems.forEach((e) => e.render());
    Matter.Engine.update(engine);
    requestAnimationFrame(rerender);
  })();
};
