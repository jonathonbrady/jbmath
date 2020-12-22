import React, { useState } from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentScene } from "./toolbar/SceneManager";
import { elementSet } from "./modals/NewElementModal";

/**
 * A MathElement consists of several properties:
 *  1. globalID: a unique ID; the object's key
 *  2. sceneID: the only scene in which this object can display
 *  3. formula: the plaintext expression to be rendered in LaTeX
 *  4. meta:
 *      a. x: its x position
 *      b. y: its y position
 *      c. probably other stuff like animations will go here eventually
 *
 * @param {Object} data - the Object in elementSet from which we construct the MathElement
 */
const MathElement = ({ data }) => {
  const [x, setXPos] = useState(data.meta.x);
  const [y, setYPos] = useState(data.meta.y);

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const [elements, setElements] = useRecoilState(elementSet);
  const sceneNumber = useRecoilValue(currentScene);

  /**
   * We can't just set the position of the element to the mouse coordinates (looks terrible).
   * Instead, define an offset in the x and y direction by the difference between the cursor's
   * initial position (where the user actually clicks) and the element's initial position.
   * This keeps the element in the same position relative to the cursor the entire time.
   */
  const handleDragStart = (_, info) => {
    setOffsetX(info.point.x - x);
    setOffsetY(info.point.y - y);
  };

  const handleDrag = (_, info) => {
    setXPos(info.point.x - offsetX);
    setYPos(info.point.y - offsetY);
  };

  /**
   * Updates the element's coordinates so it can be rendered in the correct position on
   * scene changes, etc.
   */
  const handleDragEnd = () => {
    const index = elements[sceneNumber].findIndex(
      (element) => element.globalID === data.globalID
    );
    setElements([
      ...elements.slice(0, sceneNumber),
      [
        ...elements[sceneNumber].slice(0, index),
        {
          globalID: data.globalID,
          sceneID: sceneNumber,
          formula: data.formula,
          meta: {
            x: x,
            y: y,
          },
        },
        ...elements[sceneNumber].slice(index + 1),
      ],
      ...elements.slice(sceneNumber + 1),
    ]);
  };

  /**
   * TODO:
   * <motion.div> is used here to handle the dragging since it's much simpler
   * and better-looking than default JavaScript callback functions. However,
   * we may want to factor that out to an animation wrapper of some kind once
   * the implementation details are figured out to prevent having nested motion.divs.
   */
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <TeX
        block
        math={"\\color{white}" + data.formula}
        style={{ position: "absolute", left: x + "px", top: y + "px" }}
      />
    </motion.div>
  );
};

export default MathElement;
