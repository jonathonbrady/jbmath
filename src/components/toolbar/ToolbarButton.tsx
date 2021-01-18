import { useState } from 'react';
import DropdownButton, { IDropdownButton } from './DropdownButton';

export interface IToolbarButton {
  name: string;
  dropdownContents: Array<IDropdownButton>;
}

const ToolbarButton = ({ name, dropdownContents }: IToolbarButton) => {
  const [active, setActive] = useState(false);
  const dropdownMenuButtons = dropdownContents.map((e) => (
    <DropdownButton name={e.name} onClick={e.onClick} />
  ));
  return (
    <div className={`dropdown ${active ? 'is-active' : ''}`}>
      <div className="dropdown-trigger">
        <button
          className="button is-primary"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActive(!active)}
        >
          {name}
        </button>
      </div>
      <div
        className="dropdown-menu is-primary is-unselectable"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content is-unselectable">
          {dropdownMenuButtons}
        </div>
      </div>
    </div>
  );
};

export default ToolbarButton;
