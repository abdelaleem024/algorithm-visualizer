import styles from "./Button.module.css";

export default function Button({ label, onClick, children, style }) {
  return (
    <div
      className={styles.button}
      onClick={onClick}
      id={label}
      name={label}
      style={style}
    >
      <div className={styles.buttonContent}>{children}</div>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
