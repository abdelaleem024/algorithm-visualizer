import { memo } from "react";
import classes from "./Cell.module.css";
import { CELL_STYLE } from "../../constants/constants";
import startCell from "../../assets/icons/start-cell.svg";
import endCell from "../../assets/icons/end-cell.svg";
import areEqual from "../../utils/compareObjects";
import { useSelector, useDispatch } from "react-redux";
import { selectCellSize } from "../../redux/selectors";
import { gridActions } from "../../redux/grid";
import log from "../../utils/log";

const Cell = memo(function Cell({
  cell,
  row,
  col,
  isStartCell,
  isEndCell,
  styles,
  isMouseDown,
}) {
  log(`${row} - ${col} <Cell/ >  rendering`);
  const dispatch = useDispatch();
  const cellSize = useSelector(selectCellSize);
  const { color } = cell;

  const handleUpdateCell = (isClicked) => {
    if (isMouseDown || isClicked) {
      dispatch(gridActions.updateCell({ row, col }));
    }
  };
  const userOnboardingID = `cell-${row}-${col}`;

  return (
    <div
      className={`${classes.cell}`}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: CELL_STYLE[color],
      }}
      onMouseEnter={() => handleUpdateCell(false)}
      onClick={() => handleUpdateCell(true)}
      id={userOnboardingID}
    >
      {isStartCell && (
        <img
          src={startCell}
          alt="Start Cell"
          className={`${classes.iconCell}`}
          height={cellSize - 10}
          width={cellSize - 10}
          style={styles}
        />
      )}
      {isEndCell && (
        <img
          src={endCell}
          alt="End Cell"
          className={`${classes.iconCell}`}
          height={cellSize}
          width={cellSize}
        />
      )}
    </div>
  );
},
areEqual);

export default Cell;
