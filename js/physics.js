const THICKNESS = 60;

const elems = [];
let engine;

// set the new boxes somewhere not within the middle alex and within the client

const createBox = (render) => {
  const div = document.createElement("div");

  div.innerHTML = "<h1>hello world</h1>";
  div.classList.add("box");

  document.body.appendChild(div);
  const width = 100;
  const height = 100;
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

  // add all of the bodies to the world

  // const mouse = Matter.Mouse.create(render.canvas);
  // const mouseConstraint = Matter.MouseConstraint.create(engine, {
  //   mouse,
  //   constraint: {
  //     stiffness: 0.2,
  //     render: {
  //       visible: false,
  //     },
  //   },
  // });

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
    .getElementById("myButton")
    .addEventListener("click", () => createBox(render));
  document
    .getElementById("myButton")
    .addEventListener("touchend", () => createBox(render));

  window.addEventListener("resize", () =>
    handleResize(matterContainer, render, ground, ceiling, leftWall, rightWall)
  );

  (function rerender() {
    elems.forEach((e) => e.render());
    Matter.Engine.update(engine);
    requestAnimationFrame(rerender);
  })();
};
