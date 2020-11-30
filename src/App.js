import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Stage from './components/stage'
import './css/App.sass'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      math: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <>
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
          <div class="navbar-menu">
            <div class="buttons">
              <div class="field has-addons">
                <div class="control">
                  <input
                    class="input is-primary is-rounded"
                    type="text"
                    placeholder="Enter LaTeX code"
                    value={this.state.value}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <button
                  class="button is-success"
                  onClick={this.handleSubmit}
                >Add Element
                  </button>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light is-rounded" href="https://github.com/jonathonbrady/textonic">
                  <span class="icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <Stage elements={this.state.math} />
      </>
    )
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    this.setState({
      math: this.state.math.concat([this.state.value.toString()])
    })
    e.preventDefault();
  }
}

export default App;