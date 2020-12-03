import React from 'react'
import MathJax from 'react-mathjax'
import { motion } from 'framer-motion'

/* Returns a MathJax.Node with corresponding formula */
function MathJaxElement(props) {
    return (
        <motion.div
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.25 }}
        >
            <MathJax.Provider key={props.id}>
                <MathJax.Node formula={props.formula} />
            </MathJax.Provider>
        </motion.div>
    )
}

export default MathJaxElement