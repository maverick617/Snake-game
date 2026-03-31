export const GRID_SIZE = 16;
export const INITIAL_DIRECTION = "right";
export const TICK_MS = 140;

const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

const OPPOSITE_DIRECTIONS = {
  up: "down",
  down: "up",
  left: "right",
  right: "left"
};

export function createInitialSnake() {
  return [
    { x: 2, y: 8 },
    { x: 1, y: 8 },
    { x: 0, y: 8 }
  ];
}

export function createInitialState(random = Math.random) {
  const snake = createInitialSnake();

  return {
    gridSize: GRID_SIZE,
    snake,
    direction: INITIAL_DIRECTION,
    pendingDirection: INITIAL_DIRECTION,
    food: placeFood(snake, GRID_SIZE, random),
    score: 0,
    isGameOver: false,
    hasStarted: false
  };
}

export function queueDirection(state, nextDirection) {
  if (!DIRECTION_VECTORS[nextDirection]) {
    return state;
  }

  const activeDirection = state.pendingDirection ?? state.direction;

  if (OPPOSITE_DIRECTIONS[activeDirection] === nextDirection && state.snake.length > 1) {
    return state;
  }

  return {
    ...state,
    pendingDirection: nextDirection,
    hasStarted: true
  };
}

export function tick(state, random = Math.random) {
  if (state.isGameOver) {
    return state;
  }

  const direction = state.pendingDirection;
  const movement = DIRECTION_VECTORS[direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + movement.x, y: head.y + movement.y };
  const isEating =
    state.food !== null &&
    nextHead.x === state.food.x &&
    nextHead.y === state.food.y;
  const nextSnake = [nextHead, ...state.snake];

  if (!isEating) {
    nextSnake.pop();
  }

  const hitWall =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= state.gridSize ||
    nextHead.y >= state.gridSize;

  const hitSelf = nextSnake
    .slice(1)
    .some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

  if (hitWall || hitSelf) {
    return {
      ...state,
      direction,
      pendingDirection: direction,
      isGameOver: true,
      hasStarted: true
    };
  }

  const nextFood = isEating ? placeFood(nextSnake, state.gridSize, random) : state.food;

  return {
    ...state,
    snake: nextSnake,
    direction,
    pendingDirection: direction,
    food: nextFood,
    score: isEating ? state.score + 1 : state.score,
    isGameOver: state.isGameOver || nextFood === null,
    hasStarted: true
  };
}

export function placeFood(snake, gridSize, random = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const openCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      if (!occupied.has(`${x},${y}`)) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(random() * openCells.length);
  return openCells[index];
}
