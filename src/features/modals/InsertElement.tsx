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
  addElementToScene: (formula: string, scene: number) => void;
}

/**
 * InsertElementModal:
 *      the dialog that appears upon clicking Insert -> Element in the EditorToolbar.
 *      Allows users to input a LaTeX expression to render in the current scene.
 */
const InsertElementModal = ({ close, scene, addElementToScene }: Props) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (e: InputUpdate) => {
    setText(e.target.value);
  };

  const header: IHeader = {
    title: 'Add New Element',
    close: close
  };

  const body: Array<JSX.Element> = [
    <Preview formula={text} />,
    <Input text={text} onChange={handleTextChange} />
  ];

  const handleSubmit = () => {
    close();
    addElementToScene(text, scene);
  };

  const footer: IFooter = {
    buttons: [
      {
        color: 'green',
        text: 'Confirm',
        disabled: text.length === 0,
        onClick: handleSubmit
      }
    ]
  };

  return <Modal header={header} body={body} footer={footer} />;
};

export default InsertElementModal;
