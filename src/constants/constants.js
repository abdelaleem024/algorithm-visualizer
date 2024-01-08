const CELL = {
  isBonus: false,
  color: "empty",
};

const CELL_STYLE = {
  wall: "black",
  visited: "#457B9D",
  processing: "#A8DADC",
  path: "#E63946",
  empty: null,
};

const Mousetracker = {
  max: 50,
  min: 10,
};

const CellSize = {
  MAX: 50,
  MIN: 30,
};

const visualizerStateMap = {
  idle: "idle",
  paused: "paused",
  running: "running",
  finished: "finished",
};

export { CELL };
export { CELL_STYLE };
export { Mousetracker };
export { CellSize };
export { visualizerStateMap };
