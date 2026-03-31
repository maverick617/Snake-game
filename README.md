# Classic Snake

A small browser-based implementation of the classic Snake game.

## Features

- Grid-based snake movement
- Food spawning and score tracking
- Snake growth after eating food
- Game-over detection for wall and self collisions
- Restart button for a fresh run
- Keyboard controls with on-screen controls for touch/mobile use

## Tech Stack

- Plain HTML, CSS, and JavaScript
- No runtime dependencies
- Node's built-in test runner for core game logic

## Getting Started

### Prerequisites

- Node.js
- npm
- Python 3

### Run Locally

```bash
npm run dev
```

Then open [http://localhost:4173](http://localhost:4173) in your browser.

## Run Tests

```bash
npm test
```

## Controls

- Arrow keys
- `W`, `A`, `S`, `D`
- On-screen directional buttons

## Project Structure

```text
.
├── index.html
├── package.json
├── src
│   ├── main.js
│   ├── snake.js
│   └── styles.css
└── tests
    └── snake.test.js
```

## Manual Verification Checklist

- Start the game with arrow keys or `WASD`
- Confirm the snake moves one cell per tick
- Confirm eating food increases the score
- Confirm the snake grows after eating food
- Confirm the game ends when hitting a wall
- Confirm the game ends when hitting the snake's body
- Confirm the `Restart` button resets score and board state
- Confirm on-screen controls work on smaller/mobile screens

## Notes

This project is intentionally minimal and focused only on the classic Snake gameplay loop.
