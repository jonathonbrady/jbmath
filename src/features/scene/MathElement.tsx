import { motion, useMotionValue } from 'framer-motion';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { useSelectElement } from '../../hooks/useSelectElement';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { editElement } from '../../store/contentSlice';
import { AnimationObject } from '../animations/types';
import { getCustomMathObject } from './elementCreators';
import { useAnimation } from '../../hooks/useAnimation';
import { useRef } from 'react';
import useEventListener from '@use-it/event-listener';

type Position = {
  x: number;
  y: number;
};

export interface IMathElement {
  id: number;
  position: Position;
  formula: string;
  animation: AnimationObject | {};
}

/**
 * MathElement:
 *      a stateful component that renders its formula in LaTeX.
 *
 * Animations are not added directly to scene objects. Instead, animations are
 * choreographed by StageManager. Each element has an initial animation, which
 * can be an empty object, and zero or more animations that follow, which are AnimationObjects.
 */
const MathElement = (props: IMathElement) => {
  const { currentScene } = useSelector((state: RootState) => state.control);
  const { selected, setSelected } = useSelectElement();
  const { animate, transition } = useAnimation(props.id);
  const dispatch = useDispatch();

  /**
   * Constructs a new MathElement (callback on drag end) with the new position
   * based on where the drag gesture ended. newContent is then dispatched to the
   * store to replace the "old" object with the new, updated position.
   */
  function setElementPosition(id: number, x: number, y: number) {
    const newContent = getCustomMathObject(
      id,
      x,
      y,
      props.formula,
      props.animation
    );
    dispatch(editElement({ id, currentScene, newContent }));
  }

  /**
   * Framer Motion hooks. These are essentially like useState hooks; their initial
   * values are the stored coordinates of the element, and are updated when the user
   * drags the element to a new position.
   *
   * x and y are of type MotionValue<number>, but their numeric value can be obtained
   * by calling x.get() and y.get().
   */
  const x = useMotionValue<number>(props.position.x);
  const y = useMotionValue<number>(props.position.y);

  const HIGHLIGHT_WHEN_SELECTED = '\\color{yellow}';

  return (
    <motion.div
      key={props.id}
      drag
      dragElastic={0}
      dragMomentum={false}
      onClick={() => setSelected(props.id)}
      onDragEnd={() => setElementPosition(props.id, x.get(), y.get())}
      animate={animate}
      transition={transition}
      style={{ x, y, display: 'inline-block' }}
    >
      <TeX
        block
        math={
          (selected.id === props.id ? HIGHLIGHT_WHEN_SELECTED : '') +
          props.formula
        }
      />
    </motion.div>
  );
};

export default MathElement;
