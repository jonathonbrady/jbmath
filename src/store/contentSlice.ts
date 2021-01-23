import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMathElement } from '../features/scene/MathElement';

interface SceneState {
  scenes: Array<Array<IMathElement>>;
}

interface ChangeContent {
  element: IMathElement;
  scene: number;
}

export type ElementProperty = 'formula' | 'position';

interface EditExistingContent {
  id: number;
  currentScene: number;
  newContent: IMathElement;
}

const initialState: SceneState = {
  scenes: [[]]
};

const content = createSlice({
  name: 'content',
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
      const { id, currentScene, newContent } = action.payload;
      /**
       * Find where the target element is contained within the target scene.
       * (Note: should never return -1!)
       */
      const index = state.scenes[currentScene].findIndex((e) => e.id === id);
      /**
       * Update the element at the index found above to contain its requested new value
       */
      state.scenes[currentScene][index] = newContent;
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
    addScene(state) {
      state.scenes = [...state.scenes, []];
    }
  }
});

export const {
  addElement,
  editElement,
  deleteElement,
  addScene
} = content.actions;
export default content.reducer;
