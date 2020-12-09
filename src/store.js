import { faRProject } from "@fortawesome/free-brands-svg-icons"
import { createStore, compose } from 'redux'
import rootReducer from './reducer'

const store = createStore(rootReducer)
export default store