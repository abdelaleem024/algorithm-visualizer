import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <span>
        Created By{" "}
        <a
          href="https://www.linkedin.com/in/abdelaleemahmed/"
          target="_blank"
          rel="noreferrer"
        >
          Abdelaleem Ahmed
        </a>
      </span>
    </div>
  );
}
