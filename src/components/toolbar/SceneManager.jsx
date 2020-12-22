import React from "react";
import { atom, useRecoilState } from "recoil";
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
 * The scene manager is the set of three buttons that allow the user to add
 * scenes and change the current scene.
 */
const SceneManager = () => {
  const [elements, setElements] = useRecoilState(elementSet);
  const [numberOfScenes, setNumberOfScenes] = useRecoilState(totalScenes);
  const [sceneNumber, setSceneNumber] = useRecoilState(currentScene);

  /**
   * Add an empty array to the element set upon creation of a new scene,
   * since each nested array within elementSet corresponds to a unique scene.
   */
  const addScene = () => {
    setNumberOfScenes(numberOfScenes + 1);
    setElements([...elements, []]);
  };

  const changeScene = (n) => {
    setSceneNumber(sceneNumber + n);
  };

  return (
    <div class="buttons">
      <button class="button is-light" onClick={addScene}>
        New Scene
      </button>
      <button
        disabled={sceneNumber === 0}
        class="button is-success"
        onClick={() => changeScene(-1)}
      >
        -
      </button>
      <button
        disabled={sceneNumber === numberOfScenes}
        class="button is-success"
        onClick={() => changeScene(1)}
      >
        +
      </button>
    </div>
  );
};

export default SceneManager;
