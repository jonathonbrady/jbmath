import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Scene from './components/scene'
import ElementPropertiesEditor from './components/properties_editor'
import './css/App.sass'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null, /* LaTeX code input */
      math: [], /* This scene's MathJax formulas */
      scene: 0, /* Current scene number */
      sceneCount: 0, /* Total number of scenes */
      sceneElements: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.previousScene = this.previousScene.bind(this);
    this.nextScene = this.nextScene.bind(this);
    this.addScene = this.addScene.bind(this);
  }

  render() {
    return (
      <>
        {/* ELEMENT ADDER TOOLBAR */}
        <nav
          class="navbar is-primary"
          role="navigation"
          aria-label="main navigation">
          <div class="navbar-menu">
            <div class="navbar-start">
              <div class="navbar-item">
                <div class="field has-addons">
                  <input /* LaTeX INPUT */
                    class="input is-primary is-rounded"
                    type="text"
                    placeholder="Enter LaTeX code"
                    value={this.state.value}
                    onChange={this.handleChange}
                  ></input>
                  <button /* ADD MATHJAX NODE FROM INPUT */
                    disabled={this.state.value === null}
                    class="button is-success"
                    onClick={this.handleSubmit}
                  >+
                  </button>
                </div>
              </div>

              <div class="navbar-item">
                <div class="buttons">
                  <button /* ADD SCENE */
                    class="button is-light"
                    onClick={this.addScene}
                  >New Scene</button>
                  <button /* GO BACK ONE SCENE */
                    disabled={this.state.scene === 0}
                    class="button is-success"
                    onClick={this.previousScene}
                  >-</button>
                  <button /* GO FORWARD ONE SCENE */
                    disabled={this.state.scene === this.state.sceneCount}
                    class="button is-success"
                    onClick={this.nextScene}
                  >+</button>
                </div>
              </div>

              <div class="navbar-item">
                <span class="tag is-white">Scene {this.state.scene + 1}</span>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a /* GITHUB */
                  class="button is-light is-rounded"
                  href="https://github.com/jonathonbrady/textonic">
                  <span class="icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* STAGE */}
        <Scene elements={this.state.math} />
        <ElementPropertiesEditor />
      </>
    )
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    if (this.state.value === null) return;
    this.setState({
      math: this.state.math.concat([this.state.value.toString()]),
    })
    e.preventDefault();
  }

  previousScene() {
    this.setState({
      scene: this.state.scene - 1,
      math: this.sceneElements[this.state.scene - 1]
    })
  }

  nextScene() {
    this.setState({
      scene: this.state.scene + 1,
      math: this.sceneElements.values[this.state.scene + 1]
    })
  }

  addScene() {
    this.setState({
      sceneCount: this.state.sceneCount + 1,
      sceneElements: this.state.sceneElements.concat([])
    })
  }
}

export default App;