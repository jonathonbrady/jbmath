import React from "react";
import { useRecoilValue } from "recoil";
import { elementSet } from "../modals/NewElementModal";
import { currentScene, currentStep } from "../toolbar/SceneManager";
import MathElement from "./MathElement";

/**
 * Utility component that renders the elements of the current scene
 */
const Scene = () => {
  const scene = useRecoilValue(currentScene);
  const elements = useRecoilValue(elementSet);

  return elements[scene].map((element) => (
    <MathElement key={element.id} id={element.id} scene={element.scene} formula={element.formula} pos={element.pos} animations={element.animations}/>
  ));
};

export default Scene;
