import spiderman from "./spriteLocations/spiderman.js";

const imageSrc = "./assets/spiderman.png";
let gameFrame = 0; //the number of animations done
let staggerFrames = 15; //the value which decides the pause between each phase

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = imageSrc;
let frameX = 0;

const spidermanActions = Object.keys(spiderman);
let spidermanState = spidermanActions[0];

const selectorDiv = document.createElement("div");
selectorDiv.className = "controls";

const label = document.createElement("label");
label.setAttribute("for", "animations");
label.textContent = "Choose Animations";

const select = document.createElement("select");
select.name = "animations";
select.id = "animations";

spidermanActions.forEach((action) => {
  const option = document.createElement("option");
  option.value = action;
  option.textContent = action;
  select.appendChild(option);
});

selectorDiv.appendChild(label);
selectorDiv.appendChild(select);
document.body.appendChild(selectorDiv);

const animationSelectBox = document.getElementById("animations");
animationSelectBox.addEventListener("change", (e) => {
  spidermanState = e.target.value;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const spidermanStateSequence = spiderman[spidermanState];
  const position =
    Math.floor(gameFrame / staggerFrames) % spidermanStateSequence.length;
  const currentSprite = spidermanStateSequence[position];

  ctx.drawImage(
    playerImage,
    currentSprite.x,
    currentSprite.y,
    currentSprite.width,
    currentSprite.height,
    300 - currentSprite.width,
    300 - currentSprite.height,
    2 * currentSprite.width,
    2 * currentSprite.height
  );
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
