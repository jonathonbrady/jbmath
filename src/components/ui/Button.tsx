import { getBulmaColorClass } from './Color';

export interface IButton {
  color: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const Button = ({ color, text, disabled, onClick }: IButton) => {
  const bulmaColor = getBulmaColorClass(color);
  const isDisabled = disabled ? 'is-disabled' : '';
  return (
    <button
      className={'button ' + bulmaColor + ' ' + isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
