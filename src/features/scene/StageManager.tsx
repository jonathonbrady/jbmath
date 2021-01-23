import MathElement, { IMathElement } from './MathElement';
import { AnimationObject } from '../animations/types';
import { TargetAndTransition } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

/**
 * scene:
 *      an array of MathElements containing the contents of the current scene
 */
interface Props {
  scene: Array<IMathElement>;
}

/**
 * StageManager:
 *      utility component responsible for rendering the current scene's elements
 *      and applying their corresponding animations.
 */
const StageManager = ({ scene }: Props) => {
  /**
   * Map the contents of the current scene to JSX.Element MathElements
   */
  const sceneContents = scene.map((element: IMathElement) => (
    <MathElement
      key={element.id}
      id={element.id}
      formula={element.formula}
      position={element.position}
      animation={element.animation}
    />
  ));
  return <>{sceneContents}</>;
};

export default StageManager;
