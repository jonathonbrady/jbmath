import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import EditorModal from './editor'
import { atom, useRecoilState, useRecoilValue } from 'recoil'

export const sceneElements = atom({
  key: 'sceneElements',
  default: []
})

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

export const sceneSet = atom({
  key: 'sceneSet',
  default: [[]]
})

const Toolbar = () => {
  const [text, setText] = useRecoilState(elementText)
  const [numberOfScenes, setNumberOfScenes] = useRecoilState(totalScenes)
  const [sceneNumber, setScene] = useRecoilState(currentScene)
  const [elements, setSceneElements] = useRecoilState(sceneElements)
  const [scenes, setStageElements] = useRecoilState(sceneSet)

  const handleChange = e => {
    setText(e.target.value)
  }

  const addElementToScene = () => {
    setSceneElements([...elements, text])
    setStageElements([
      ...scenes.slice(0, sceneNumber),
      scenes[sceneNumber].concat(text),
      ...scenes.slice(sceneNumber + 1)
    ])
    setText('')
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
    setStageElements([...scenes, []])
    setNumberOfScenes(numberOfScenes + 1)
  }

  const previousScene = () => {
    setScene(sceneNumber - 1)
  }

  const nextScene = () => {
    setScene(sceneNumber + 1)
  }

  const openModal = () => {

  }

  return (
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
            <span class="tag is-white">{text} {sceneNumber}</span>
          </div>

          <div class="navbar-item">
            <button class="button is-warning" onClick={openModal} disabled>
              Edit
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
  )
}

export default Toolbar;