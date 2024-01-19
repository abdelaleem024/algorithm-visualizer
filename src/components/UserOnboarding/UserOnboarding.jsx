import { Steps } from "intro.js-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisualizerState } from "./../../redux/selectors";
import { visualizerStateMap } from "./../../constants/constants";
import { gridActions } from "../../redux/grid";

const steps = [
  {
    index: 0,
    title: "Getting Started",
    element: "#start-cell",
    intro: "Click here to choose the start point",
    onClickSkip: true,
  },
  {
    index: 1,
    title: "Getting Started",
    element: "#grid",
    position: "bottom",
    intro: "Pick a cell to be the starting point",
    onClickSkip: false,
  },
  {
    index: 2,
    title: "Getting Started",
    element: "#end-cell",
    intro: "Click here to select the destination",
    onClickSkip: true,
  },
  {
    index: 3,
    title: "Getting Started",
    element: "#grid",
    position: "bottom",
    intro: "Choose a cell as the destination",
    onClickSkip: false,
  },
  {
    index: 4,
    title: "Adding Walls",
    element: "#wall-cell",
    intro: "Let's add some walls now",
    onClickSkip: true,
  },
  {
    index: 5,
    title: "Adding Walls",
    element: "#grid",
    intro: "Click and Move your mouse to add walls",
    position: "bottom",
    onClickSkip: false,
  },
  {
    index: 6,
    title: "Algorithm Selection",
    element: "#algo-drop-list-container",
    intro: "Pick the algorithm you want to see",
    position: "left",
    onClickSkip: false,
  },
  {
    index: 7,
    title: "Speed Control",
    element: "#speed-slider",
    intro: "Adjust the visualization speed",
    onClickSkip: false,
  },
  {
    index: 8,
    title: "Start Visualization",
    element: "#start-visulization-button",
    intro: "Let's start the visualization now",
    onClickSkip: true,
  },
  {
    index: 9,
    title: "Observing the Path",
    element: "#grid",
    intro: "Watch the algorithm discover the shortest path",
    position: "bottom",
    onClickSkip: false,
  },
  {
    index: 10,
    title: "Maze Generator",
    element: "#generate-maze-button",
    intro: "You can also generate a random maze if you like",
    onClickSkip: true,
  },
  {
    index: 11,
    title: "You're Ready!",
    intro: "That's it! You're all set to go!",
    onClickSkip: false,
  },
];

function UserOnboarding({ stepsEnabled, setStepsEnabled }) {
  const dispatch = useDispatch();
  const visualizerState = useSelector(selectVisualizerState);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep === 0 && stepsEnabled === true) {
      console.log("clearing grid");
      dispatch(gridActions.claerGrid());
    }

    const handleMouseClick = (e) => {
      const nextButton =
        document.getElementsByClassName("introjs-nextbutton")[0];
      if (
        stepsEnabled === false ||
        steps[currentStep].onClickSkip === false ||
        !nextButton
      ) {
        return;
      }

      const targetElement = document.getElementById(
        steps[currentStep].element?.slice(1)
      );

      if (targetElement && targetElement.contains(e.target)) {
        nextButton.click();
      }
    };

    window.addEventListener("mouseup", handleMouseClick);

    return () => {
      window.removeEventListener("mouseup", handleMouseClick);
    };
  }, [stepsEnabled, currentStep, dispatch]);

  useEffect(() => {
    if (
      currentStep === 9 &&
      (visualizerState === visualizerStateMap.paused ||
        visualizerState === visualizerStateMap.idle)
    ) {
      console.log("starting visualization");
      dispatch(gridActions.startVisualizer());
    }
  }, [currentStep, dispatch, visualizerState]);

  const onAfterChange = () => {
    switch (currentStep) {
      case 1: {
        const element = document.getElementById("start-cell");
        element.click();
        break;
      }
      case 3: {
        const element = document.getElementById("end-cell");
        element.click();
        break;
      }
      case 5: {
        const element = document.getElementById("wall-cell");
        element.click();
        break;
      }
      case 10: {
        dispatch(gridActions.skipChangesQueue());
        break;
      }
    }
  };

  const handleOnExit = () => {
    setStepsEnabled(false);
    setCurrentStep(0);
  };

  return (
    <Steps
      enabled={stepsEnabled}
      steps={steps}
      onExit={handleOnExit}
      initialStep={0}
      onAfterChange={(newStepIndex) => onAfterChange(newStepIndex)}
      onChange={(newStepIndex) => setCurrentStep(newStepIndex)}
      options={{
        showBullets: false,
        // showButtons: false,
        keyboardNavigation: false,
        showProgress: true,
        exitOnOverlayClick: false,
        hidePrev: true,
      }}
    />
  );
}

export default UserOnboarding;
