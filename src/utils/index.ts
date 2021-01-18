import { IMathElement } from '../features/scene/MathElement';

export function addToNestedArray<T>(
  array: Array<Array<T>>,
  index: number,
  obj: T
): Array<Array<T>> {
  return [
    ...array.slice(0, index),
    [...array[index].concat(obj)],
    ...array.slice(index + 1)
  ];
}

let id = 0;
export function getID() {
  return id++;
}

export function newMathElement(formula: string): IMathElement {
  return {
    id: getID(),
    formula: formula,
    position: {
      x: 100,
      y: 100
    }
  };
}
