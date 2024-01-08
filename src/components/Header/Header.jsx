import styles from "./Header.module.css";
import DropList from "../DropList/DropList";
import infoIcon from "../../assets/icons/info.svg";

export default function Header({
  algorithms = [],
  selectedAlgorithm = "",
  handleChangeAlgorithm = () => {},
  handleGenerateMaze = () => {},
}) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Pathfinding Visualizer</h1>
      <div className={styles.menu}>
        <div className={styles.maze} onClick={handleGenerateMaze}>
          <span>Generate Maze</span>
        </div>
        <DropList
          title={selectedAlgorithm ? selectedAlgorithm : "Select Algorithm"}
          list={algorithms}
          onSelected={handleChangeAlgorithm}
        />
        <div className={styles.tutorialContainer}>
          <div className={styles.tutorialWrapper}>
            <img src={infoIcon} className={styles.infoIcon} />
            <span className={styles.tutorial}>Tutorial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
