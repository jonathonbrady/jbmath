import { useEffect, useRef, useState } from 'react';
import LinkedToolbarButtons from './LinkedToolbarButtons';
import ToolbarButton, { IToolbarButton } from './ToolbarButton';

interface IToolbar {
  buttons: Array<IToolbarButton>;
  tags?: Array<JSX.Element>;
}

const Toolbar = ({ buttons }: IToolbar) => {
  const [active, toggleActive] = useState<string>('');
  const handleToggle = (name: string) => {
    if (active === name) {
      toggleActive('');
    } else {
      toggleActive(name);
    }
  };

  /**
   * Close active dropdown if user clicks out of Toolbar
   * https://stackoverflow.com/a/54570068
   *
   * @Cleanup - Refactor this into a reusable hook, as suggested in the above answer
   */
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      toggleActive('');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item" ref={ref}>
            <LinkedToolbarButtons
              buttons={buttons}
              active={active}
              handleToggle={handleToggle}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
