import React from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { selectedElement } from "../scene/MathElement";
import { elementSet } from "../modals/NewElementModal";

/**
 * The total number of scenes the user has created
 */
export const totalScenes = atom({
  key: "totalScenes",
  default: 0,
});

/**
 * The scene to actually render on the canvas
 */
export const currentScene = atom({
  key: "currentScene",
  default: 0,
});

/**
 * The current step ("keyframe") in the animation sequence
 */
export const currentStep = atom({
  key: "currentStep",
  default: 0,
});

/**
 * The scene manager is the set of three buttons that allow the user to add
 * scenes and change the current scene.
 */
const SceneManager = () => {
  const [elements, setElements] = useRecoilState(elementSet);
  const [numberOfScenes, setNumberOfScenes] = useRecoilState(totalScenes);
  const [sceneNumber, setSceneNumber] = useRecoilState(currentScene);
  const [step, setStep] = useRecoilState(currentStep);
  const setSelectedElement = useSetRecoilState(selectedElement);

  /**
   * Add an empty array to the element set upon creation of a new scene,
   * since each nested array within elementSet corresponds to a unique scene.
   */
  const addScene = () => {
    setNumberOfScenes(numberOfScenes + 1);
    setElements([...elements, []]);
  };

  const changeScene = (n: number) => {
    setSelectedElement(-1);
    setSceneNumber(sceneNumber + n);
  };

  const changeStep = (n: number) => {
    setStep(step + n);
  };

  return (
    <div className="buttons">
      <button className="button is-light" onClick={addScene}>
        New Scene
      </button>
      <button
        disabled={sceneNumber === 0}
        className="button is-success"
        onClick={() => changeScene(-1)}
      >
        -
      </button>
      <button
        disabled={sceneNumber === numberOfScenes}
        className="button is-success"
        onClick={() => changeScene(1)}
      >
        +
      </button>
      <button
        disabled={step === 0}
        className="button is-info"
        onClick={() => changeStep(-1)}
      >
        -
      </button>
      <button className="button is-info" onClick={() => changeStep(1)}>
        +
      </button>
    </div>
  );
};

export default SceneManager;
