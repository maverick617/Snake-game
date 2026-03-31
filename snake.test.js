import test from "node:test";
import assert from "node:assert/strict";

import {
  createInitialState,
  placeFood,
  queueDirection,
  tick
} from "../src/snake.js";

test("moves the snake in the queued direction", () => {
  const state = createInitialState(() => 0);
  const next = tick(state, () => 0);

  assert.deepEqual(next.snake[0], { x: 3, y: 8 });
  assert.equal(next.score, 0);
});

test("grows and increments score after eating food", () => {
  const state = {
    ...createInitialState(() => 0),
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 }
    ],
    food: { x: 3, y: 2 }
  };

  const next = tick(state, () => 0);

  assert.equal(next.score, 1);
  assert.equal(next.snake.length, 4);
  assert.deepEqual(next.snake[0], { x: 3, y: 2 });
  assert.notDeepEqual(next.food, { x: 3, y: 2 });
});

test("marks the game over when the snake hits a wall", () => {
  const state = {
    ...createInitialState(() => 0),
    snake: [{ x: 15, y: 4 }],
    direction: "right",
    pendingDirection: "right"
  };

  const next = tick(state, () => 0);

  assert.equal(next.isGameOver, true);
});

test("marks the game over when the snake hits itself", () => {
  const state = {
    ...createInitialState(() => 0),
    snake: [
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 }
    ],
    direction: "down",
    pendingDirection: "down"
  };

  const next = tick(state, () => 0);

  assert.equal(next.isGameOver, true);
});

test("prevents reversing direction into the snake body", () => {
  const state = createInitialState(() => 0);
  const next = queueDirection(state, "left");

  assert.equal(next.pendingDirection, "right");
});

test("places food only on open cells", () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
  ];

  const food = placeFood(snake, 2, () => 0);

  assert.deepEqual(food, { x: 1, y: 1 });
});
