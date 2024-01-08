import styles from "./CellLabdel.module.css";

export default function CellLabdel({ children, label, isSelected, onClick }) {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
      <p className={styles.label}>{label}</p>
    </div>
  );
}
