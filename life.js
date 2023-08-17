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
  // Define patterns for other characters...
};

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

// Example usage
const character = "A";
const dotMatrix = charToDotMatrix(character);

function initializeGridDotMatrix(dotMatrix) {
  const dotMatrixHeight = dotMatrix.length;
  const dotMatrixWidth = dotMatrix[0].length;
  const startRow = Math.floor((numRows - dotMatrixHeight) / 2);
  const startCol = Math.floor((numCols - dotMatrixWidth) / 2);
  for (let i = 0; i < dotMatrixHeight; i++) {
    for (let j = 0; j < dotMatrixWidth; j++) {
      grid[startRow + i][startCol + j] = dotMatrix[i][j];
      updateGrid();
      drawGrid();
    }
  }
}

function animate() {
  updateGrid();
  drawGrid();
}

initializeGridDotMatrix(dotMatrix);
updateGrid();
drawGrid();
// setInterval(animate, 500);
