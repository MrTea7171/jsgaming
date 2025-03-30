//Configuration

//All the animations states in the sprite
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "gethit", frames: 4 },
];

const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0; //the number of animations done
let staggerFrames = 5; //the value which decides the pause between each phase

//Variable for animation details
const spriteAnimations = {};

//Creating the Sprite animation Object
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({
      x: positionX,
      y: positionY,
    });
  }
  spriteAnimations[state.name] = frames;
});

//Variables Code
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";
let playerState = "idle";

const animationSelectBox = document.getElementById("animations");

//animations change code
animationSelectBox.addEventListener("change", (e) => {
  playerState = e.target.value;
});

//Animation Running Code
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let { x: frameX, y: frameY } = spriteAnimations[playerState].loc[position];
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
