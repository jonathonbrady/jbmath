import React from 'react';
import { RecoilRoot } from 'recoil';
import Scene from './components/scene';
import Toolbar from './components/toolbar';
import EditorModal from './components/modals/ElementEditorModal';
import NewElementModal from './components/modals/NewElementModal';

import './style/App.sass';

const App = () => {
  return (
    <RecoilRoot>
      <Toolbar />
      <NewElementModal />
      <EditorModal />
      <Scene />
    </RecoilRoot>
  );
};

export default App;