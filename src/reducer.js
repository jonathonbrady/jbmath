import { combineReducers } from 'redux'
import editorReducer from './reducers/editorReducer'
import elementsReducer from './reducers/elementReducer'
import sceneReducer from './reducers/sceneReducer'

const rootReducer = combineReducers({
    elements: elementsReducer,
    scenes: sceneReducer,
    editor: editorReducer
})

export default rootReducer