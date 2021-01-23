import { useDispatch } from 'react-redux';
import Toolbar from '../../components/toolbar/Toolbar';
import { IToolbarButton } from '../../components/toolbar/ToolbarButton';
import { previousOrNextScene } from '../../store/controlSlice';
import { Modal } from '../modals/ModalManager';

/**
 * setActiveModal:
 *      a callback function for toggling which menu (if any) to display in the editor.
 */
interface Props {
  setActiveModal: (modal: Modal) => void;
}

/**
 * EditorToolbar:
 *      the set of dropdown buttons that appear at the top of the editor.
 */
const EditorToolbar = ({ setActiveModal }: Props) => {
  const dispatch = useDispatch();

  /**
   * Define the dropdown buttons to appear in the Toolbar.
   *
   * For each object in the array, its name field corresponds to the dropdown's
   * display name, and the array dropdownContents contains the buttons within the
   * dropdown menu and their respective onClick function.
   */
  const TOOLBAR_BUTTONS: IToolbarButton[] = [
    {
      name: 'File',
      dropdownContents: [
        { name: 'New', onClick: () => alert('Create New Project') },
        { name: 'Open', onClick: () => alert('Open Existing Project') },
        { name: 'Save', onClick: () => alert('Save Project') }
      ]
    },
    { name: 'Edit', dropdownContents: [] },
    {
      name: 'Insert',
      dropdownContents: [
        { name: 'Animation', onClick: () => setActiveModal('ANIMATION') },
        { name: 'Element', onClick: () => setActiveModal('ELEMENT') },
        { name: 'Scene', onClick: () => setActiveModal('SCENE') }
      ]
    },
    {
      name: 'Scene',
      dropdownContents: [
        { name: 'Previous', onClick: () => dispatch(previousOrNextScene(-1)) },
        { name: 'Next', onClick: () => dispatch(previousOrNextScene(1)) }
      ]
    }
  ];

  return (
    <>
      <Toolbar buttons={TOOLBAR_BUTTONS} />
    </>
  );
};

export default EditorToolbar;
