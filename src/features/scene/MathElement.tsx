import {
  motion,
  MotionValue,
  Target,
  TargetAndTransition,
  useMotionValue
} from 'framer-motion';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

export interface IMathElement {
  id: number;
  formula: string;
  position: {
    x: number;
    y: number;
  };
}

interface AnimationObject {
  animation: TargetAndTransition | {};
}

type Props = IMathElement & AnimationObject;
const MathElement = (props: Props) => {
  return (
    <motion.div
      key={props.id}
      drag
      dragElastic={0}
      dragMomentum={false}
      animate={props.animation}
    >
      <TeX block math={props.formula} />
    </motion.div>
  );
};

export default MathElement;
