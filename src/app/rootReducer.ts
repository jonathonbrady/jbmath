import { combineReducers } from '@reduxjs/toolkit';
import scenesReducer from '../store/SceneSlice';

const rootReducer = combineReducers({
  scenes: scenesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
