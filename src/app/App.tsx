import React, { useState } from 'react';
import StageManager from '../features/scene/StageManager';
import Toolbar from '../components/toolbar/Toolbar';
import ModalManager, { ActiveModal } from '../features/modal/ModalManager';
import { IMathElement } from '../features/scene/MathElement';

import './App.sass';
import 'katex/dist/katex.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addElement,
  deleteElement,
  editElement,
  ElementProperty
} from '../store/SceneSlice';
import { RootState } from './rootReducer';
import { IToolbarButton } from '../components/toolbar/ToolbarButton';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>('NONE');

  // ----- REDUX -----

  const dispatch = useDispatch();

  const {
    scenes,
    animations,
    activeScene,
    activeAnimation,
    selectedElement
  } = useSelector((state: RootState) => state.scenes);

  const addElementToScene = (element: IMathElement, scene: number) => {
    dispatch(addElement({ element, scene }));
  };

  const editElementInScene = (
    element: IMathElement,
    scene: number,
    property: ElementProperty,
    value: any
  ) => {
    dispatch(editElement({ element, scene, property, value }));
  };

  const deleteElementFromScene = (element: IMathElement, scene: number) => {
    dispatch(deleteElement({ element, scene }));
  };

  const TOOLBAR_BUTTONS: IToolbarButton[] = [
    {
      name: 'File',
      dropdownContents: [
        { name: 'New', onClick: () => alert('Create New Project') },
        { name: 'Open', onClick: () => alert('Open Existing Project') },
        { name: 'Save', onClick: () => alert('Save Project') }
      ]
    },
    { name: 'Edit', dropdownContents: [] },
    {
      name: 'Insert',
      dropdownContents: [
        { name: 'Animation', onClick: () => alert('new animation') },
        { name: 'Element', onClick: () => setActiveModal('ELEMENT') },
        {
          name: 'Scene',
          onClick: () => alert('new scene')
        }
      ]
    },
    {
      name: 'Scene',
      dropdownContents: [
        { name: 'Previous', onClick: () => alert('new scene') },
        { name: 'Next', onClick: () => alert('new scene') }
      ]
    }
  ];

  return (
    <>
      <Toolbar buttons={TOOLBAR_BUTTONS} />
      <ModalManager
        type={activeModal}
        close={() => setActiveModal('NONE')}
        addElementToScene={addElementToScene}
      />
      <StageManager
        scene={scenes[activeScene]}
        animation={animations[activeAnimation]}
      />
    </>
  );
};

export default App;
