import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControlState {
  currentScene: number;
  totalScenes: number;
  selectedElement: number;
}

const initialState: ControlState = {
  currentScene: 0,
  totalScenes: 0,
  selectedElement: -1
};

const control = createSlice({
  name: 'control',
  initialState,
  reducers: {
    previousOrNextScene(state, action: PayloadAction<number>) {
      state.currentScene = state.currentScene + action.payload;
    },
    jumpToScene(state, action: PayloadAction<number>) {
      state.currentScene = action.payload;
    },
    incrementSceneCount(state) {
      state.totalScenes = state.totalScenes + 1;
    },
    setSelectedElement(state, action: PayloadAction<number>) {
      state.selectedElement = action.payload;
    }
  }
});

export const {
  previousOrNextScene,
  jumpToScene,
  incrementSceneCount,
  setSelectedElement
} = control.actions;
export default control.reducer;
