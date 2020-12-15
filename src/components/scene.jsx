import React from 'react'
import { atom, useRecoilValue } from 'recoil'
import MathJax from 'react-mathjax'
import { motion } from 'framer-motion'
import { sceneSet, currentScene } from './toolbar'

const Scene = () => {
    const elements = useRecoilValue(sceneSet)[useRecoilValue(currentScene)]
    if (elements !== undefined) {
        if (Array.isArray(elements)) {
            return (
                elements.map((element) => (
                    <motion.div
                        animate={{scale: 1}}
                        transition={{duration: 0}}
                        drag
                        dragMomentum={false}
                        style={{display: 'inline-block'}}
                    >
                        <MathJax.Provider>
                            <MathJax.Node formula={element} />
                        </MathJax.Provider>
                    </motion.div>
                    )
                )
            )
        } else {
            return (
                <motion.div
                    animate={{scale: 1}}
                    transition={{duration: 0}}
                    drag
                    dragMomentum={false}
                    style={{display: 'inline-block'}}
                >
                    <MathJax.Provider>
                        <MathJax.Node formula={elements} />
                    </MathJax.Provider>
                </motion.div>
            )
        }
    } else {
        return ( null )
    }
}

export default Scene