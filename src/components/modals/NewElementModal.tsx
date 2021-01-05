import React, { useState } from "react";
import { atom, RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { currentScene } from "../toolbar/SceneManager";
import TeX from "@matejmazur/react-katex";
import MathElement, { MathElementProps } from "../scene/MathElement";

/**
 * An array of arrays (scenes) containing objects (math elements).
 * See MathElement.jsx for its object definition.
 */
export const elementSet: RecoilState<Array<Array<MathElementProps>>> = atom({
  key: "sceneSet",
  default: [[]] as any[][],
});

/**
 * The key of each element
 */
export const UID: RecoilState<number> = atom({
  key: "UID",
  default: 0,
});

/**
 * Visibility state of NewElementModal
 */
export const addModal: RecoilState<boolean> = atom({
  key: "addModal",
  default: false as boolean,
});

const NewElementModal = () => {
  const [text, setText] = useState("");
  const [uniqueID, setUniqueID] = useRecoilState(UID);
  const [visible, setVisible] = useRecoilState(addModal);
  const [elements, setElements] = useRecoilState(elementSet);
  const sceneNumber = useRecoilValue(currentScene);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addElementToScene = () => {
    const newElement: MathElementProps = {
      id: uniqueID,
      scene: sceneNumber,
      formula: text,
      pos: {
        x: 0,
        y: 0,
      },
      animations: [],
    }
    setElements([
      ...elements.slice(0, sceneNumber),
      elements[sceneNumber].concat(newElement),
      ...elements.slice(sceneNumber + 1),
    ]);
    setText("");
    setUniqueID(uniqueID + 1);
    closeModal();
  };

  const cancel = () => {
    setText("");
    closeModal();
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className={`modal ${visible ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Element</p>
          <button className="delete" aria-label="close" onClick={cancel}></button>
        </header>
        <section className="modal-card-body">
          <div className="box">
            <TeX block math={"\\color{white}" + text} />
          </div>
          <div className="field is-centered">
            <input
              className="input is-primary is-rounded"
              type="text"
              spellCheck={false}
              value={text}
              onChange={handleChange}
            ></input>
          </div>
        </section>
        <footer className="modal-card-foot">
          <div className="container is-pulled-right">
            <button
              disabled={text.length === 0}
              className="button is-success"
              onClick={addElementToScene}
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

export default NewElementModal;
