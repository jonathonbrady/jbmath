import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { IMathElement } from '../features/scene/MathElement';

/**
 * Returns the MathElement of a given ID.
 * @param id
 * @returns a defined MathElement
 */
export function useElementFromID(id: number): IMathElement {
  const { scenes } = useSelector((state: RootState) => state.content);
  const { currentScene } = useSelector((state: RootState) => state.control);

  const element = scenes[currentScene].find((e) => e.id === id);
  if (element === undefined) {
    return { id: -1, position: { x: 0, y: 0 }, formula: '', animation: [] };
  }
  return element;
}
