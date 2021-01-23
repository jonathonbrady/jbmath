import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { setSelectedElement } from '../store/controlSlice';
import { useElementFromID } from './useElementFromID';

/**
 * Returns a tuple containing the currently-selected element and a corresponding setter function.
 */
export function useSelectElement() {
  const { selectedElement } = useSelector((state: RootState) => state.control);
  const selected = useElementFromID(selectedElement);

  const dispatch = useDispatch();
  function setSelected(id: number) {
    dispatch(setSelectedElement(id));
  }

  return { selected, setSelected };
}
