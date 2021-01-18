import { TargetAndTransition } from 'framer-motion';
import MathElement, { IMathElement } from './MathElement';
import { AnimationObject } from '../../store/SceneSlice';

interface Props {
  scene: Array<IMathElement>;
  animation: AnimationObject;
}

const StageManager = ({ scene, animation }: Props) => {
  const sceneContents = scene.map((element: IMathElement) => (
    <MathElement
      key={element.id}
      id={element.id}
      formula={element.formula}
      position={element.position}
      animation={{}}
    />
  ));
  return <>{sceneContents}</>;
};

export default StageManager;
