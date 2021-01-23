import React, { useState } from 'react';
import { IFooter } from '../../components/modal/Footer';
import { IHeader } from '../../components/modal/Header';
import Modal from '../../components/modal/Modal';
import Input from '../../components/ui/Input';
import { InputUpdate } from '../../components/ui/types';

interface Props {
  close: () => void;
  addScene: () => void;
}

const InsertSceneModal = ({ close, addScene }: Props) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (e: InputUpdate) => {
    setText(e.target.value);
  };

  const header: IHeader = {
    title: 'Add New Scene',
    close: close
  };

  const body: Array<JSX.Element> = [
    <p>Scene Name (optional)</p>,
    <Input text={text} onChange={handleTextChange} />
  ];

  const handleSubmit = () => {
    close();
    addScene();
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

export default InsertSceneModal;
