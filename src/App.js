import React from 'react';
import { RecoilRoot } from 'recoil';
import Scene from './components/scene';
import Toolbar from './components/toolbar';
import EditorModal from './components/ElementEditorModal';

import './css/App.sass';

const App = () => {
  return (
    <RecoilRoot>
      <Toolbar />
      <Scene />
      <EditorModal />
    </RecoilRoot>
  );
};

export default App;