import React from 'react'
import MathJax from 'react-mathjax'

function MathJaxElement(props) {
    return (
        <MathJax.Provider key={props.id}>
            <MathJax.Node formula={props.formula} />
        </MathJax.Provider>
    )
}

export default MathJaxElement