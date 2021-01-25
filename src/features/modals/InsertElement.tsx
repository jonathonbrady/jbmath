import { useState } from 'react';
import { IFooter } from '../../components/modal/Footer';
import { IHeader } from '../../components/modal/Header';
import Modal from '../../components/modal/Modal';
import Preview from '../../components/modal/Preview';
import Input from '../../components/ui/Input';
import { InputUpdate } from '../../components/ui/types';
import { getNewMathObject } from '../scene/elementCreators';
import { IMathElement } from '../scene/MathElement';

/**
 * close:
 *      callback function to set the current dialog to NONE
 * scene:
 *      the scene to which the element created inside this dialog should be added
 * addElementToScene:
 *      callback function to dispatch the addElement action to the store
 */
interface Props {
  close: () => void;
  scene: number;
  addElementToScene: (
    formula: string,
    scale: number,
    rotation: number,
    scene: number
  ) => void;
}

/**
 * InsertElementModal:
 *      the dialog that appears upon clicking Insert -> Element in the EditorToolbar.
 *      Allows users to input a LaTeX expression to render in the current scene.
 */
const InsertElementModal = ({ close, scene, addElementToScene }: Props) => {
  const [formula, setFormula] = useState<string>('');
  const [scale, setScale] = useState<string>('1');
  const [rotation, setRotation] = useState<string>('0');

  const handleTextChange = (e: InputUpdate) => {
    setFormula(e.target.value);
  };
  const handleScaleChange = (e: InputUpdate) => {
    setScale(e.target.value);
  };
  const handleRotationChange = (e: InputUpdate) => {
    setRotation(e.target.value);
  };

  const header: IHeader = {
    title: 'Add New Element',
    close: close
  };

  const body: Array<JSX.Element> = [
    <p className="heading">Preview</p>,
    <Preview
      formula={formula}
      scale={parseFloat(scale)}
      rotation={parseFloat(rotation)}
    />,
    <hr></hr>,
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Formula</p>
          <Input
            text={formula}
            placeholder={'LaTeX expression'}
            onChange={handleTextChange}
          />
        </div>
      </div>
    </nav>,
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Scale</p>
          <Input
            text={scale}
            placeholder={'Scalar multiple'}
            onChange={handleScaleChange}
          />
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Rotation</p>
          <Input
            text={rotation}
            placeholder={'Degrees clockwise'}
            onChange={handleRotationChange}
          />
        </div>
      </div>
    </nav>
  ];

  const handleSubmit = () => {
    close();
    addElementToScene(formula, parseFloat(scale), parseFloat(rotation), scene);
  };

  const footer: IFooter = {
    buttons: [
      {
        color: 'green',
        text: 'Confirm',
        disabled: formula.length === 0,
        onClick: handleSubmit
      }
    ]
  };

  return <Modal header={header} body={body} footer={footer} />;
};

export default InsertElementModal;
