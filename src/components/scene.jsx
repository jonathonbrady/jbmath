import React from 'react'
import MathJaxElement from './mathjax_element'

function Scene(props) {
    return (
        props.elements.map(item => (
            <MathJaxElement id={item.id} formula={item} />
        ))
    )
}

export default Scene