import React, {Component} from 'react'
import Scene from './components/scene'
import Toolbar from './components/toolbar'
import './css/App.sass'
import { RecoilRoot, useRecoilValue } from 'recoil'
import EditorModal from './components/editor'

const App = () => {
  return (
    <RecoilRoot>
      <Toolbar />
      <Scene />
      <EditorModal />
    </RecoilRoot>
  )
}

export default App;