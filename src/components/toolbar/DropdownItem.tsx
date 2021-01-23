export interface IDropdownItem {
  name: string;
  onClick: () => void;
}

interface Toggle {
  toggleActive: (name: string) => void;
}

type Props = IDropdownItem & Toggle;

const DropdownItem = ({ name, onClick, toggleActive }: Props) => {
  return (
    <a
      onClick={() => {
        onClick();
        toggleActive('');
      }}
      className="dropdown-item is-unselectable"
    >
      {name}
    </a>
  );
};

export default DropdownItem;
