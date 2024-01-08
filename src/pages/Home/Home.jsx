import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";
import Grid from "../../components/Grid/Grid";
import SettingsBar from "../../components/SettingsBar/SettingsBar";
import { CELL } from "../../constants/constants";
import { produce } from "immer";
import randomizedPrim from "../../alogrthims/generateMaze";
import bfs from "../../alogrthims/bfs";
import dfs from "../../alogrthims/dfs";
import astar from "../../alogrthims/astar";
import bidirectional from "../../alogrthims/bidirectional";
import { visualizerStateMap } from "../../constants/constants";

const algorithms = [
  "Breadth First Search",
  "Depth First Search",
  "A* Search",
  "Bi-directional Search",
];
const algorithmsMap = {
  "Breadth First Search": bfs,
  "Depth First Search": dfs,
  "A* Search": astar,
  "Bi-directional Search": bidirectional,
};

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [speed, setSpeed] = useState(3);
  const [cellSize, setCellSize] = useState(50);
  const [state, setState] = useState("empty");

  const [visualizerState, setVisualizerState] = useState(
    visualizerStateMap.idle
  );

  const [showLoader, setShowLoader] = useState(true);
  const [grid, setGrid] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [startCell, setStartCell] = useState({ row: 0, col: 0 });
  const [endCell, setEndCell] = useState({ row: 1, col: 1 });
  const [changesQueue, setChangesQueue] = useState([]);

  useEffect(() => {
    const handleUndo = (e) => {
      if (redoStack.length === 0 || !e.ctrlKey || e.key !== "z") {
        return;
      }
      const { row, col, cell } = redoStack[redoStack.length - 1];
      const newGrid = produce(grid, (gridCopy) => {
        gridCopy[row][col] = cell;
      });
      setGrid(newGrid);
      setRedoStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    };
    window.addEventListener("keydown", handleUndo);
    return () => {
      window.removeEventListener("keydown", handleUndo);
    };
  }, [redoStack, grid]);

  useEffect(() => {
    if (visualizerState === visualizerStateMap.paused) {
      return;
    }
    if (changesQueue.length === 0) {
      setVisualizerState(visualizerStateMap.finished);
      return;
    }
    const updates = changesQueue.slice(0, speed);
    const newGrid = produce(grid, (gridCopy) => {
      updates.forEach((update) => {
        const { row, col, color } = update;
        gridCopy[row][col].color = color;
      });
    });
    setGrid(newGrid);
    setChangesQueue((prevQueue) => prevQueue.slice(speed));
  }, [changesQueue, visualizerState]);

  const handleChangeAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handlePushToUndoStack = (update) => {
    setRedoStack((prev) => [...prev, update]);
  };

  const handleChangeSpeed = (value) => {
    setSpeed(value);
  };

  const handleChangeCellSize = (value) => {
    setRedoStack([]);
    setVisualizerState(visualizerStateMap.idle);
    setChangesQueue([]);
    handleClearPath();
    setShowLoader(true);
    setCellSize(value);
  };

  const handleChangeState = (newState) => {
    setState(newState);
  };

  const handleSkip = () => {
    setGrid((prevGrid) => {
      const newGrid = produce(prevGrid, (gridCopy) => {
        changesQueue.forEach((change) => {
          gridCopy[change.row][change.col].color = change.color;
        });
      });
      return newGrid;
    });
    setChangesQueue([]);
    setVisualizerState(visualizerStateMap.finished);
  };

  const handleClear = () => {
    setRedoStack([]);
    setVisualizerState(visualizerStateMap.idle);
    setChangesQueue([]);
    const newGrid = grid.map((row) =>
      row.map(() => {
        return CELL;
      })
    );
    setGrid(newGrid);
  };

  const handleClearPath = () => {
    setChangesQueue([]);
    const newGridWithoutVisited = produce(grid, (gridCopy) => {
      gridCopy.forEach((row) => {
        row.forEach((cell) => {
          if (cell.color === "wall") {
            return;
          } else {
            cell.color = "empty";
          }
        });
      });
    });
    setGrid(newGridWithoutVisited);
  };

  const handleRebuildGrid = (newGrid) => {
    if (visualizerState === visualizerStateMap.running) {
      return;
    }
    setRedoStack([]);

    const newStartCell = {
      row: Math.min(startCell.row, newGrid.length - 1),
      col: Math.min(startCell.col, newGrid[0].length - 1),
    };
    let newEndCell = {
      row: Math.min(endCell.row, newGrid.length - 1),
      col: Math.min(endCell.col, newGrid[0].length - 1),
    };
    if (newGrid[newStartCell.row][newStartCell.col].color === "wall") {
      newGrid[newStartCell.row][newStartCell.col] = CELL;
    }
    if (newGrid[newEndCell.row][newEndCell.col].color === "wall") {
      newGrid[newEndCell.row][newEndCell.col] = CELL;
    }
    if (startCell.row === endCell.row && startCell.col === endCell.col) {
      do {
        newEndCell.row = Math.floor(Math.random() * newGrid.length);
        newEndCell.col = Math.floor(Math.random() * newGrid[0].length);
      } while (
        newGrid[newEndCell.row][newEndCell.col].color === "wall" ||
        (newEndCell.row === newStartCell.row &&
          newEndCell.col === newStartCell.col)
      );
    }
    setGrid(newGrid);
    setStartCell(newStartCell);
    setEndCell(newEndCell);
  };

  const handleStartVisualization = () => {
    if (!selectedAlgorithm) {
      return;
    }
    if (visualizerState === visualizerStateMap.finished) {
      handleClearPath();
    }
    setVisualizerState(visualizerStateMap.running);
    const { changes, found } = algorithmsMap[selectedAlgorithm](
      grid,
      startCell,
      endCell
    );
    setChangesQueue(changes);
  };

  const handlePauseContinueVisualization = () => {
    if (visualizerState === visualizerStateMap.running) {
      setVisualizerState(visualizerStateMap.paused);
    } else if (visualizerState === visualizerStateMap.paused) {
      setVisualizerState(visualizerStateMap.running);
    }
  };

  const handleGenerateMaze = () => {
    handleClear();
    const { changes, start, end } = randomizedPrim(grid.length, grid[0].length);
    setStartCell(start);
    setEndCell(end);
    setVisualizerState(visualizerStateMap.running);
    setChangesQueue(changes);
  };

  return (
    <div className={styles.home}>
      <Header
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        handleChangeAlgorithm={handleChangeAlgorithm}
        handleGenerateMaze={handleGenerateMaze}
      />
      <SettingsBar
        speed={speed}
        handleChangeSpeed={handleChangeSpeed}
        cellSize={cellSize}
        handleChangeCellSize={handleChangeCellSize}
        visualizerState={visualizerState}
        handleStartVisualization={handleStartVisualization}
        handlePauseContinueVisualization={handlePauseContinueVisualization}
        handleSkip={handleSkip}
        handleClear={handleClear}
        state={state}
        enableStart={selectedAlgorithm !== null}
        handleChangeState={handleChangeState}
      />
      <Grid
        cellSize={cellSize}
        state={state}
        showLoader={showLoader}
        setShowLoader={setShowLoader}
        grid={grid}
        setGrid={setGrid}
        handleRebuildGrid={handleRebuildGrid}
        startCell={startCell}
        setStartCell={setStartCell}
        endCell={endCell}
        setEndCell={setEndCell}
        isRunning={visualizerState === visualizerStateMap.running}
        handlePushToUndoStack={handlePushToUndoStack}
        handleClearPath={handleClearPath}
      />
      <Footer />
    </div>
  );
}
