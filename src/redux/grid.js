import { createSlice } from "@reduxjs/toolkit";
import { visualizerStateMap } from "../constants/constants";
import randomMaze from "../alogrthims/generateMaze";
import { algorithmsMap } from "../constants/constants";
import { CELL, GRID_SIZE } from "../constants/constants";

const initialState = {
  grid: [[]],
  undoStack: [],
  showLoader: true,
  startCell: { row: 0, col: 0 },
  endCell: { row: 1, col: 1 },
  visualizerState: visualizerStateMap.idle,
  changesQueue: [],
  speed: 3,
  cellSize: 40,
  selectedCellType: "wall",
  selectedAlgorithm: null,
};

const reducers = {
  showLoader(state, action) {
    state.showLoader = action.payload;
  },
  undo(state) {
    if (state.undoStack.length === 0) return;
    const { row, col, cell } = state.undoStack.pop();
    state.grid[row][col] = cell;
  },
  checkChangesQueue(state) {
    if (state.visualizerState === visualizerStateMap.paused) {
      return;
    }
    if (state.changesQueue.length === 0) {
      if (state.visualizerState === visualizerStateMap.running) {
        state.visualizerState = visualizerStateMap.finished;
      }
      return;
    }
    const speed = state.speed;
    const updates = state.changesQueue.slice(0, speed);
    updates.forEach((update) => {
      const { row, col, color } = update;
      state.grid[row][col].color = color;
    });
    state.changesQueue = state.changesQueue.slice(speed);
  },
  generateRandomMaze(state) {
    const { changes, start, end } = randomMaze(
      state.grid.length,
      state.grid[0].length
    );
    state.grid.forEach((row) => {
      row.forEach((cell) => {
        cell.color = "empty";
      });
    });
    state.startCell = start;
    state.endCell = end;
    state.changesQueue = changes;
    state.visualizerState = visualizerStateMap.running;
  },
  updateSelectedAlgorithm(state, action) {
    state.selectedAlgorithm = action.payload.algorithm;
  },
  claerGrid(state) {
    state.undoStack = [];
    state.visualizerState = visualizerStateMap.idle;
    state.changesQueue = [];
    state.grid.forEach((row) => {
      row.forEach((cell) => {
        cell.color = "empty";
      });
    });
  },
  updateSpeed(state, action) {
    state.speed = action.payload.speed;
  },
  updateCellSize(state, action) {
    if (state.visualizerState === visualizerStateMap.running) {
      return;
    }
    const { cellSize } = action.payload;
    state.visualizerState = visualizerStateMap.idle;
    state.showLoader = true;
    state.undoStack = [];
    state.cellSize = cellSize;
    state.changesQueue = [];
  },
  updateSelectedCellType(state, action) {
    state.selectedCellType = action.payload.selectedCellType;
  },
  skipChangesQueue(state) {
    state.changesQueue.forEach((change) => {
      state.grid[change.row][change.col].color = change.color;
    });
    state.changesQueue = [];
    state.visualizerState = visualizerStateMap.finished;
  },
  updateVisualizerState(state, action) {
    state.visualizerState = action.payload.visualizerState;
  },
  startVisualizer(state) {
    if (state.selectedAlgorithm === null) {
      return;
    }
    /// clear the existing path to start a new one
    state.grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.color !== "wall") {
          cell.color = "empty";
        }
      });
    });
    const { changes } = algorithmsMap[state.selectedAlgorithm](
      state.grid,
      state.startCell,
      state.endCell
    );
    state.changesQueue = changes;
    state.visualizerState = visualizerStateMap.running;
  },
  updateCell(state, action) {
    if (state.visualizerState === visualizerStateMap.running) {
      return;
    }
    /// clear the existing path first
    state.grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.color !== "wall") {
          cell.color = "empty";
        }
      });
    });

    const { row, col } = action.payload;
    const selectedCellType = state.selectedCellType;

    const isTheStartCell =
      state.startCell.row === row && state.startCell.col === col;

    const isTheEndCell = state.endCell.row === row && state.endCell.col === col;

    if (selectedCellType === "wall") {
      if (
        isTheStartCell ||
        isTheEndCell ||
        state.grid[row][col].color === "wall"
      ) {
        return;
      }
      state.grid[row][col].color = "wall";
    } else if (selectedCellType === "empty") {
      if (state.grid[row][col].color === "empty") {
        return;
      }
      state.grid[row][col].color = "empty";
    } else if (selectedCellType === "start") {
      if (isTheEndCell || isTheEndCell) {
        return;
      }
      state.startCell = { row, col };
    } else if (selectedCellType === "end") {
      if (isTheStartCell || isTheStartCell) {
        return;
      }
      state.endCell = { row, col };
    }
    state.undoStack.push({ row, col, cell: state.grid[row][col] });
  },
  resizingScreen(state, action) {
    const { width, height } = action.payload;
    if (!width || !height) {
      console.assert("width and height are required");
      return;
    }
    const { cellSize, startCell, endCell } = state;
    const cols = Math.min(
      Math.floor(width / (cellSize + 2)),
      GRID_SIZE.WIDTH_MAX
    );
    const rows = Math.min(
      Math.floor(height / (cellSize + 2)),
      GRID_SIZE.HEIGHT_MAX
    );
    let newGrid; //// TODO: optimize this
    if (state.grid) {
      newGrid = state.grid.map((row) => {
        let newRow = [...row];
        while (newRow.length > cols) {
          newRow.pop();
        }
        while (newRow.length < cols) {
          newRow.push({ ...CELL });
        }
        return newRow;
      });
      while (newGrid.length > rows) {
        newGrid.pop();
      }
      while (newGrid.length < rows) {
        newGrid.push(Array.from(Array(cols), () => ({ ...CELL })));
      }
    } else {
      newGrid = Array.from(Array(rows), () =>
        Array.from(Array(cols), () => ({
          ...CELL,
        }))
      );
    }
    const newStartCell = {
      row: Math.min(startCell.row, rows - 1),
      col: Math.min(startCell.col, cols - 1),
    };
    let newEndCell = {
      row: Math.min(endCell.row, rows - 1),
      col: Math.min(endCell.col, cols - 1),
    };
    while (
      newEndCell.row === newStartCell.row &&
      newEndCell.col === newStartCell.col
    ) {
      newEndCell.row = Math.floor(Math.random() * rows);
      newEndCell.col = Math.floor(Math.random() * cols);
    }
    newGrid[newEndCell.row][newEndCell.col].color = "empty";
    newGrid[newStartCell.row][newStartCell.col].color = "empty";
    state.undoStack = [];
    state.grid = newGrid;
    state.startCell = newStartCell;
    state.endCell = newEndCell;
    state.showLoader = false;
  },
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers,
});

export default gridSlice.reducer;
export const gridActions = gridSlice.actions;
