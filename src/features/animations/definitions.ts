import { AnimationMeta } from './types';

export const EnterAnimations: AnimationMeta[] = [
  { name: 'Appear', initial: { opacity: 0 }, animation: { opacity: 1 } },
  { name: 'Fade In', initial: { opacity: 0 }, animation: { opacity: 1 } }
];

export const ModifyAnimations: AnimationMeta[] = [
  { name: 'Grow', initial: {}, animation: {} }
];

export const ExitAnimations: AnimationMeta[] = [];

export const MiscAnimations: AnimationMeta[] = [];
