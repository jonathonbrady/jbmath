import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { IMathElement } from '../scene/MathElement';
import InsertAnimationModal from './InsertAnimation';
import InsertElementModal from './InsertElement';
import InsertSceneModal from './InsertScene';
import NoElementSelected from '../alerts/NoElementSelected';

export type Modal =
  | 'FILE'
  | 'EDIT'
  | 'ANIMATION'
  | 'ELEMENT'
  | 'SCENE'
  | 'NONE';

interface Props {
  type: Modal;
  close: () => void;
  scene: number;
  addElementToScene: (formula: string, scene: number) => void;
  addSceneToProject: () => void;
  addAnimation: () => void;
}

const ModalManager = (props: Props) => {
  const { selectedElement } = useSelector((state: RootState) => state.control);
  switch (props.type) {
    case 'ANIMATION':
      if (selectedElement === -1) {
        return <NoElementSelected />;
      }
      return <InsertAnimationModal close={props.close} />;
    case 'ELEMENT':
      return (
        <InsertElementModal
          close={props.close}
          scene={props.scene}
          addElementToScene={props.addElementToScene}
        />
      );
    case 'SCENE':
      return (
        <InsertSceneModal
          close={props.close}
          addScene={props.addSceneToProject}
        />
      );
    default:
      return null;
  }
};

export default ModalManager;
