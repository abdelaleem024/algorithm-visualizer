import React from "react";
import styles from "./Cell.module.css";
import { CELL_STYLE } from "../../constants/constants";
import startCell from "../../assets/icons/start-cell.svg";
import BonusCell from "../../assets/icons/bonus-cell.svg";
import endCell from "../../assets/icons/end-cell.svg";

const Cell = React.memo(function Cell({
  cell,
  row,
  col,
  handleUpdateCell,
  cellSize = 20,
  isStartCell,
  isEndCell,
  startStyles,
}) {
  const { isBonus, color } = cell;

  return (
    <div
      className={styles.cell}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: CELL_STYLE[color],
      }}
      onMouseOver={() => handleUpdateCell(row, col)}
      onClick={() => handleUpdateCell(row, col, true)}
    >
      {isBonus && (
        <img
          src={BonusCell}
          alt="Bonus Cell"
          className={styles.iconCell}
          height={cellSize}
          width={cellSize}
        />
      )}
      {isStartCell && (
        <img
          src={startCell}
          alt="Start Cell"
          className={styles.iconCell}
          height={cellSize - 10}
          width={cellSize - 10}
          style={startStyles}
        />
      )}
      {isEndCell && (
        <img
          src={endCell}
          alt="End Cell"
          className={styles.iconCell}
          height={cellSize}
          width={cellSize}
        />
      )}
    </div>
  );
});

export default Cell;
