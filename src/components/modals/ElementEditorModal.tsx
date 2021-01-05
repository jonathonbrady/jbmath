import React, { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { selectedElement } from "../scene/MathElement";
import { currentScene } from "../toolbar/SceneManager";
import { elementSet } from "./NewElementModal";
import TeX from "@matejmazur/react-katex";

/**
 * Visibility state of EditorModal
 */
export const editModal = atom({
  key: "editModal",
  default: false,
});

/**
 * The EditorModal is responsible for allowing the user to change the
 * properties of an existing MathElement, like text, color, and animations.
 */
const EditorModal = () => {
  const [visible, setVisible] = useRecoilState(editModal);
  const [selected, setSelected] = useRecoilState(selectedElement);
  const [text, setText] = useState("");
  const [elements, setElements] = useRecoilState(elementSet);
  const sceneNumber = useRecoilValue(currentScene);

  const currentElement =
    selected !== -1
      ? elements[sceneNumber].find((element) => element.id === selected)
      : { pos: { x: 0, y: 0 }, formula: "\\text{Select an element before adding an animation!}", animations: [] };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const saveChanges = () => {
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
            formula: text,
            pos: {
              x: currentElement.pos.x,
              y: currentElement.pos.y,
            },
            animations: currentElement.animations,
          },
          ...elements[sceneNumber].slice(index + 1),
        ],
        ...elements.slice(sceneNumber + 1),
      ]);
    }
    setText("");
    closeModal();
    setSelected(-1);
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
          <p className="modal-card-title">Edit Element</p>
          <button className="delete" aria-label="close" onClick={cancel}></button>
        </header>
        <section className="modal-card-body">
          <div className="field is-centered">
            <input
              className="input is-primary is-rounded"
              type="text"
              spellCheck={false}
              value={text}
              onChange={handleChange}
            ></input>
          </div>
          <div className="box">
            <TeX
              block
              math={
                selected !== -1 ? "\\color{white}" + currentElement?.formula : ""
              }
              renderError={() => {
                return <b>Syntax error!</b>;
              }}
            />
          </div>
        </section>
        <footer className="modal-card-foot">
          <div className="container is-pulled-right">
            <button
              disabled={text.length === 0}
              className="button is-success"
              onClick={saveChanges}
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

export default EditorModal;
