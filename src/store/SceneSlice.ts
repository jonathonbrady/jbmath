import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TargetAndTransition } from 'framer-motion';
import { IMathElement } from '../features/scene/MathElement';

export interface AnimationObject {
  target: number;
  animation: TargetAndTransition;
}

interface SceneState {
  scenes: Array<Array<IMathElement>>;
  animations: Array<AnimationObject>;
  activeScene: number;
  activeAnimation: number;
  selectedElement: number;
}

interface ChangeContent {
  element: IMathElement;
  scene: number;
}

export type ElementProperty = 'formula' | 'position';

interface EditExistingContent {
  element: IMathElement;
  scene: number;
  property: ElementProperty;
  value: any;
}

const initialState: SceneState = {
  scenes: [[]],
  animations: [],
  activeScene: 0,
  activeAnimation: -1,
  selectedElement: -1
};

const scenes = createSlice({
  name: 'scenes',
  initialState,
  reducers: {
    /**
     * Adds a new element to the target scene
     */
    addElement(state, action: PayloadAction<ChangeContent>) {
      const { element, scene } = action.payload;
      state.scenes[scene] = state.scenes[scene].concat(element);
    },

    /**
     * Edits an existing element given a target property and an updated value
     */
    editElement(state, action: PayloadAction<EditExistingContent>) {
      const { element, scene, property, value } = action.payload;
      /**
       * Find where the target element is contained within the target scene.
       * (Note: should never return -1!)
       */
      const index = state.scenes[scene].findIndex((e) => e.id === element.id);
      /**
       * Update the element at the index found above to contain its requested new value
       */
      state.scenes[scene][index] = getUpdatedElement(element, property, value);
    },

    /**
     * Removes an element from the target scene completely
     */
    deleteElement(state, action: PayloadAction<ChangeContent>) {
      const { element, scene } = action.payload;
      state.scenes[scene] = state.scenes[scene].filter(
        (e) => e.id !== element.id
      );
    },
    selectElement(state, action: PayloadAction<number>) {
      state.selectedElement = action.payload;
    },
    deselectElement(state) {
      state.selectedElement = -1;
    }
  }
});

/**
 * Returns a MathElement, updated to contain a new value for a given property.
 */
function getUpdatedElement(
  element: IMathElement,
  property: ElementProperty,
  value: any
): IMathElement {
  const newElement = element;
  switch (property) {
    case 'formula': {
      element.formula = value;
      break;
    }
    case 'position': {
      element.position = value;
      break;
    }
    default: {
      throw new Error();
    }
  }
  return newElement;
}

export const {
  addElement,
  editElement,
  deleteElement,
  selectElement,
  deselectElement
} = scenes.actions;
export default scenes.reducer;
