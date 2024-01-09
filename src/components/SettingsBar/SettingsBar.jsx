import classes from "./SettingsBar.module.css";
import CellLabdel from "./CellLabdel";
import startCellIcon from "../../assets/icons/start-icon-settings.svg";
import endCellIcon from "../../assets/icons/end-cell.svg";
import Button from "./Button";
import startIcon from "../../assets/icons/start-icon.svg";
import pauseIcon from "../../assets/icons/pause-icon.svg";
import skipIcon from "../../assets/icons/skip-icon.svg";
import trashIcon from "../../assets/icons/trash-icon.svg";
import { CellSize, SPEED } from "../../constants/constants";
import { visualizerStateMap } from "../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { gridActions } from "../../redux/grid";
import {
  selectSelectedCellType,
  selectVisualizerState,
  selectSpeed,
  selectCellSize,
  selectSelectedAlgorithm,
} from "../../redux/selectors";
import log from "../../utils/log";

function SettingsBar() {
  log("<SettingsBar/ > rendering");

  const dispatch = useDispatch();

  const cellSize = useSelector(selectCellSize);
  const speed = useSelector(selectSpeed);
  const visualizerState = useSelector(selectVisualizerState);
  const selectedCellType = useSelector(selectSelectedCellType);
  const selectedAlgorithm = useSelector(selectSelectedAlgorithm);

  const isPaused = visualizerState === visualizerStateMap.paused;
  const isRunning = visualizerState === visualizerStateMap.running;

  const handleClear = () => {
    dispatch(gridActions.claerGrid());
  };

  const handleChangeSpeed = (speed) => {
    dispatch(gridActions.updateSpeed({ speed: speed }));
  };

  const handleChangeSize = (cellSize) => {
    dispatch(gridActions.updateCellSize({ cellSize: cellSize }));
  };

  const handleChangeSelectedCellType = (state) => {
    dispatch(gridActions.updateSelectedCellType({ selectedCellType: state }));
  };

  const handleSkip = () => {
    dispatch(gridActions.skipChangesQueue());
  };

  const handleStartVisualization = () => {
    if (selectedAlgorithm === null) {
      // TODO: show message that no algorithm is selected
      return;
    }
    dispatch(gridActions.startVisualizer());
  };

  const handlePauseContinueVisualization = () => {
    if (visualizerState === visualizerStateMap.running) {
      dispatch(
        gridActions.updateVisualizerState({
          visualizerState: visualizerStateMap.paused,
        })
      );
    } else if (visualizerState === visualizerStateMap.paused) {
      dispatch(
        gridActions.updateVisualizerState({
          visualizerState: visualizerStateMap.running,
        })
      );
    }
  };

  return (
    <div className={`${classes.settingsBar}`}>
      <div className={`${classes.IconsContainer}`}>
        <CellLabdel
          label="Start Cell"
          isSelected={selectedCellType === "start"}
          onClick={() => handleChangeSelectedCellType("start")}
        >
          <img
            src={startCellIcon}
            alt="Start Cell"
            className={`${classes.startCell}`}
          />
        </CellLabdel>
        <CellLabdel
          label="End Cell"
          isSelected={selectedCellType === "end"}
          onClick={() => handleChangeSelectedCellType("end")}
        >
          <img
            src={endCellIcon}
            alt="End Cell"
            className={`${classes.startCell}`}
          />
        </CellLabdel>
        {/* <CellLabdel
          label="Bonus Cell"
          isSelected={state === "bonus"}
          onClick={() => handleChangeState("bonus")}
        >
          <img src={bonusCell} alt="Bonus Cell" className={`${classes.startCell}`} />
        </CellLabdel> */}
        <CellLabdel
          label="Wall Cell"
          isSelected={selectedCellType === "wall"}
          onClick={() => handleChangeSelectedCellType("wall")}
        >
          <div className={`${classes.wallCell}`}></div>
        </CellLabdel>
        <CellLabdel
          label="Empty Cell"
          isSelected={selectedCellType === "empty"}
          onClick={() => handleChangeSelectedCellType("empty")}
        >
          <div className={`${classes.emptyCell}`}></div>
        </CellLabdel>
      </div>
      <div className={`${classes.controlsContainer}`}>
        <div className={`${classes.sliderContainer}`}>
          <label htmlFor="cellSize" className={`${classes.label}`}>
            Cell Size : {cellSize}
          </label>
          <input
            className={`${classes.slider}`}
            type="range"
            name="cellSize"
            id="cellSize"
            min={CellSize.MIN}
            max={CellSize.MAX}
            value={cellSize}
            onChange={(e) => handleChangeSize(+e.target.value)}
            style={{
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          />
        </div>
        <div className={`${classes.sliderContainer}`}>
          <label htmlFor="speed" className={`${classes.label}`}>
            Speed : {speed}
          </label>
          <input
            className={`${classes.slider}`}
            type="range"
            name="speed"
            id="speed"
            min={SPEED.MIN}
            max={SPEED.MAX}
            value={speed}
            onChange={(e) => handleChangeSpeed(e.target.value)}
          />
        </div>
        <div className={`${classes.buttonsContainer}`}>
          <div className={`${classes.startPauseSkipButtons}`}>
            {isPaused || isRunning ? (
              <>
                <Button
                  label={isRunning ? "Pause" : "Start"}
                  onClick={handlePauseContinueVisualization}
                >
                  {isRunning ? (
                    <img src={startIcon} alt="Pause" />
                  ) : (
                    <img src={pauseIcon} alt="Start" />
                  )}
                </Button>
                <Button label="Skip" onClick={handleSkip}>
                  <img src={skipIcon} alt="Skip" />
                </Button>
              </>
            ) : (
              <Button
                label={"Start"}
                onClick={handleStartVisualization}
                style={{
                  cursor: selectedAlgorithm ? "pointer" : "not-allowed",
                }}
              >
                <img src={pauseIcon} alt="Start" />
              </Button>
            )}
          </div>
          <Button label="Clear" onClick={handleClear}>
            <img src={trashIcon} alt="Clear" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingsBar;
