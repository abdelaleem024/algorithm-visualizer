import classes from "./CellLabdel.module.css";
import log from "./../../utils/log";

function CellLabdel({ children, label, isSelected, onClick }) {
  log(`<CellLabdel/ > ${label} rendering`);
  return (
    <div
      className={`${classes.container} ${isSelected ? classes.selected : ""}`}
      onClick={onClick}
    >
      {children}
      <p className={`${classes.label}`}>{label}</p>
    </div>
  );
}
export default CellLabdel;
