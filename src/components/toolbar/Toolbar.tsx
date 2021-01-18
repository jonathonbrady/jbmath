import ToolbarButton, { IToolbarButton } from './ToolbarButton';

export interface Toolbar {
  buttons: Array<IToolbarButton>;
}

const Toolbar = ({ buttons }: Toolbar) => {
  const toolbarButtons = buttons.map((button) => (
    <ToolbarButton
      name={button.name}
      dropdownContents={button.dropdownContents}
    />
  ));
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">{toolbarButtons}</div>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
