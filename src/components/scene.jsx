import React from "react";
import { useRecoilValue } from "recoil";
import { elementSet } from "./modals/NewElementModal";
import { currentScene } from "./toolbar/SceneManager";
import MathElement from "./mathelement";

/**
 * Utility component that renders the elements of the current scene
 */
const Scene = () => {
  const scene = useRecoilValue(currentScene);
  const elements = useRecoilValue(elementSet);

  return elements[scene].map((element) => (
    <MathElement key={element.globalID} data={element} />
  ));
};

export default Scene;
