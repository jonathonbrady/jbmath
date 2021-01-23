import { useState } from 'react';
import DropdownItem, { IDropdownItem } from './DropdownItem';

export interface IToolbarButton {
  name: string;
  dropdownContents: Array<IDropdownItem>;
}

interface LinkedDropdown {
  active: boolean;
  toggleActive: (name: string) => void;
}

type Props = IToolbarButton & LinkedDropdown;

const ToolbarButton = ({
  name,
  active,
  toggleActive,
  dropdownContents
}: Props) => {
  const dropdownMenuButtons = dropdownContents.map((e) => (
    <DropdownItem
      key={e.name}
      name={e.name}
      onClick={e.onClick}
      toggleActive={toggleActive}
    />
  ));
  return (
    <div className={`dropdown ${active ? 'is-active' : ''}`}>
      <div className="dropdown-trigger">
        <button
          className="button is-primary"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => toggleActive(name)}
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
