export interface AnimationMeta {
  name: string;
  initial: {};
  animation: {};
}

export interface AnimationObject {
  meta: AnimationMeta;
  target: number;
  when: number;
  length: number;
}

export type AnimationType = 'Enter' | 'Modify' | 'Exit' | 'Miscellaneous';

export function getAnimationSet(type: AnimationType): AnimationMeta[] {
  switch (type) {
    case 'Enter': {
      return EnterAnimations;
    }
    case 'Modify': {
      return ModifyAnimations;
    }
    case 'Exit': {
      return ExitAnimations;
    }
    case 'Miscellaneous': {
      return MiscAnimations;
    }
  }
}

export const EnterAnimations: AnimationMeta[] = [
  { name: 'Appear', initial: { opacity: 0 }, animation: { opacity: 1 } },
  { name: 'Fade In', initial: { opacity: 0 }, animation: { opacity: 1 } }
];

export const ModifyAnimations: AnimationMeta[] = [
  { name: 'Grow', initial: { scale: 1 }, animation: { scale: 5 } }
];

export const ExitAnimations: AnimationMeta[] = [];

export const MiscAnimations: AnimationMeta[] = [];
