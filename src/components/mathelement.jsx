import React, { useCallback, useEffect, useRef, useState } from 'react'
import MathJax from 'react-mathjax'
import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentScene, elementSet } from './toolbar'

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
        mouseX: null,
        mouseY: null
    })

    useEffect(() => {
        function handle(e) {
            setMousePosition({
                mouseX: e.pageX,
                mouseY: e.pageY
            })
        }
        document.addEventListener("mousemove", handle)
        return () => document.removeEventListener("mousemove", handle)
    })
    return mousePosition
}

const MathElement = ({elementID, text, xPos, yPos}) => {
    const [x, setXPos] = useState(xPos)
    const [y, setYPos] = useState(yPos)
    const [elements, setElements] = useRecoilState(elementSet)
    const sceneNumber = useRecoilValue(currentScene)
    const { mouseX, mouseY } = useMousePosition()

    const handleDrag = () => {
        setXPos(mouseX)
        setYPos(mouseY)
    }

    const handleDragEnd = () => {
        setXPos(mouseX)
        setYPos(mouseY)
        setElements([
            ...elements.slice(0, elementID),
            {
                globalID: elementID,
                sceneID: sceneNumber,
                formula: text,
                meta: {
                    x: mouseX,
                    y: mouseY
                }
            },
            ...elements.slice(elementID + 1)
        ])
    }

    /**
     * Updates the stored coordinates of the dragged object to reflect its new position
     */
    
    return (
        <motion.div
            drag
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            <MathJax.Provider>
                <MathJax.Node
                formula={text}
                style={{position: 'absolute', left: x + 'px', top: y + 'px'}}
                />
            </MathJax.Provider>
        </motion.div>
    )
}

export default MathElement