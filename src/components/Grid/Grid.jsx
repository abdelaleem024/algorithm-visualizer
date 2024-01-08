import { useEffect, useState } from "react";
import styles from "./Grid.module.css";
import { CELL as cell } from "../../constants/constants";
import Cell from "./Cell";
import Loader from "../Loader/Loader";
import { produce } from "immer";

export default function Grid({
  cellSize,
  state,
  showLoader,
  setShowLoader,
  grid,
  handleRebuildGrid,
  setGrid,
  startCell,
  setStartCell,
  endCell,
  setEndCell,
  handlePushToUndoStack,
  isRunning,
  handleClearPath,
}) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const startStyles = {
    // Rotate the start cell to the direction of the end cell
    transform: `rotate(${
      Math.atan2(endCell.row - startCell.row, endCell.col - startCell.col) *
      (180 / Math.PI)
    }deg)`,
  };

  useEffect(() => {
    const handleResize = () => {
      setShowLoader(true);
      const innerWidth = window.innerWidth - 150;
      const innerHeight = window.innerHeight - 150;
      setWindowSize({ width: innerWidth, height: innerHeight });
    };

    const handleOnMouseup = () => setIsMouseDown(false);
    const handleOnMouseDown = () => setIsMouseDown(true);

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
  }, []);

  useEffect(() => {
    const rebuildGrid = () => {
      if (!windowSize.width || !windowSize.height) return;
      const cellSizeNum = parseInt(cellSize);
      const width = Math.floor(windowSize.width / (cellSizeNum + 2));
      const height = Math.floor(windowSize.height / (cellSizeNum + 2));

      let newGrid;
      if (grid) {
        newGrid = grid.map((row) => {
          let newRow = [...row];
          while (newRow.length > width) {
            newRow.pop();
          }
          while (newRow.length < width) {
            newRow.push({ ...cell });
          }
          return newRow;
        });
        while (newGrid.length > height) {
          newGrid.pop();
        }
        while (newGrid.length < height) {
          newGrid.push(Array.from(Array(width), () => ({ ...cell })));
        }
      } else {
        newGrid = Array.from(Array(height), () =>
          Array.from(Array(width), () => ({
            ...cell,
          }))
        );
      }

      handleRebuildGrid(newGrid);
      setShowLoader(false);
    };
    rebuildGrid();
  }, [cellSize, windowSize]);

  const handleUpdateCell = (row, col, isCliked = isMouseDown) => {
    if (!state || !isCliked || isRunning) return;
    handleClearPath();
    const newGrid = produce((draftGrid) => {
      if (state === "wall") {
        if (startCell.row === row && startCell.col === col) return;
        if (endCell.row === row && endCell.col === col) return;
        if (draftGrid[row][col].color === "wall") return;
        handlePushToUndoStack({
          row: row,
          col: col,
          cell: { ...draftGrid[row][col] },
        });
        draftGrid[row][col].isBonus = false;
        draftGrid[row][col].color = "wall";
      } else if (state === "empty") {
        if (
          !draftGrid[row][col].isBonus &&
          draftGrid[row][col].color === "empty"
        )
          return;
        handlePushToUndoStack({
          row: row,
          col: col,
          cell: { ...draftGrid[row][col] },
        });
        draftGrid[row][col].isBonus = false;
        draftGrid[row][col].color = "empty";
      } else if (state === "bonus") {
        if (startCell.row === row && startCell.col === col) return;
        if (endCell.row === row && endCell.col === col) return;
        if (
          draftGrid[row][col].isBonus &&
          draftGrid[row][col].color === "empty"
        )
          return;
        handlePushToUndoStack({
          row: row,
          col: col,
          cell: { ...draftGrid[row][col] },
        });
        draftGrid[row][col].isBonus = true;
        draftGrid[row][col].color = "empty";
      } else if (state === "start") {
        if (endCell.row === row && endCell.col === col) return;
        draftGrid[row][col].isBonus = false;
        draftGrid[row][col].color = "empty";
        setStartCell({ row, col });
      } else if (state === "end") {
        if (startCell.row === row && startCell.col === col) return;
        draftGrid[row][col].isBonus = false;
        draftGrid[row][col].color = "empty";
        setEndCell({ row, col });
      }
    });
    setGrid(newGrid);
  };

  return (
    <div
      className={styles.gridContainer}
      style={{
        cursor: isRunning ? "not-allowed" : "auto",
      }}
    >
      <div
        style={{ width: windowSize.width, height: windowSize.height }}
        className={styles.grid}
      >
        {showLoader || !grid ? (
          <Loader />
        ) : (
          grid.map((row, i) => (
            <div key={i} className={styles.row}>
              {row.map((cell, j) => (
                <Cell
                  key={j}
                  cell={cell}
                  row={i}
                  col={j}
                  handleUpdateCell={handleUpdateCell}
                  cellSize={cellSize}
                  isStartCell={i === startCell.row && j === startCell.col}
                  isEndCell={i === endCell.row && j === endCell.col}
                  startStyles={startStyles}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
