import React from 'react'
import { useRecoilValue } from 'recoil'
import { elementSet, currentScene } from './Toolbar'
import MathElement from './MathElement'

const Scene = () => {
    const scene = useRecoilValue(currentScene)
    const elements = useRecoilValue(elementSet)
    return (elements[scene].map((element) => (<MathElement key={element.globalID} data={element} />)))
}

export default Scene