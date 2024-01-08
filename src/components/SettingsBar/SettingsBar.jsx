import styles from "./SettingsBar.module.css";
import CellLabdel from "./CellLabdel";
import bonusCell from "../../assets/icons/bonus-cell.svg";
import startCell from "../../assets/icons/start-icon-settings.svg";
import endCell from "../../assets/icons/end-cell.svg";
import Button from "./Button";
import startIcon from "../../assets/icons/start-icon.svg";
import pauseIcon from "../../assets/icons/pause-icon.svg";
import skipIcon from "../../assets/icons/skip-icon.svg";
import trashIcon from "../../assets/icons/trash-icon.svg";
import { CellSize } from "../../constants/constants";
import { visualizerStateMap } from "../../constants/constants";

export default function SettingsBar({
  speed,
  handleChangeSpeed,
  cellSize,
  handleChangeCellSize,
  visualizerState,
  handleStartVisualization,
  handlePauseContinueVisualization,
  handleSkip,
  handleClear,
  state,
  handleChangeState,
  enableStart,
}) {
  const isPaused = visualizerState === visualizerStateMap.paused;
  const isRunning = visualizerState === visualizerStateMap.running;

  return (
    <div className={styles.settingsBar}>
      <div className={styles.IconsContainer}>
        <CellLabdel
          label="Start Cell"
          isSelected={state === "start"}
          onClick={() => handleChangeState("start")}
        >
          <img src={startCell} alt="Start Cell" className={styles.startCell} />
        </CellLabdel>
        <CellLabdel
          label="End Cell"
          isSelected={state === "end"}
          onClick={() => handleChangeState("end")}
        >
          <img src={endCell} alt="End Cell" className={styles.startCell} />
        </CellLabdel>
        {/* <CellLabdel
          label="Bonus Cell"
          isSelected={state === "bonus"}
          onClick={() => handleChangeState("bonus")}
        >
          <img src={bonusCell} alt="Bonus Cell" className={styles.startCell} />
        </CellLabdel> */}
        <CellLabdel
          label="Wall Cell"
          isSelected={state === "wall"}
          onClick={() => handleChangeState("wall")}
        >
          <div className={styles.wallCell}></div>
        </CellLabdel>
        <CellLabdel
          label="Empty Cell"
          isSelected={state === "empty"}
          onClick={() => handleChangeState("empty")}
        >
          <div className={styles.emptyCell}></div>
        </CellLabdel>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.sliderContainer}>
          <label htmlFor="cellSize" className={styles.label}>
            Cell Size : {cellSize}
          </label>
          <input
            type="range"
            name="cellSize"
            id="cellSize"
            min={CellSize.MIN}
            max={CellSize.MAX}
            className={styles.slider}
            value={cellSize}
            onChange={
              isRunning ? null : (e) => handleChangeCellSize(e.target.value)
            }
            style={{
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          />
        </div>
        <div className={styles.sliderContainer}>
          <label htmlFor="speed" className={styles.label}>
            Speed : {speed}
          </label>
          <input
            type="range"
            name="speed"
            id="speed"
            min="1"
            max="5"
            className={styles.slider}
            value={speed}
            onChange={(e) => handleChangeSpeed(e.target.value)}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.startPauseSkipButtons}>
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
                onClick={enableStart ? handleStartVisualization : null}
                style={{
                  cursor: enableStart ? "pointer" : "not-allowed",
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
