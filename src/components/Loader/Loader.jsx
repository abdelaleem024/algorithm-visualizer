import log from "../../utils/log";
import classes from "./Loader.module.css";

function Loader() {
  log("<Loader/ > rendering");
  return (
    <div className={`${classes.loaderContainer}`}>
      <div className={`${classes.loader}`}></div>
    </div>
  );
}

export default Loader;
