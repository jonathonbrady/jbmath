import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { atom, useRecoilState } from 'recoil'

export const totalScenes = atom({
  key: 'totalScenes',
  default: 0
})

export const currentScene = atom({
  key: 'currentScene',
  default: 0
})

export const elementText = atom({
  key: 'elementText',
  default: ''
})

export const elementSet = atom({
  key: 'sceneSet',
  default: [[]]
})

export const debugModal = atom({
  key: 'debugModal',
  default: false
})

export const UID = atom({
  key: 'UID',
  default: 0
})

/**
 * The Toolbar is the main brain of the program at the moment, but a lot of
 * refactoring and actually good design decisions are on the horizon.
 * 
 * There will probably be a "Toolbar" folder with a lot of Toolbar's current
 * functionality as subcomponents, since they'll likely be reused in various GUIs,
 * like for editing existing elements.
 */
const Toolbar = () => {
  const [text, setText] = useRecoilState(elementText)
  const [numberOfScenes, setNumberOfScenes] = useRecoilState(totalScenes)
  const [sceneNumber, setSceneNumber] = useRecoilState(currentScene)
  const [elements, setElements] = useRecoilState(elementSet)
  const [visible, setVisible] = useRecoilState(debugModal)
  const [uniqueID, setUniqueID] = useRecoilState(UID)

  const handleChange = e => {
    setText(e.target.value)
  }

  const addElementToScene = () => {
    setElements([
      ...elements.slice(0, sceneNumber),
        elements[sceneNumber].concat({
          globalID: uniqueID,
          sceneID: sceneNumber,
          formula: text,
          meta: {
            x: 150,
            y: 100
          }
        }),
      ...elements.slice(sceneNumber + 1)
    ])
    setText('')
    setUniqueID(uniqueID + 1)
  }

  const handleKeyDown = e => {
    if (e.which === 13) {
      addElementToScene()
    }
  }

  const handleSubmit = () => {
    addElementToScene()
  }

  const addScene = () => {
    setNumberOfScenes(numberOfScenes + 1)
    setElements([...elements, []])
  }

  const previousScene = () => {
    setSceneNumber(sceneNumber - 1)
  }

  const nextScene = () => {
    setSceneNumber(sceneNumber + 1)
  }

  const openModal = () => {
    setVisible(true)
  }

  return (
    <>
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field has-addons">
              <input
                class="input is-primary is-rounded"
                type="text"
                placeholder="Enter LaTeX code"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></input>
              <button
                disabled={text.length === 0}
                class="button is-success"
                onClick={handleSubmit}
              >+
              </button>
            </div>
          </div>

          <div class="navbar-item">
            <div class="buttons">
              <button
                class="button is-light"
                onClick={addScene}
              >New Scene</button>
              <button
                disabled={sceneNumber === 0}
                class="button is-success"
                onClick={previousScene}
              >-</button>
              <button
                disabled={sceneNumber === numberOfScenes}
                class="button is-success"
                onClick={nextScene}
              >+</button>
            </div>
          </div>

          <div class="navbar-item">
            <span class="tag is-white">{text} {sceneNumber} {visible ? 1 : 0}</span>
          </div>

          <div class="navbar-item">
            <button class="button is-warning" onClick={openModal}>
              Debug
            </button>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-light is-rounded"
              href="https://github.com/jonathonbrady/jbmath">
              <span class="icon">
                <FontAwesomeIcon icon={faGithub} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <pre>{JSON.stringify(elements, null, 2)}</pre>
    </>
  )
}

export default Toolbar;