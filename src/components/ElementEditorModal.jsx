import MathJax from "react-mathjax";
import { useRecoilState, useRecoilValue } from "recoil";
import { elementSet, debugModal } from "./toolbar";

const EditorModal = () => {
  const elements = useRecoilValue(elementSet);
  const [visible, setVisible] = useRecoilState(debugModal);

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
        <section class="modal-card-body">
          <pre>
            {elements !== null ? JSON.stringify(elements, null, 2) : "hi"}
          </pre>
        </section>
        <footer class="modal-card-foot">
          <div class="container"></div>
        </footer>
      </div>
    </div>
  );
};

export default EditorModal;
