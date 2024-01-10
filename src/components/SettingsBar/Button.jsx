import classes from "./Button.module.css";
import log from "./../../utils/log";

function Button({ label, onClick, children, style }) {
  log(`<Button/ > ${label} rendering`);
  const userOnboardingID = `${label.toLowerCase()}-button`;
  return (
    <div
      className={`${classes.button}`}
      onClick={onClick}
      name={label}
      style={style}
      id={userOnboardingID}
    >
      <div className={`${classes.buttonContent}`}>{children}</div>
      <span className={`${classes.label}`}>{label}</span>
    </div>
  );
}
export default Button;
