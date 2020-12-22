import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useSetRecoilState } from "recoil";
import { addModal } from "./modals/NewElementModal";
import SceneManager from "./toolbar/SceneManager";

const Toolbar = () => {
  const setNewElementModalVisible = useSetRecoilState(addModal);

  const openNewElementModal = () => {
    setNewElementModalVisible(true);
  };
  return (
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <button class="button is-primary">File</button>
            <button class="button is-primary">Edit</button>
            <button class="button is-primary" onClick={openNewElementModal}>
              Insert
            </button>
          </div>
          <div class="navbar-item">
            <SceneManager />
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-light is-rounded"
              href="https://github.com/jonathonbrady/jbmath"
            >
              <span class="icon">
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
