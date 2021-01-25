import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { IFooter } from '../../components/modal/Footer';
import { IHeader } from '../../components/modal/Header';
import Modal from '../../components/modal/Modal';
import Preview from '../../components/modal/Preview';
import Panel from '../../components/panel/Panel';
import Input from '../../components/ui/Input';
import { addAnimation, addPosition } from '../../store/animationSlice';
import { editElement } from '../../store/contentSlice';
import { useSelectElement } from '../../hooks/useSelectElement';
import { IMathElement } from '../scene/MathElement';
import { InputUpdate } from '../../components/ui/types';
import { AnimationType, getAnimationSet } from '../animations';

interface Props {
  close: () => void;
}

const InsertAnimationModal = ({ close }: Props) => {
  const { selected } = useSelectElement();
  const { currentScene } = useSelector((state: RootState) => state.control);
  const { animations } = useSelector((state: RootState) => state.animations);
  const dispatch = useDispatch();

  const [positionText, setPositionText] = useState('');
  const [lengthText, setLengthText] = useState('');

  const handlePositionChange = (e: InputUpdate) => {
    const newText = e.target.value;
    const numbers = /^[0-9\b]+$/;
    if (newText === '' || numbers.test(newText)) {
      setPositionText(e.target.value);
    }
  };

  const handleLengthChange = (e: InputUpdate) => {
    const newText = e.target.value;
    const numbers = /^[0-9\b]+$/;
    if (newText === '' || numbers.test(newText)) {
      setLengthText(e.target.value);
    }
  };

  const header: IHeader = {
    title: 'Add New Animation',
    close: close
  };

  /**
   * @Bug - Selecting a tab different from the one that contains the selected
   * animation results in a crash.
   */
  const [activeTab, setActiveTab] = useState<string>('Enter');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const body: JSX.Element[] = [
    <p className="heading">Applying Animation to {selected.formula}</p>,
    <Preview formula={selected.formula} />,
    <hr></hr>,
    //prettier-ignore
    <Panel
      content={[
        { name: 'Enter', content: getAnimationSet('Enter').map((e) => e.name) },
        { name: 'Modify', content: getAnimationSet('Modify').map((e) => e.name) },
        { name: 'Exit', content: getAnimationSet('Exit').map((e) => e.name) },
        { name: 'Miscellaneous', content: getAnimationSet('Miscellaneous').map((e) => e.name) }
      ]}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setSelectedItem={(name: string) => setSelectedItem(name)}
    />,
    <hr></hr>,
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">
            Sequence Position - (Next: {animations.length})
          </p>
          <Input
            text={positionText}
            placeholder={'1, 2, 3...'}
            onChange={handlePositionChange}
          />
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Animation Length</p>
          <Input
            text={lengthText}
            placeholder={'Time (seconds)'}
            onChange={handleLengthChange}
          />
        </div>
      </div>
    </nav>
  ];

  const handleSubmit = () => {
    const meta = getAnimationSet(activeTab as AnimationType).find(
      (e) => e.name === selectedItem
    )!;
    const animationObject = {
      meta: meta,
      target: selected.id,
      when: parseInt(positionText),
      length: parseInt(lengthText)
    };
    if (animationObject.when > animations.length) {
      dispatch(addPosition());
    }
    dispatch(addAnimation(animationObject));
    close();
  };

  const footer: IFooter = {
    buttons: [
      {
        color: 'green',
        text: 'Confirm',
        disabled:
          selectedItem === null ||
          positionText.length === 0 ||
          lengthText.length === 0,
        onClick: handleSubmit
      }
    ]
  };
  return <Modal header={header} body={body} footer={footer} />;
};

export default InsertAnimationModal;
