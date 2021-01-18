import { IMathElement } from '../scene/MathElement';
import InsertElementModal from './InsertElement';

export type ActiveModal = 'FILE' | 'EDIT' | 'ANIMATION' | 'ELEMENT' | 'NONE';

interface Props {
  type: ActiveModal;
  close: () => void;
  addElementToScene: (element: IMathElement, scene: number) => void;
}

const ModalManager = (props: Props) => {
  switch (props.type) {
    case 'ELEMENT':
      return (
        <InsertElementModal
          close={props.close}
          addElementToScene={props.addElementToScene}
        />
      );
    default:
      return null;
  }
};

export default ModalManager;
