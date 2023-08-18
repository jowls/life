const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const gridSize = 10;
const numRows = Math.floor(window.innerHeight / gridSize);
const numCols = Math.floor(window.innerWidth / gridSize);
canvas.width = numCols * gridSize;
canvas.height = numRows * gridSize;
let grid = createEmptyGrid();
const dotMatrixPatterns = {
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  C: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 1],
  ],
  H: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  I: [[1], [1], [1], [1], [1]],
  J: [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0],
  ],
  X: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  Z: [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 1],
  ],
  "@": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
  ],
  ".": [[0], [0], [0], [0], [1]],
  " ": [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
};
const string = "joseph allan";
const dotMatrix = convertStringtoDotMatrix(string);

function createEmptyGrid() {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(0);
    }
    rows.push(row);
  }
  return rows;
}

function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === 1) {
        context.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
      }
    }
  }
}

function updateGrid() {
  const newGrid = createEmptyGrid();
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const neighbors = countNeighbors(i, j);
      if (grid[i][j] === 1) {
        newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[i][j] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  grid = newGrid;
}

function countNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        count += grid[newRow][newCol];
      }
    }
  }
  return count;
}

function initializeGridRandomly() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      grid[i][j] = Math.random() > 0.5 ? 1 : 0;
    }
  }
}

function charToDotMatrix(char) {
  const pattern = dotMatrixPatterns[char.toUpperCase()];
  if (!pattern) {
    return null; // Character not supported
  }
  return pattern;
}

function convertStringtoDotMatrix(string) {
  const dotMatrix = [];
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    const pattern = charToDotMatrix(char);
    if (!pattern) {
      continue; // Character not supported
    }
    dotMatrix.push(pattern);
  }
  return dotMatrix;
}

function initializeGridDotMatrix(dotMatrix) {
  var stringWidth = 0;
  var stringHeight = dotMatrix[0].length;
  for (let i = 0; i < dotMatrix.length; i++) {
    stringWidth += dotMatrix[i][0].length;
  }
  const startRow = Math.floor((numRows - stringHeight) / 2);
  startCol = Math.floor((numCols - (stringWidth + dotMatrix.length - 1)) / 2); // dM.len - 1 for space between characters
  for (let matrixIdx = 0; matrixIdx < dotMatrix.length; matrixIdx++) {
    for (let i = 0; i < dotMatrix[matrixIdx].length; i++) {
      for (let j = 0; j < dotMatrix[matrixIdx][0].length; j++) {
        grid[startRow + i][startCol + j] = dotMatrix[matrixIdx][i][j];
        drawGrid();
      }
    }
    startCol += dotMatrix[matrixIdx][0].length + 1; // +1 for space between characters
  }
}

function animate() {
  if (isRunning) {
    updateGrid();
    drawGrid();
  }
}

// Button event handlers
const startPauseButton = document.getElementById("startPauseButton");
const resetButton = document.getElementById("resetButton");
let isRunning = false;

startPauseButton.addEventListener("click", () => {
  isRunning = !isRunning;
  if (isRunning) {
    startPauseButton.textContent = "Pause";
  } else {
    startPauseButton.textContent = "Resume";
  }
});

resetButton.addEventListener("click", () => {
  grid = createEmptyGrid();
  initializeGridDotMatrix(dotMatrix);
  drawGrid();
});

initializeGridDotMatrix(dotMatrix);
setInterval(animate, 666);
