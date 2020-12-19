import React from 'react'
import { atom, useRecoilValue } from 'recoil'
import { elementSet, currentScene } from './toolbar'
import MathElement from './mathelement'

const Scene = () => {
    const elements = useRecoilValue(elementSet)
    const scene = useRecoilValue(currentScene)
    if (elements !== undefined) {
        if (Array.isArray(elements)) {
            return (elements.filter(
                e => e.sceneID === scene).map(
                    (element) => (
                        <MathElement
                            elementID={element.globalID}
                            text={element.formula}
                            xPos={element.meta.x}
                            yPos={element.meta.y}
                        />
                    )
                )
            )
        } else {
            return (<MathElement text={elements} />)
        }
    } else {
        return ( null )
    }
}

export default Scene