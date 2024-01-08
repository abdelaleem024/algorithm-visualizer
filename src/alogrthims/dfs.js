let height, width;
let parent = [];
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isValid = (row, col) => {
  return (
    row >= 0 &&
    row < height &&
    col >= 0 &&
    col < width &&
    parent[row][col] === -1
  );
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
  neighbors.reverse();
  return neighbors;
};

const dfs = (grid, startCell, endCell) => {
  height = grid.length;
  width = grid[0].length;
  parent = Array(height)
    .fill()
    .map(() => Array(width).fill(-1));
  parent[startCell.row][startCell.col] = [-2, -2];
  const changesQueue = [
    {
      row: startCell.row,
      col: startCell.col,
      color: "processing",
    },
  ];
  const dfsStack = [startCell];
  let found = false;

  while (dfsStack.length > 0) {
    const { row, col } = dfsStack.pop();
    changesQueue.push({
      row: row,
      col: col,
      color: "visited",
    });
    if (row === endCell.row && col === endCell.col) {
      found = true;
      break;
    }
    const neighbors = getNeighbors(row, col).filter(([newRow, newCol]) => {
      return grid[newRow][newCol].color !== "wall";
    });
    for (const [newRow, newCol] of neighbors) {
      parent[newRow][newCol] = [row, col];
      dfsStack.push({ row: newRow, col: newCol });
      changesQueue.push({
        row: newRow,
        col: newCol,
        color: "processing",
      });
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

export default dfs;
