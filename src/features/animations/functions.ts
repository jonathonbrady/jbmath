import {
  EnterAnimations,
  ModifyAnimations,
  ExitAnimations,
  MiscAnimations
} from './definitions';
import { AnimationMeta } from './types';

type AnimationType = 'enter' | 'modify' | 'exit' | 'misc';
export function getAnimationSet(type: AnimationType): AnimationMeta[] {
  switch (type) {
    case 'enter': {
      return EnterAnimations;
    }
    case 'modify': {
      return ModifyAnimations;
    }
    case 'exit': {
      return ExitAnimations;
    }
    case 'misc': {
      return MiscAnimations;
    }
  }
}

export function getTransitionObject(time: number) {
  return { duration: time };
}
