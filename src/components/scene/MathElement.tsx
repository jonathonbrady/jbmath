import React, { useState } from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { motion, PanInfo, useMotionValue } from "framer-motion";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { currentScene } from "../toolbar/SceneManager";
import { elementSet } from "../modals/NewElementModal";
import { AnimationObject } from "./AnimationManager";

export interface MathElementProps {
  id: number;
  scene: number;
  formula: string;
  pos: {
    x: number;
    y: number;
  };
  animations: Array<AnimationObject>;
}

/**
 * the key of the selected element
 */
export const selectedElement = atom({
  key: "selectedElement",
  default: -1,
});

/**
 * A MathElement consists of several properties:
 *  1. globalID: a unique ID; the object's key
 *  2. sceneID: the only scene in which this object can display
 *  3. formula: the plaintext expression to be rendered in LaTeX
 *  4. pos:
 *      a. x: its x position
 *      b. y: its y position
 *      c. probably other stuff like animations will go here eventually
 *
 * @param {Object} data - the Object in elementSet from which we construct the MathElement
 */
const MathElement: React.FC<MathElementProps> = ({ id, scene, formula, pos, animations }: MathElementProps) => {
  const x = useMotionValue(pos.x);
  const y = useMotionValue(pos.y);

  const [elements, setElements] = useRecoilState(elementSet);
  const [selected, setSelectedElement] = useRecoilState(selectedElement);
  const sceneNumber = useRecoilValue(currentScene);

  const handleDragStart = (_event: MouseEvent, info: PanInfo) => {
    x.set(info.point.x - x.get());
    y.set(info.point.y - y.get());
  };

  const index: number = elements[sceneNumber].findIndex(
    (element) => element.id === id
  );

  const handleDragEnd = () => {
    setElements([
      ...elements.slice(0, sceneNumber),
      [
        ...elements[sceneNumber].slice(0, index),
        {
          id: id,
          scene: scene,
          formula: formula,
          pos: {
            x: x.get(),
            y: y.get(),
          },
          animations: animations,
        },
        ...elements[sceneNumber].slice(index + 1),
      ],
      ...elements.slice(sceneNumber + 1),
    ]);
  };

  const handleElementSelection = () => {
    if (selected === -1) {
      setSelectedElement(id);
      return;
    }
    setSelectedElement(-1);
  };

  /**
   * TODO: This doesn't actually work but almost doesn't not work
   */
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  return (
    <motion.div
      animate={{}}
      transition={{ duration: 2 }}
      drag
      dragConstraints={{
        left: -width / 2,
        right: width / 2,
        top: -5,
        bottom: height - 105,
      }}
      dragElastic={0}
      dragMomentum={false}
      onClick={handleElementSelection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ x, y }}
    >
      <TeX
        block
        math={
          "\\color{" +
          (selected === id ? "yellow" : "white") +
          "}" +
          formula
        }
      />
    </motion.div>
  );
};

export default MathElement;
