import log from "../../utils/log";
import classes from "./Footer.module.css";

function Footer() {
  log("<Footer/ > rendering");

  return (
    <div className={`${classes.footer}`}>
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

export default Footer;
