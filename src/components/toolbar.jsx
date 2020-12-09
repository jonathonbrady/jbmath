import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Toolbar = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleChange = e => {
        setText(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.which === 13) {
            dispatch({type: 'elements/elementAdded', payload: text})
            setText('')
        }
    }

    const handleSubmit = () => {
      dispatch({type: 'elements/elementAdded', payload: text})
      setText('')
    }

    const addScene = () => {
      dispatch({type: 'scene/sceneAdded', payload: "a"})
    }

    const previousScene = () => {
      dispatch({type: 'scene/previous', payload: "a"})
    }

    const nextScene = () => {
      dispatch({type: 'scene/next', payload: "a"})
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
                    disabled
                    class="button is-success"
                    onClick={previousScene}
                  >-</button>
                  <button
                    disabled
                    class="button is-success"
                    onClick={nextScene}
                  >+</button>
                </div>
              </div>

              <div class="navbar-item">
                <span class="tag is-white">Scene</span>
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