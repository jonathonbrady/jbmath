import { combineReducers } from 'redux'
import elementsReducer from './reducers/elementReducer'

const rootReducer = combineReducers({
    elements: elementsReducer
})

export default rootReducer