import { createSelector, setGlobalDevModeChecks } from "reselect";

setGlobalDevModeChecks({ identityFunctionCheck: "never" });

export const selectGrid = createSelector(
  (state) => state.grid.grid,
  (grid) => grid
);

export const selectUndoStack = createSelector(
  (state) => state.grid.undoStack,
  (undoStack) => undoStack
);

export const selectShowLoader = createSelector(
  (state) => state.grid.showLoader,
  (showLoader) => showLoader
);

export const selectStartCell = createSelector(
  (state) => state.grid.startCell,
  (startCell) => startCell
);

export const selectEndCell = createSelector(
  (state) => state.grid.endCell,
  (endCell) => endCell
);

export const selectVisualizerState = createSelector(
  (state) => state.grid.visualizerState,
  (visualizerState) => visualizerState
);

export const selectChangesQueue = createSelector(
  (state) => state.grid.changesQueue,
  (changesQueue) => changesQueue
);

export const selectSpeed = createSelector(
  (state) => state.grid.speed,
  (speed) => speed
);

export const selectCellSize = createSelector(
  (state) => state.grid.cellSize,
  (cellSize) => cellSize
);

export const selectSelectedCellType = createSelector(
  (state) => state.grid.selectedCellType,
  (selectedCellType) => selectedCellType
);

export const selectSelectedAlgorithm = createSelector(
  (state) => state.grid.selectedAlgorithm,
  (selectedAlgorithm) => selectedAlgorithm
);
