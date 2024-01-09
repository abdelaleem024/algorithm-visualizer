const CELL = {
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

const SPEED = {
  MIN: 1,
  MAX: 10,
};

import bfs from "../alogrthims/bfs";
// import dfs from "../alogrthims/dfs";
import astar from "../alogrthims/astar";
import bidirectional from "../alogrthims/bidirectional";

const algorithms = [
  "Breadth First Search",
  // "Depth First Search",
  "A* Search",
  "Bi-directional Search",
];

const algorithmsMap = {
  "Breadth First Search": bfs,
  // "Depth First Search": dfs,
  "A* Search": astar,
  "Bi-directional Search": bidirectional,
};

const GRID_SIZE = {
  HEIGHT_MAX: 36,
  WIDTH_MAX: 75,
};

export { CELL };
export { CELL_STYLE };
export { Mousetracker };
export { CellSize };
export { visualizerStateMap };
export { algorithms };
export { algorithmsMap };
export { SPEED };
export { GRID_SIZE };
