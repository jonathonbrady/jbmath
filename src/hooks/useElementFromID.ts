import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

/**
 * Returns the MathElement of a given ID.
 * @param id
 * @returns a defined MathElement
 */
export function useElementFromID(id: number) {
  const { scenes } = useSelector((state: RootState) => state.content);
  const { currentScene } = useSelector((state: RootState) => state.control);

  const element = scenes[currentScene].find((e) => e.id === id)!;
  return element;
}
