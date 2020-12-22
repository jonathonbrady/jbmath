import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { elementSet } from "./NewElementModal";

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
  const elements = useRecoilValue(elementSet);
  const [visible, setVisible] = useRecoilState(editModal);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div class={`modal ${visible ? "is-active" : ""}`}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Element</p>
          <button
            class="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section class="modal-card-body"></section>
        <footer class="modal-card-foot">
          <div class="container"></div>
        </footer>
      </div>
    </div>
  );
};

export default EditorModal;
