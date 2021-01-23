import ToolbarButton, { IToolbarButton } from './ToolbarButton';

interface Props {
  buttons: Array<IToolbarButton>;
  active: string;
  handleToggle: (name: string) => void;
}

const LinkedToolbarButtons = ({ buttons, active, handleToggle }: Props) => {
  const toolbarButtons = buttons.map((button) => (
    <ToolbarButton
      key={button.name}
      name={button.name}
      active={button.name === active}
      toggleActive={(name: string) => handleToggle(name)}
      dropdownContents={button.dropdownContents}
    />
  ));
  return <>{toolbarButtons}</>;
};

export default LinkedToolbarButtons;
