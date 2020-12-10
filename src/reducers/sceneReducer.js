const initialState = {
    numberOfScenes: 1,
    currentScene: 1
}

export default function sceneReducer(state = initialState, action) {
    switch (action.type) {
        case 'scene/sceneAdded': {
            return {
                numberOfScenes: action.payload,
                currentScene: state.currentScene
            }
        }
        case 'scene/previous': {
            return {
                numberOfScenes: state.numberOfScenes,
                currentScene: action.payload
            }
        }
        case 'scene/next': {
            return {
                numberOfScenes: state.numberOfScenes,
                currentScene: action.payload
            }
        }
        default:
            return state
    }
}