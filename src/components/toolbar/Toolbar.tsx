import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useSetRecoilState } from "recoil";
import { addModal } from "../modals/NewElementModal";
import SceneManager from "./SceneManager";
import { editModal } from "../modals/ElementEditorModal";
import { animationModal } from "../modals/NewAnimationModal";

const Toolbar = () => {
  const setEditElementModalVisible = useSetRecoilState(editModal);
  const setNewElementModalVisible = useSetRecoilState(addModal);
  const setNewAnimationModalVisible = useSetRecoilState(animationModal);

  const [active, setActive] = useState(false);

  const showInsertMenu = (isActive: boolean) => {
    setActive(isActive);
  };

  const openNewAnimationModal = () => {
    setActive(false);
    setNewAnimationModalVisible(true);
  };
  const openEditElementModal = () => {
    setActive(false);
    setEditElementModalVisible(true);
  };
  const openNewElementModal = () => {
    setActive(false);
    setNewElementModalVisible(true);
  };

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <button className="button is-primary">File</button>
            <button
              className="button is-primary"
              onClick={openEditElementModal}
            >
              Edit
            </button>
            <div className={`dropdown ${active ? "is-active" : ""}`}>
              <div className="dropdown-trigger">
                <button
                  className="button is-primary"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  onClick={() => showInsertMenu(!active)}
                >
                  Insert
                </button>
              </div>
              <div
                className="dropdown-menu is-primary is-unselectable"
                id="dropdown-menu"
                role="menu"
              >
                <div className="dropdown-content is-unselectable">
                  <a
                    onClick={openNewAnimationModal}
                    className="dropdown-item is-unselectable"
                  >
                    Animation
                  </a>
                  <a
                    onClick={openNewElementModal}
                    className="dropdown-item is-unselectable"
                  >
                    Element
                  </a>
                  <a className="dropdown-item is-unselectable">Scene</a>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <SceneManager />
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a
              className="button is-light is-rounded"
              href="https://github.com/jonathonbrady/jbmath"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faGithub} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
