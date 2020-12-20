import React, { useEffect, useState } from 'react'
import MathJax from 'react-mathjax'
import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentScene, elementSet } from './Toolbar'

/**
 * Generic mouse position hook
 */
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
        mouseX: null,
        mouseY: null
    })

    useEffect(() => {
        function handleMouseMove(e) {
            setMousePosition({
                mouseX: e.pageX,
                mouseY: e.pageY
            })
        }
        document.addEventListener("mousemove", handleMouseMove)
        return () => document.removeEventListener("mousemove", handleMouseMove)
    })
    return mousePosition
}

/**
 * A MathElement consists of several properties:
 *  1. globalID: a unique ID assigned to an element which is never reused, even on deletion
 *  2. sceneID: the only scene in which this object can display
 *  3. formula: the plaintext expression to be rendered in MathJax
 *  4. meta:
 *      a. x: its x position
 *      b. y: its y position
 *      c. probably other stuff like animations will go here eventually
 * 
 * @param {Object} data - the Object in elementSet from which we construct the MathElement 
 */
const MathElement = ({data}) => {
    const [x, setXPos] = useState(data.meta.x)
    const [y, setYPos] = useState(data.meta.y)
    const [elements, setElements] = useRecoilState(elementSet)
    const sceneNumber = useRecoilValue(currentScene)
    const { mouseX, mouseY } = useMousePosition()

    /**
     * We can't just set the position of the element to the mouse coordinates
     * since that looks terrible. Instead, calculate how far the mouse is from
     * the top and left of the element to ensure it stays in a constant position
     * relative to the contents of the element.
     */
    const handleDrag = (event) => {
        const rect = event.target.getBoundingClientRect()
        const width = rect.right
        setXPos(mouseX)
        setYPos(mouseY)
    }

    /**
     * Updates the stored coordinates of the dragged object so we can load it in
     * the correct position on scene / step changes.
     */
    const handleDragEnd = () => {
        const index = elements[sceneNumber].findIndex((element) => element.globalID === data.globalID)
        setElements([
            ...elements.slice(0, sceneNumber),
            [
                ...elements[sceneNumber].slice(0, index),
                {
                    globalID: data.globalID,
                    sceneID: sceneNumber,
                    formula: data.formula,
                    meta: {
                        x: x,
                        y: y
                    }
                },
                ...elements[sceneNumber].slice(index + 1)
            ],
            ...elements.slice(sceneNumber + 1)
        ])
    }

    /**
     * TODO:
     * <motion.div> is used here to handle the dragging since it's much simpler
     * and better-looking than default JavaScript callback functions. However,
     * we may want to factor that out to an animation wrapper of some kind once
     * the implementation details are figured out to prevent having nested motion.divs.
     * 
     * Additionally, MathJax takes a fraction of a second to properly typeset
     * expressions whenever they're rendered, so scene / step changes will probably
     * have to load all of their elements as hidden until MathJax finishes typsetting
     * (if it even typesets hidden elements!)
     */
    return (
        <motion.div
            drag
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            <MathJax.Provider>
                <MathJax.Node
                formula={data.formula}
                style={{position: 'absolute', left: x + 'px', top: y + 'px'}}
                />
            </MathJax.Provider>
        </motion.div>
    )
}

export default MathElement