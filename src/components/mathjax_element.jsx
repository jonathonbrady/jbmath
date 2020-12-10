import React, { useState } from 'react'
import MathJax from 'react-mathjax'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const selectElementByID = (state, elementID) => {
    return state.elements.find((element) => element.id === elementID)
}

const MathJaxElement = ({ id }) => {
    const element = useSelector((state) => selectElementByID(state, id))
    const { formula } = element
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()

    const handleClick = () => {
        setEditable(!editable)
        if (!editable) {
            dispatch({type: 'editor/elementSelected', payload: formula})
        } else {
            dispatch({type: 'editor/elementSelected', payload: null})
        }
    }

    return (
        <>
            <motion.div
                animate={{scale: 1}}
                transition={{duration: 0}}
                onClick={handleClick}
                drag
                dragMomentum={false}
                style={{display: 'inline-block'}}
            >
                <MathJax.Provider>
                    <MathJax.Node formula={formula} />
                </MathJax.Provider>
            </motion.div>
        </>
    )
}

export default MathJaxElement