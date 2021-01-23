import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { IFooter } from '../../components/modal/Footer';
import { IHeader } from '../../components/modal/Header';
import Modal from '../../components/modal/Modal';
import Preview from '../../components/modal/Preview';
import Panel from '../../components/panel/Panel';
import Input from '../../components/ui/Input';
import { addAnimation } from '../../store/animationSlice';
import { editElement } from '../../store/contentSlice';
import { useSelectElement } from '../../hooks/useSelectElement';
import { getAnimationSet } from '../animations/functions';
import { IMathElement } from '../scene/MathElement';

interface Props {
  close: () => void;
}

const InsertAnimationModal = ({ close }: Props) => {
  const { selected } = useSelectElement();
  const { currentScene } = useSelector((state: RootState) => state.control);
  const dispatch = useDispatch();

  const header: IHeader = {
    title: 'Add New Animation',
    close: close
  };

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const body: JSX.Element[] = [
    <Preview formula={selected ? selected.formula : ''} />,
    //prettier-ignore
    <Panel
      content={[
        { name: 'Enter', content: getAnimationSet('enter').map((e) => e.name) },
        { name: 'Modify', content: getAnimationSet('modify').map((e) => e.name) },
        { name: 'Exit', content: getAnimationSet('exit').map((e) => e.name) },
        { name: 'Miscellaneous', content: getAnimationSet('misc').map((e) => e.name) }
      ]}
      setSelectedItem={(name: string) => setSelectedItem(name)}
    />,
    <hr></hr>,
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Animation</p>
          <p className="title">2/3</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <Input
            text={''}
            onChange={() => {
              return;
            }}
          />
        </div>
      </div>
    </nav>
  ];

  const handleSubmit = () => {
    const animationObject = {
      meta: {
        name: 'Appear',
        initial: { opacity: 0 },
        animation: { opacity: 1 }
      },
      target: selected.id,
      when: 1,
      length: 0
    };
    dispatch(addAnimation(animationObject));
    close();
  };

  const footer: IFooter = {
    buttons: [
      {
        color: 'green',
        text: 'Confirm',
        disabled: false,
        onClick: handleSubmit
      }
    ]
  };
  return <Modal header={header} body={body} footer={footer} />;
};

export default InsertAnimationModal;
