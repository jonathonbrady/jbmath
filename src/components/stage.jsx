import React from 'react'
import MathJaxElement from './element'

function Stage(props) {
    return (
        <div class="columns is-centered">
            <div class="column is-one-third">
                <div class="box" style={{ height: "600px" }}>
                    {props.elements.map(item => (
                        <MathJaxElement id={item.id} formula={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stage