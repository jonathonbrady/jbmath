const initialState = []

function nextID(elements) {
    const maxID = elements.reduce((maxID, element) => Math.max(element.id, maxID), -1)
    return maxID + 1
}

export default function elementReducer(state = initialState, action) {
    switch (action.type) {
        case 'elements/elementAdded': {
            return [...state,
                { 
                    id: nextID(state),
                    formula: action.payload
                }
            ]
        }
        case 'elements/elementDeleted': {
            return state.filter((element) => element.id !== action.payload)
        }
        default:
            return state
    }
}