import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { currentScene } from "../toolbar/SceneManager";
import TeX from "@matejmazur/react-katex";

/**
 * An array of arrays (scenes) containing objects (math elements).
 * See MathElement.jsx for its object definition.
 */
export const elementSet = atom({
  key: "sceneSet",
  default: [[]],
});

/**
 * The value of the input field
 */
export const elementText = atom({
  key: "elementText",
  default: "",
});

/**
 * The key of each element
 */
export const UID = atom({
  key: "UID",
  default: 0,
});

/**
 * Visibility state of NewElementModal
 */
export const addModal = atom({
  key: "addModal",
  default: false,
});

const NewElementModal = () => {
  const [text, setText] = useRecoilState(elementText);
  const [uniqueID, setUniqueID] = useRecoilState(UID);
  const [visible, setVisible] = useRecoilState(addModal);
  const [elements, setElements] = useRecoilState(elementSet);
  const sceneNumber = useRecoilValue(currentScene);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addElementToScene = () => {
    setElements([
      ...elements.slice(0, sceneNumber),
      elements[sceneNumber].concat({
        globalID: uniqueID,
        sceneID: sceneNumber,
        formula: text,
        meta: {
          x: 150,
          y: 100,
        },
      }),
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
    <div class={`modal ${visible ? "is-active" : ""}`}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Element</p>
          <button class="delete" aria-label="close" onClick={cancel}></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-centered">
            <input
              class="input is-primary is-rounded"
              type="text"
              placeholder="Enter LaTeX..."
              spellCheck={false}
              value={text}
              onChange={handleChange}
            ></input>
          </div>
          <div class="box">
            <TeX
              block
              math={"\\color{white}" + text}
              renderError={() => {
                return <b>Syntax error!</b>;
              }}
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="container is-pulled-right">
            <button
              disabled={text.length === 0}
              class="button is-success"
              onClick={addElementToScene}
            >
              Confirm
            </button>
            <button class="button is-dark" onClick={cancel}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewElementModal;
