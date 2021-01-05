import React, { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { currentScene } from "../toolbar/SceneManager";
import TeX from "@matejmazur/react-katex";
import { selectedElement } from "../scene/MathElement";
import { elementSet } from "./NewElementModal";

/**
 * Visibility state of NewElementModal
 */
export const animationModal = atom({
  key: "animationModal",
  default: false,
});

const NewAnimationModal = () => {
  const [visible, setVisible] = useRecoilState(animationModal);
  const [elements, setElements] = useRecoilState(elementSet);
  const sceneNumber = useRecoilValue(currentScene);
  const selected = useRecoilValue(selectedElement);
  const [step, setStep] = useState(0);
  const [animationType, setAnimationType] = useState("");

  const currentElement =
    selected !== -1
      ? elements[sceneNumber].find((element) => element.id === selected)
      : { pos: { x: 0, y: 0 }, formula: "\\text{Select an element before adding an animation!}", animations: [] };

  const cancel = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisible(false);
  };

  const changeStep = (n: number) => {
    setStep(step + n);
  };

  const handleAnimationSelect = (e: any) => {
    setAnimationType(e.target.value);
  };

  const handleAddAnimation = () => {
    const index = elements[sceneNumber].findIndex(
      (element) => element.id === selected
    );
    if (currentElement) {
      setElements([
      ...elements.slice(0, sceneNumber),
      [
        ...elements[sceneNumber].slice(0, index),
        {
          id: selected,
          scene: sceneNumber,
          formula: currentElement.formula,
          pos: {
            x: currentElement.pos.x,
            y: currentElement.pos.y,
          },
          animations: [
            ...currentElement.animations,
            {
              step: step,
              type: animationType,
              arg: 100,
              duration: 2,
            },
          ],
        },
        ...elements[sceneNumber].slice(index + 1),
      ],
      ...elements.slice(sceneNumber + 1),
    ]);
    }
    closeModal();
  };

  return (
    <div className={`modal ${visible ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Animation</p>
          <button className="delete" aria-label="close" onClick={cancel}></button>
        </header>
        <section className="modal-card-body">
          <div className="box">
            <TeX block math={"\\color{white}" + currentElement?.formula} />
          </div>
          {/**
           * ANIMATION STEP DROPDOWN
           */}

          {/**
           * ANIMATION TYPE TABS
           */}

          <div className="tabs is-centered">
            <ul>
              <li className="is-active">
                <a>Enter</a>
              </li>
              <li>
                <a>Change</a>
              </li>
              <li>
                <a>Exit</a>
              </li>
              <li>
                <a>Miscellaneous</a>
              </li>
            </ul>
          </div>

          {/**
           * APPEARANCE ANIMATION SELECTION
           */}

          <div className="control" onChange={handleAnimationSelect}>
            <label className="radio">
              <input
                type="radio"
                value="appear"
                name="enter"
                style={{ marginRight: 5 }}
              ></input>
              Appear
            </label>
            <label className="radio">
              <input
                type="radio"
                value="fade_in"
                name="enter"
                style={{ marginRight: 5 }}
              ></input>
              Fade In
            </label>
            <label className="radio">
              <input
                type="radio"
                value="fade_in_peek"
                name="enter"
                style={{ marginRight: 5 }}
              ></input>
              Fade + Peek
            </label>
          </div>

          <div style={{ textAlign: "center" }}>
            Animation Step<br></br>
            <button
              disabled={step === 0}
              onClick={() => changeStep(-1)}
              className="button is-dark is-small"
            >
              ←
            </button>
            <div className="tag is-black">{step + 1}</div>
            <button
              className="button is-dark is-small"
              onClick={() => changeStep(1)}
            >
              →
            </button>
          </div>
        </section>
        <footer className="modal-card-foot">
          <div className="container">
            <button
              disabled={selected === -1}
              className="button is-success"
              onClick={handleAddAnimation}
            >
              Confirm
            </button>
            <button className="button is-dark" onClick={cancel}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewAnimationModal;
