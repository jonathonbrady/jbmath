import { combineReducers } from '@reduxjs/toolkit';
import contentReducer from '../store/contentSlice';
import controlReducer from '../store/controlSlice';
import animationReducer from '../store/animationSlice';

const rootReducer = combineReducers({
  content: contentReducer,
  control: controlReducer,
  animations: animationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
