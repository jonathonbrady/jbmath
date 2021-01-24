import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { AnimationObject } from '../features/animations/types';

/**
 * Returns a tuple containing the specified element's initial animation state
 * and its current animation state.
 * @param id the element
 */
export function useAnimation(id: number) {
  const { animations, currentAnimation } = useSelector(
    (state: RootState) => state.animations
  );

  /**
   * We set transition to { duration: 0 } here so its initial state is applied
   * instantly, regardless of the duration of the newly-applied animation.
   */
  var animate = getInitialState(id, animations);
  var transition = { duration: 0 };

  /**
   * If we haven't even started animating anything yet, then just return early.
   */
  if (currentAnimation === -1) {
    return { animate, transition };
  }

  /**
   * Find any animations that target this scene element during the current animation.
   */
  const animationsToPlay = animations[currentAnimation].filter(
    (e) => e.target === id
  );

  /**
   * @Incomplete - If there are multiple animations to be played simultaneously, construct
   * an animate object containing all of them.
   */
  if (animationsToPlay.length !== 0) {
    animate = animationsToPlay[0].meta.animation;
    transition = { duration: animationsToPlay[0].length };
  }
  return { animate, transition };
}

function getInitialState(id: number, animations: AnimationObject[][]): {} {
  for (var i = 0; i < animations.length; i++) {
    for (var j = 0; j < animations[i].length; j++) {
      if (animations[i][j].target === id) {
        return animations[i][j].meta.initial;
      }
    }
  }
  return {};
}
