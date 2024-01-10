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

const bfs = (grid, startCell, endCell) => {
  height = grid.length;
  width = grid[0].length;

  const bfsQueue = [startCell];
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
  parent[startCell.row][startCell.col] = [-2, -2];
  let found = false;
  while (bfsQueue.length > 0) {
    const { row, col } = bfsQueue.shift();
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
      bfsQueue.push({
        row: newRow,
        col: newCol,
      });
      changesQueue.push({
        row: newRow,
        col: newCol,
        color: "processing",
      });
      parent[newRow][newCol] = [row, col];
    }
  }
  if (!found) return { changes: changesQueue, found: found };
  let path = [];
  let current = endCell;
  while (current.row !== -2 && current.col !== -2) {
    path.push(current);
    current = {
      row: parent[current.row][current.col][0],
      col: parent[current.row][current.col][1],
    };
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
    found: found,
  };
};

export default bfs;
