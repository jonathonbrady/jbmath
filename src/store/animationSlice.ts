import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimationObject } from '../features/animations/types';

interface AnimationState {
  animations: Array<AnimationObject>;
  currentAnimation: number;
}

const initialState: AnimationState = {
  animations: [],
  currentAnimation: -1
};

const animations = createSlice({
  name: 'animations',
  initialState,
  reducers: {
    addAnimation(state, action: PayloadAction<AnimationObject>) {
      state.animations = state.animations.concat(action.payload);
    },
    nextAnimation(state, action: PayloadAction<number>) {
      state.currentAnimation = state.currentAnimation + action.payload;
    }
  }
});

export const { addAnimation, nextAnimation } = animations.actions;
export default animations.reducer;
