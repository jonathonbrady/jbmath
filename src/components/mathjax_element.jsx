import React from 'react'
import MathJax from 'react-mathjax'
import { useSelector } from 'react-redux'

const selectElementByID = (state, elementID) => {
    return state.elements.find((element) => element.id === elementID)
}

const MathJaxElement = ({ id }) => {
    const element = useSelector((state) => selectElementByID(state, id))
    const { formula } = element

    return (
        <MathJax.Provider>
            <MathJax.Node formula={formula} />
        </MathJax.Provider>
    )
}

export default MathJaxElement