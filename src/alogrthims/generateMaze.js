const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomMaze = (rows, cols) => {
  const numberOfCells = rows * cols;
  const numberOfWalls = randomInRange(numberOfCells / 4, numberOfCells / 3);
  const changesSet = new Set();
  while (changesSet.size < numberOfWalls) {
    const row = randomInRange(0, rows - 1);
    const col = randomInRange(0, cols - 1);
    changesSet.add(row * cols + col);
  }
  const changes = Array.from(changesSet).map((change) => {
    return {
      row: Math.floor(change / cols),
      col: change % cols,
      color: "wall",
    };
  });
  const random = randomInRange(0, 5);
  if (random < 2) {
    changes.sort((a, b) => {
      return a.row - b.row || a.col - b.col;
    });
    if (random === 0) changes.reverse();
  } else if (random < 4) {
    changes.sort((a, b) => {
      return a.col - b.col || a.row - b.row;
    });
    if (random === 2) changes.reverse();
  }
  const { startCell, endCell } = getStartAndEnd(rows, cols, changesSet);
  return {
    changes: changes,
    start: startCell,
    end: endCell,
  };
};

const getStartAndEnd = (rows, cols, changesSet) => {
  const visited = new Set();
  let farthestCell1 = null;
  let farthestCell2 = null;
  let maxDistance = -1;

  const distance = (cell1, cell2) => {
    return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col);
  };

  // Iterate through each cell in the maze
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentCell = { row, col };
      const currentKey = row * cols + col;

      // Check if the cell is not a wall and hasn't been visited
      if (!changesSet.has(currentKey) && !visited.has(currentKey)) {
        const stack = [currentCell];
        let currentDistance = 0;

        // Perform a Depth-First Search to find the farthest cell from the current cell
        while (stack.length > 0) {
          const current = stack.pop();
          const key = current.row * cols + current.col;

          if (!visited.has(key)) {
            visited.add(key);
            currentDistance = distance(currentCell, current);

            // Update the farthest cell if a new maximum distance is found
            if (currentDistance > maxDistance) {
              maxDistance = currentDistance;
              farthestCell1 = currentCell;
              farthestCell2 = current;
            }

            const neighbors = [
              { row: current.row - 1, col: current.col },
              { row: current.row + 1, col: current.col },
              { row: current.row, col: current.col - 1 },
              { row: current.row, col: current.col + 1 },
            ];

            // Add unvisited neighbors to the stack
            for (const neighbor of neighbors) {
              const neighborKey = neighbor.row * cols + neighbor.col;

              if (
                neighbor.row >= 0 &&
                neighbor.row < rows &&
                neighbor.col >= 0 &&
                neighbor.col < cols &&
                !changesSet.has(neighborKey) &&
                !visited.has(neighborKey)
              ) {
                stack.push(neighbor);
              }
            }
          }
        }
      }
    }
  }

  return { startCell: farthestCell1, endCell: farthestCell2 };
};

export default randomMaze;
