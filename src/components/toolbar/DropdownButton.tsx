export interface IDropdownButton {
  name: string;
  onClick: () => void;
}

const DropdownButton = ({ name, onClick }: IDropdownButton) => {
  return (
    <a onClick={onClick} className="dropdown-item is-unselectable">
      {name}
    </a>
  );
};

export default DropdownButton;
