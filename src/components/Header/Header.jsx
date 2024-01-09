import classes from "./Header.module.css";
import DropList from "../DropList/DropList";
import infoIcon from "../../assets/icons/info.svg";
import { algorithms } from "../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { gridActions } from "../../redux/grid";
import { selectSelectedAlgorithm } from "../../redux/selectors";
import log from "../../utils/log";

function Header() {
  log("<Header /> rendering");
  const dispatch = useDispatch();

  const selectedAlgorithm = useSelector(selectSelectedAlgorithm);

  const dropListTitle = selectedAlgorithm
    ? selectedAlgorithm
    : "Select Algorithm";

  const handleChangeAlgorithm = (algorithm) => {
    dispatch(
      gridActions.updateSelectedAlgorithm({
        algorithm: algorithm,
      })
    );
  };

  const handleGenerateMaze = () => {
    dispatch(gridActions.generateRandomMaze());
  };

  return (
    <div className={`${classes.header}`}>
      <h1 className={`${classes.title}`}>Pathfinding Visualizer</h1>
      <div className={`${classes.menu}`}>
        <div className={`${classes.maze}`} onClick={handleGenerateMaze}>
          <span>Generate Maze</span>
        </div>
        <DropList
          title={dropListTitle}
          list={algorithms}
          onSelecte={handleChangeAlgorithm}
        />
        <div className={`${classes.tutorialContainer}`}>
          <div className={`${classes.tutorialWrapper}`}>
            <img src={infoIcon} className={`${classes.infoIcon}`} />
            <span className={`${classes.tutorial}`}>Tutorial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
