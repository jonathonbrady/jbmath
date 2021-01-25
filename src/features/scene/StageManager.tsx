import MathElement, { IMathElement } from './MathElement';

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
      position={element.position}
      scale={element.scale}
      rotation={element.rotation}
      formula={element.formula}
    />
  ));
  return <>{sceneContents}</>;
};

export default StageManager;
