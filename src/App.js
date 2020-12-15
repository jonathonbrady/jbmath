import React, {Component} from 'react'
import Scene from './components/scene'
import Toolbar from './components/toolbar'
import { atom } from 'recoil'
import './css/App.sass'
import { RecoilRoot } from 'recoil'
import EditorModal from './components/editor'

class App extends Component {
  render() {
    return (
      <RecoilRoot>
        <Toolbar />
        <Scene />
        <EditorModal />
      </RecoilRoot>
    )
  }
}

export default App;