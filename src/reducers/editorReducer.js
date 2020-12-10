const initialState = {
    selectedElement: null
}

export default function editorReducer(state = initialState, action) {
    switch (action.type) {
        case 'editor/elementSelected': {
            return {
                selectedElement: action.payload
            }
        }
        default:
            return state
    }
}