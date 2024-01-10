import { useEffect, useRef, useState } from "react";
import classes from "./Grid.module.css";
import Cell from "./Cell";
import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { gridActions } from "../../redux/grid.js";
import { visualizerStateMap } from "../../constants/constants";
import {
  selectCellSize,
  selectGrid,
  selectShowLoader,
  selectSpeed,
  selectUndoStack,
  selectStartCell,
  selectEndCell,
  selectVisualizerState,
  selectChangesQueue,
} from "../../redux/selectors.js";
import log from "../../utils/log.js";

function Grid() {
  log("<Grid /> rendering");

  const dispatch = useDispatch();

  const grid = useSelector(selectGrid);
  const cellSize = useSelector(selectCellSize);
  const speed = useSelector(selectSpeed);
  const showLoader = useSelector(selectShowLoader);
  const startCell = useSelector(selectStartCell);
  const endCell = useSelector(selectEndCell);
  const visualizerState = useSelector(selectVisualizerState);
  const changesQueue = useSelector(selectChangesQueue);
  const undoStack = useSelector(selectUndoStack);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const isRunning = visualizerState === visualizerStateMap.running;

  const startStyles = {
    // Rotate the start cell to the direction of the end cell
    transform: `rotate(${
      Math.atan2(endCell.row - startCell.row, endCell.col - startCell.col) *
      (180 / Math.PI)
    }deg)`,
  };

  // Undo functionality
  useEffect(() => {
    const handleUndo = (e) => {
      if (e.ctrlKey && e.key === "z") {
        dispatch(gridActions.undo());
      }
    };
    window.addEventListener("keydown", handleUndo);
    return () => window.removeEventListener("keydown", handleUndo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoStack]);
  const ref = useRef(null);

  /// window listeners
  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth - 30;
      const innerHeight = window.innerHeight - 30;

      if (
        windowSize.width > 0 &&
        Math.abs(innerWidth - windowSize.width) < cellSize
      ) {
        return;
      }
      dispatch(gridActions.showLoader(true));
      setWindowSize({ width: innerWidth, height: innerHeight });
    };

    const handleOnMouseup = () => setIsMouseDown(false);
    const handleOnMouseDown = (e) =>
      setIsMouseDown(ref.current && ref.current.contains(e.target));

    handleResize();

    window.addEventListener("blur", handleOnMouseup);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mouseup", handleOnMouseup);
    window.addEventListener("mousedown", handleOnMouseDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseup", handleOnMouseup);
      window.removeEventListener("mousedown", handleOnMouseDown);
      window.removeEventListener("blur", handleOnMouseup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize, showLoader]);

  /// anmiation loop
  useEffect(() => {
    const ref = setTimeout(
      () => dispatch(gridActions.checkChangesQueue()),
      Math.floor(100 / speed)
    );
    return () => {
      clearTimeout(ref);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, changesQueue, visualizerState]);

  useEffect(() => {
    if (showLoader) {
      dispatch(gridActions.resizingScreen(windowSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellSize, windowSize, showLoader]);

  const UserOnboardingID = "grid";

  return (
    <div className={`${classes.gridContainer}`}>
      <div
        className={`${classes.grid}`}
        style={{
          width: windowSize.width,
          height: windowSize.height,
          cursor: isRunning ? "not-allowed" : "auto",
        }}
        ref={ref}
        id={UserOnboardingID}
      >
        {showLoader || !grid ? (
          <Loader />
        ) : (
          grid.map((row, i) => (
            <div key={i} className={`${classes.row}`}>
              {row.map((cell, j) => {
                const isStartCell = i === startCell.row && j === startCell.col;
                const isEndCell = i === endCell.row && j === endCell.col;
                return (
                  <Cell
                    key={`${i}-${j}`}
                    cell={cell}
                    row={i}
                    col={j}
                    isStartCell={isStartCell}
                    isEndCell={isEndCell}
                    styles={isStartCell ? startStyles : {}}
                    isMouseDown={isMouseDown}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Grid;
