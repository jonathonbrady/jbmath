import React, {Component} from 'react'
import Scene from './components/Scene'
import Toolbar from './components/Toolbar'
import './css/App.sass'
import { RecoilRoot, useRecoilValue } from 'recoil'
import EditorModal from './components/ElementEditorModal'

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