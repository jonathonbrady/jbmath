let id = 0;
function nextID() {
  return id++;
}

export function getNewMathObject(
  formula: string,
  scale: number,
  rotation: number
) {
  return {
    id: nextID(),
    position: {
      x: 100,
      y: 100
    },
    scale: scale,
    rotation: rotation,
    formula: formula
  };
}

export function getCustomMathObject(
  id: number,
  x: number,
  y: number,
  scale: number,
  rotation: number,
  formula: string
) {
  return {
    id: id,
    position: {
      x: x,
      y: y
    },
    scale: scale,
    rotation: rotation,
    formula: formula
  };
}
