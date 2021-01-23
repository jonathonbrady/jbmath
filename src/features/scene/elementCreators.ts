import { TargetAndTransition } from 'framer-motion';

let id = 0;
function nextID() {
  return id++;
}

export function getNewMathObject(formula: string) {
  return {
    id: nextID(),
    position: {
      x: 100,
      y: 100
    },
    formula: formula,
    animation: {}
  };
}

export function getCustomMathObject(
  id: number,
  x: number,
  y: number,
  formula: string,
  animation: TargetAndTransition | {}
) {
  return {
    id: id,
    position: {
      x: x,
      y: y
    },
    formula: formula,
    animation: animation
  };
}
