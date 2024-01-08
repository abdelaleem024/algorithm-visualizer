const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let parent = [];
let height, width;

const isValid = (row, col) => {
  return (
    row >= 0 &&
    row < height &&
    col >= 0 &&
    col < width &&
    parent[row][col] === -1
  );
};

const heuristic = (cell1, cell2) => {
  return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col);
};

const getNeighbors = (row, col) => {
  const neighbors = [];
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (isValid(newRow, newCol) && parent[newRow][newCol] === -1) {
      neighbors.push([newRow, newCol]);
    }
  }
  return neighbors;
};

const astar = (grid, startCell, endCell) => {
  height = grid.length;
  width = grid[0].length;
  const changesQueue = [
    {
      row: startCell.row,
      col: startCell.col,
      color: "processing",
    },
  ];

  parent = Array(height)
    .fill()
    .map(() => Array(width).fill(-1));

  const gScore = Array(height)
    .fill()
    .map(() => Array(width).fill(Infinity));

  const fScore = Array(height)
    .fill()
    .map(() => Array(width).fill(Infinity));

  const openSet = new Set();
  const closedSet = new Set();

  gScore[startCell.row][startCell.col] = 0;
  fScore[startCell.row][startCell.col] = heuristic(startCell, endCell);
  parent[startCell.row][startCell.col] = [-2, -2];

  openSet.add(startCell);

  let found = false;
  while (openSet.size > 0) {
    let minFScore = Infinity;
    let currentCell;
    for (const cell of openSet) {
      if (fScore[cell.row][cell.col] < minFScore) {
        minFScore = fScore[cell.row][cell.col];
        currentCell = cell;
      }
    }
    if (currentCell.row === endCell.row && currentCell.col === endCell.col) {
      found = true;
      break;
    }
    openSet.delete(currentCell);
    closedSet.add(currentCell);
    changesQueue.push({
      row: currentCell.row,
      col: currentCell.col,
      color: "visited",
    });
    const neighbors = getNeighbors(currentCell.row, currentCell.col).filter(
      ([newRow, newCol]) => {
        return grid[newRow][newCol].color !== "wall";
      }
    );
    for (const [newRow, newCol] of neighbors) {
      if (closedSet.has({ row: newRow, col: newCol })) continue;
      const tentativeGScore =
        gScore[currentCell.row][currentCell.col] +
        heuristic(currentCell, { row: newRow, col: newCol });
      if (tentativeGScore < gScore[newRow][newCol]) {
        parent[newRow][newCol] = [currentCell.row, currentCell.col];
        gScore[newRow][newCol] = tentativeGScore;
        fScore[newRow][newCol] =
          gScore[newRow][newCol] +
          heuristic({ row: newRow, col: newCol }, endCell);
        if (!openSet.has({ row: newRow, col: newCol })) {
          openSet.add({ row: newRow, col: newCol });
          changesQueue.push({
            row: newRow,
            col: newCol,
            color: "processing",
          });
        }
      }
    }
  }
  if (!found) {
    return {
      changes: changesQueue,
      found: false,
    };
  }
  const path = [];
  let [row, col] = [endCell.row, endCell.col];
  while (row !== -2 && col !== -2) {
    path.push({ row, col });
    [row, col] = parent[row][col];
  }
  path.reverse();
  for (const cell of path) {
    changesQueue.push({
      row: cell.row,
      col: cell.col,
      color: "path",
    });
  }
  return {
    changes: changesQueue,
    found: true,
  };
};

export default astar;
