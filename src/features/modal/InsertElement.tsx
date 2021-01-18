import { useState } from 'react';
import { IFooter } from '../../components/modal/Footer';
import { IHeader } from '../../components/modal/Header';
import Modal from '../../components/modal/Modal';
import Preview from '../../components/modal/Preview';
import Input from '../../components/ui/Input';
import { InputUpdate } from '../../components/ui/types';
import { newMathElement } from '../../utils';
import { IMathElement } from '../scene/MathElement';

interface Props {
  close: () => void;
  addElementToScene: (element: IMathElement, scene: number) => void;
}

const InsertElementModal = ({ close, addElementToScene }: Props) => {
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
    addElementToScene(newMathElement(text), 0);
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
