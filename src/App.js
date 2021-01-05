import React from 'react';
import { RecoilRoot } from 'recoil';
import Scene from './components/scene/Scene';
import Toolbar from './components/toolbar/Toolbar';
import EditorModal from './components/modals/ElementEditorModal';
import NewElementModal from './components/modals/NewElementModal';
import NewAnimationModal from './components/modals/NewAnimationModal';

import './style/App.sass';
import 'katex/dist/katex.min.css';

const App = () => {
  return (
    <RecoilRoot>
      <Toolbar />
      <NewAnimationModal />
      <NewElementModal />
      <EditorModal />
      <Scene />
    </RecoilRoot>
  );
};

export default App;