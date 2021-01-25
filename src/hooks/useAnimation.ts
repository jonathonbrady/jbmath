import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { AnimationObject } from '../features/animations';

/**
 * Returns a tuple containing the specified element's current animation and
 * its duration.
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
  var lastAnimation = {};

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
    lastAnimation = animate;
  } else {
    animate = lastAnimation;
  }
  return { animate, transition };
}

/**
 * @Slow - Find the earliest occurrence of an animation that targets this element, and return that
 * AnimationObject's initial property. If there isn't one, then its initial state is an empty object.
 */
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
