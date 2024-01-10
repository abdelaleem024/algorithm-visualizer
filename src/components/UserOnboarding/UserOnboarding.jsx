import { Steps } from "intro.js-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisualizerState } from "./../../redux/selectors";
import { visualizerStateMap } from "./../../constants/constants";
import { gridActions } from "../../redux/grid";

const steps = [
  {
    title: "Getting Started",
    element: "#start-cell",
    intro: "Click here to choose the start point",
    position: "right",
  },
  {
    title: "Getting Started",
    element: "#grid",
    intro: "Pick a cell to be the starting point",
  },
  {
    title: "Getting Started",
    element: "#end-cell",
    intro: "Click here to select the destination",
  },
  {
    title: "Getting Started",
    element: "#grid",
    intro: "Choose a cell as the destination",
  },
  {
    title: "Adding Walls",
    element: "#wall-cell",
    intro: "Let's add some walls now",
  },
  {
    title: "Adding Walls",
    element: "#grid",
    intro: "Click and Move your mouse to add walls",
  },
  {
    title: "Algorithm Selection",
    element: "#algo-drop-list-container",
    intro: "Pick the algorithm you want to see",
    position: "left",
  },
  {
    title: "Speed Control",
    element: "#speed-slider",
    intro: "Adjust the visualization speed",
  },
  {
    title: "Start Visualization",
    element: "#start-button",
    intro: "Let's start the visualization now",
  },
  {
    title: "Observing the Path",
    element: "#grid",
    intro: "Watch the algorithm discover the shortest path",
  },
  {
    title: "Maze Generator",
    element: "#generate-maze-button",
    intro: "You can also generate a random maze if you like",
  },
  {
    title: "You're Ready!",
    intro: "That's it! You're all set to go!",
  },
];

function UserOnboarding({ stepsEnabled, setStepsEnabled }) {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const visualizerState = useSelector(selectVisualizerState);

  useEffect(() => {
    const handleMouseUp = (e) => {
      if (!stepsEnabled) {
        return;
      }
      let button = document.getElementsByClassName("introjs-nextbutton")[0];
      if (!button) {
        button = document.getElementsByClassName("introjs-donebutton")[0];
      }
      const targetStep = document.getElementById(
        steps[currentStep].element.slice(1)
      );
      if (targetStep && targetStep.contains(e.target)) {
        console.log("button ", button, "\ntarget ", targetStep);
        console.log("click");
        button.click();
      }
    };

    window.addEventListener("mouseup", handleMouseUp);

    if (currentStep === 0) {
      dispatch(gridActions.claerGrid());
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [stepsEnabled, currentStep]);

  const onBeforeChange = async () => {
    switch (currentStep) {
      case 0: {
        const element = document.getElementById("start-cell");
        element.click();
        break;
      }
      case 2: {
        const element = document.getElementById("end-cell");
        element.click();
        break;
      }
      case 4: {
        const element = document.getElementById("wall-cell");
        element.click();
        break;
      }
      case 8: {
        if (visualizerState !== visualizerStateMap.running) {
          const element = document.getElementById("start-button");
          element.click();
        }
        break;
      }
      case 9: {
        if (visualizerState === visualizerStateMap.running) {
          dispatch(gridActions.skipChangesQueue());
        }
        break;
      }
    }
  };

  const handleExit = () => {
    setStepsEnabled(false);
    setCurrentStep(0);
  };

  return (
    <Steps
      enabled={stepsEnabled}
      steps={steps}
      onExit={handleExit}
      initialStep={0}
      onAfterChange={(newStepIndex) => {
        console.log("new step ", newStepIndex);
        setCurrentStep(newStepIndex);
      }}
      onBeforeChange={onBeforeChange}
      options={{
        showBullets: false,
        // showButtons: false,
        keyboardNavigation: false,
        showProgress: true,
        exitOnOverlayClick: false,
      }}
    />
  );
}

export default UserOnboarding;
