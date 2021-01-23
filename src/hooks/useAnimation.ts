import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

/**
 * Returns a tuple containing the specified element's initial animation state
 * and its current animation state. A
 * @param id the element
 */
export function useAnimation(id: number) {
  const { animations, currentAnimation } = useSelector(
    (state: RootState) => state.animations
  );

  var animate;

  /**
   * This logic is stupid; rewrite soon
   */
  const animationConcerningID = animations.find((e) => e.target === id);
  if (animationConcerningID) {
    const current = animations[0];
    if (current) {
      if (current.target === id && current.when === currentAnimation) {
        animate = current.meta.animation;
      } else {
        animate = animationConcerningID.meta.initial;
      }
    } else {
      animate = {};
    }
  } else {
    animate = {};
  }
  return { animate };
}
