import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import MathJaxElement from './mathjax_element'

const selectElementIDs = (state) => state.elements.map((element) => element.id)

const Scene = () => {
    const elementIDs = useSelector(selectElementIDs, shallowEqual)

    const renderedItems = elementIDs.map((elementID) => {
        return <MathJaxElement key={elementID} id={elementID} />
    })

    return <div className="scene">{renderedItems}</div>
}

export default Scene