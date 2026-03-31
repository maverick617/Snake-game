import {
  GRID_SIZE,
  TICK_MS,
  createInitialState,
  queueDirection,
  tick
} from "./snake.js";

const board = document.querySelector("#board");
const scoreValue = document.querySelector("#score");
const message = document.querySelector("#message");
const restartButton = document.querySelector("#restart-button");
const controlButtons = document.querySelectorAll("[data-direction]");

const keyDirectionMap = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right"
};

let state = createInitialState();
let loopId = null;

board.style.setProperty("--grid-size", String(GRID_SIZE));

function startLoop() {
  if (loopId !== null) {
    return;
  }

  loopId = window.setInterval(() => {
    state = tick(state);
    syncUi();

    if (state.isGameOver) {
      stopLoop();
    }
  }, TICK_MS);
}

function stopLoop() {
  if (loopId !== null) {
    window.clearInterval(loopId);
    loopId = null;
  }
}

function setDirection(direction) {
  const nextState = queueDirection(state, direction);
  const shouldStart = !state.hasStarted && nextState.hasStarted && !nextState.isGameOver;

  state = nextState;
  syncUi();

  if (shouldStart) {
    startLoop();
  }
}

function restartGame() {
  stopLoop();
  state = createInitialState();
  syncUi();
}

function syncUi() {
  scoreValue.textContent = String(state.score);

  if (state.isGameOver) {
    message.textContent = "Game over. Press restart to play again.";
  } else if (!state.hasStarted) {
    message.textContent = "Use arrow keys or WASD to start.";
  } else {
    message.textContent = "Collect food and avoid walls or yourself.";
  }

  renderBoard();
}

function renderBoard() {
  const snakeCells = new Set(state.snake.map((segment) => `${segment.x},${segment.y}`));
  const foodKey = state.food ? `${state.food.x},${state.food.y}` : "";
  const cells = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const key = `${x},${y}`;
      let cellClass = "cell";

      if (key === foodKey) {
        cellClass += " food";
      } else if (snakeCells.has(key)) {
        cellClass += x === state.snake[0].x && y === state.snake[0].y ? " snake head" : " snake";
      }

      cells.push(`<div class="${cellClass}" aria-hidden="true"></div>`);
    }
  }

  board.innerHTML = cells.join("");
}

document.addEventListener("keydown", (event) => {
  const direction = keyDirectionMap[event.key];

  if (!direction) {
    return;
  }

  event.preventDefault();
  setDirection(direction);
});

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setDirection(button.dataset.direction);
  });
});

restartButton.addEventListener("click", restartGame);

syncUi();
