const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let height, width;
let parentEnd = [];
let parentStart = [];

const isValid = (row, col) => {
  return row >= 0 && row < height && col >= 0 && col < width;
};

const getNeighbors = (row, col) => {
  const neighbors = [];
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (isValid(newRow, newCol)) {
      neighbors.push([newRow, newCol]);
    }
  }
  return neighbors;
};

const bidirectional = (grid, start, end) => {
  height = grid.length;
  width = grid[0].length;
  parentStart = Array(height)
    .fill()
    .map(() => Array(width).fill(-1));
  parentEnd = Array(height)
    .fill()
    .map(() => Array(width).fill(-1));

  parentEnd[end.row][end.col] = [-2, -2];
  parentStart[start.row][start.col] = [-2, -2];

  const changesQueue = [
    {
      row: start.row,
      col: start.col,
      color: "processing",
    },
    {
      row: end.row,
      col: end.col,
      color: "processing",
    },
  ];
  const Queue = [];
  Queue.push({
    state: "start",
    row: start.row,
    col: start.col,
  });
  Queue.push({
    state: "end",
    row: end.row,
    col: end.col,
  });
  let meetPoint = null;
  let startStateCount = 1;
  let endStateCount = 1;
  while (
    Queue.length > 0 &&
    startStateCount > 0 &&
    endStateCount > 0 &&
    meetPoint === null
  ) {
    const { state, row, col } = Queue.shift();
    if (state === "start") {
      startStateCount--;
    } else {
      endStateCount--;
    }

    const neighbors = getNeighbors(row, col).filter(
      ([newRow, newCol]) => grid[newRow][newCol].color !== "wall"
    );
    changesQueue.push({
      row,
      col,
      color: "visited",
    });
    for (const [newRow, newCol] of neighbors) {
      if (state === "start") {
        if (parentEnd[newRow][newCol] !== -1) {
          meetPoint = [newRow, newCol];
          parentStart[newRow][newCol] = [row, col];
          break;
        } else if (parentStart[newRow][newCol] !== -1) {
          continue;
        }
        startStateCount++;
        parentStart[newRow][newCol] = [row, col];
        Queue.push({
          state: "start",
          row: newRow,
          col: newCol,
        });
        changesQueue.push({
          row: newRow,
          col: newCol,
          color: "processing",
        });
      } else {
        if (parentStart[newRow][newCol] !== -1) {
          meetPoint = [newRow, newCol];
          parentEnd[newRow][newCol] = [row, col];
          break;
        } else if (parentEnd[newRow][newCol] !== -1) {
          continue;
        }
        endStateCount++;
        parentEnd[newRow][newCol] = [row, col];
        Queue.push({
          state: "end",
          row: newRow,
          col: newCol,
        });
        changesQueue.push({
          row: newRow,
          col: newCol,
          color: "processing",
        });
      }
    }
  }
  if (meetPoint === null) {
    return {
      changes: changesQueue,
      found: false,
    };
  }
  const path = [];
  let [row, col] = meetPoint;
  while (row !== -2 && col !== -2) {
    path.push({ row, col });
    [row, col] = parentStart[row][col];
  }

  path.reverse();
  [row, col] = meetPoint;
  while (row !== -2 && col !== -2) {
    path.push({ row, col });
    [row, col] = parentEnd[row][col];
  }

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

export default bidirectional;
