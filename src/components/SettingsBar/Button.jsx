import classes from "./Button.module.css";
import log from "./../../utils/log";

function Button({ label, onClick, children, style }) {
  log(`<Button/ > ${label} rendering`);
  return (
    <div
      className={`${classes.button}`}
      onClick={onClick}
      id={label}
      name={label}
      style={style}
    >
      <div className={`${classes.buttonContent}`}>{children}</div>
      <span className={`${classes.label}`}>{label}</span>
    </div>
  );
}
export default Button;
