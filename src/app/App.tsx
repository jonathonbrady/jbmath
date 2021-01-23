import React, { useState } from 'react';
import ModalManager, { Modal } from '../features/modals/ModalManager';
import { IMathElement } from '../features/scene/MathElement';
import { useDispatch, useSelector } from 'react-redux';
import {
  addElement,
  addScene,
  deleteElement,
  editElement,
  ElementProperty
} from '../store/contentSlice';
import { RootState } from './rootReducer';
import EditorToolbar from '../features/toolbar/EditorToolbar';
import {
  incrementSceneCount,
  previousOrNextScene,
  setSelectedElement
} from '../store/controlSlice';
import Panel from '../components/panel/Panel';

import './App.sass';
import './DarkReader.css';
import 'katex/dist/katex.min.css';
import useEventListener from '@use-it/event-listener';
import { nextAnimation } from '../store/animationSlice';
import StageManager from '../features/scene/StageManager';
import { getNewMathObject } from '../features/scene/elementCreators';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<Modal>('NONE');

  // ----- REDUX -----

  const dispatch = useDispatch();

  const { scenes } = useSelector((state: RootState) => state.content);
  const { animations } = useSelector((state: RootState) => state.animations);

  const addElementToScene = (formula: string, scene: number) => {
    const element = getNewMathObject(formula);
    dispatch(addElement({ element, scene }));
  };

  const deleteElementFromScene = (element: IMathElement, scene: number) => {
    dispatch(deleteElement({ element, scene }));
  };

  const { currentScene, totalScenes } = useSelector(
    (state: RootState) => state.control
  );

  const incrementCurrentScene = (increment: number) => {
    dispatch(previousOrNextScene(increment));
  };

  const addSceneToProject = () => {
    dispatch(addScene());
    dispatch(incrementSceneCount());
  };

  const selectElement = (id: number) => {
    dispatch(setSelectedElement(id));
  };

  function keyPressHandler(key: KeyboardEvent) {
    if (key.key === 'ArrowLeft') {
      dispatch(nextAnimation(-1));
    } else if (key.key === 'ArrowRight') {
      dispatch(nextAnimation(1));
    }
  }

  const { currentAnimation } = useSelector(
    (state: RootState) => state.animations
  );

  useEventListener('keydown', keyPressHandler);

  return (
    <>
      <EditorToolbar setActiveModal={setActiveModal} />
      <ModalManager
        type={activeModal}
        close={() => setActiveModal('NONE')}
        scene={currentScene}
        addElementToScene={addElementToScene}
        addSceneToProject={addSceneToProject}
        addAnimation={() => alert()}
      />
      <StageManager scene={scenes[currentScene]} />
      <p style={{ color: 'white' }}>{currentAnimation}</p>
    </>
  );
};

export default App;
