import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimationObject } from '../features/animations';

interface AnimationState {
  animations: Array<Array<AnimationObject>>;
  currentAnimation: number;
}

const initialState: AnimationState = {
  animations: [[]],
  currentAnimation: -1
};

const animations = createSlice({
  name: 'animations',
  initialState,
  reducers: {
    addAnimation(state, action: PayloadAction<AnimationObject>) {
      state.animations[action.payload.when - 1] = state.animations[
        action.payload.when - 1
      ].concat(action.payload);
    },
    addPosition(state) {
      state.animations = [...state.animations, []];
    },
    nextAnimation(state, action: PayloadAction<number>) {
      state.currentAnimation = state.currentAnimation + action.payload;
    }
  }
});

export const { addAnimation, addPosition, nextAnimation } = animations.actions;
export default animations.reducer;
