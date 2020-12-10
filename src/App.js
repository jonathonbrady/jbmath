import React, {Component} from 'react'
import Scene from './components/scene'
import Toolbar from './components/toolbar'
import './css/App.sass'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Scene />
      </div>
    )
  }
}

export default App;